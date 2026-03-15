import type { WorkerEnv } from './env';

export interface AuthIdentity {
	userId: string;
	sessionId: string;
	organizationId: string | null;
}

const AUTH_HEADER_NAMES = ['cookie', 'authorization', 'origin', 'user-agent'] as const;

export function buildAuthHeaders(request: Request): Headers {
	const headers = new Headers();

	for (const headerName of AUTH_HEADER_NAMES) {
		const headerValue = request.headers.get(headerName);

		if (headerValue) {
			headers.set(headerName, headerValue);
		}
	}

	return headers;
}

async function resolveSessionFromAuthSystem(_headers: Headers, _env: WorkerEnv): Promise<AuthIdentity | null> {
	// TODO: Replace this stub with the real auth/session lookup implementation.
	return null;
}

export async function resolveAuth(request: Request, env: WorkerEnv): Promise<AuthIdentity | null> {
	const headers = buildAuthHeaders(request);

	try {
		return await resolveSessionFromAuthSystem(headers, env);
	} catch (error) {
		console.warn('Failed to resolve auth session', error);
		return null;
	}
}
