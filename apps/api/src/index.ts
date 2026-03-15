import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { createContext } from './context';
import { resolveCors, withCorsHeaders } from './cors';
import { createDb } from './db';
import type { WorkerEnv } from './env';
import { appRouter } from './router';

const TRPC_ENDPOINT = '/api/trpc';

function isTrpcRequest(pathname: string) {
	return pathname === TRPC_ENDPOINT || pathname.startsWith(`${TRPC_ENDPOINT}/`);
}

export default {
	async fetch(request: Request, env: WorkerEnv): Promise<Response> {
		const url = new URL(request.url);

		if (!isTrpcRequest(url.pathname)) {
			return new Response('Not Found', { status: 404 });
		}

		const cors = resolveCors(request, env);

		if (!cors.allowed) {
			return withCorsHeaders(new Response('Origin not allowed', { status: 403 }), cors.headers);
		}

		if (request.method === 'OPTIONS') {
			return withCorsHeaders(new Response(null, { status: 204 }), cors.headers);
		}

		const db = createDb(env);

		const response = await fetchRequestHandler({
			endpoint: TRPC_ENDPOINT,
			req: request,
			router: appRouter,
			createContext: (opts) => createContext(opts, env, db),
		});

		return withCorsHeaders(response, cors.headers);
	},
};
