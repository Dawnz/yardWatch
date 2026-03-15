import { SELF } from 'cloudflare:test';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { describe, expect, it } from 'vitest';
import SuperJSON from 'superjson';

import type { AppRouter } from '../src/router';

const ALLOWED_ORIGIN = 'http://localhost:3000';

function createTestClient(origin = ALLOWED_ORIGIN) {
	return createTRPCProxyClient<AppRouter>({
		links: [
			httpBatchLink({
				url: 'https://example.com/api/trpc',
				transformer: SuperJSON,
				fetch(url, options) {
					const headers = new Headers(options?.headers);
					headers.set('origin', origin);

					return SELF.fetch(url, {
						...(options ?? {}),
						headers,
					});
				},
			}),
		],
	});
}

describe('tRPC worker', () => {
	it('accepts allowed preflight requests', async () => {
		const response = await SELF.fetch('https://example.com/api/trpc', {
			method: 'OPTIONS',
			headers: {
				origin: ALLOWED_ORIGIN,
				'access-control-request-method': 'POST',
				'access-control-request-headers': 'content-type,authorization',
			},
		});

		expect(response.status).toBe(204);
		expect(response.headers.get('access-control-allow-origin')).toBe(ALLOWED_ORIGIN);
		expect(response.headers.get('access-control-allow-credentials')).toBe('true');
	});

	it('rejects disallowed origins before tRPC executes', async () => {
		const response = await SELF.fetch('https://example.com/api/trpc/hello', {
			headers: {
				origin: 'https://blocked.example.com',
			},
		});

		expect(response.status).toBe(403);
		expect(await response.text()).toBe('Origin not allowed');
	});

	it('serves the public hello query', async () => {
		const client = createTestClient();
		const result = await client.hello.query();

		expect(result.message).toBe('Hello from the YardWatch tRPC API.');
		expect(result.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
	});

	it('returns a validation error for invalid demo input', async () => {
		const client = createTestClient();

		await expect(client.demo.submit.mutate({ text: '' })).rejects.toMatchObject({
			data: {
				code: 'BAD_REQUEST',
			},
		});
	});

	it('returns UNAUTHORIZED for protected procedures without auth', async () => {
		const client = createTestClient();

		await expect(client.session.me.query()).rejects.toMatchObject({
			data: {
				code: 'UNAUTHORIZED',
			},
			message: 'Missing user identity',
		});
	});
});
