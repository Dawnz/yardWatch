import type { WorkerEnv } from './env';

export interface AuthIdentity {
	userId: string;
	sessionId: string;
	organizationId: string | null;
}

const AUTH_HEADER_NAMES = ['cookie', 'authorization', 'origin', 'user-agent'] as const;
const demoSessions = [
	{
		sessionId: 'demo-session',
		userId: '1',
		organizationId: 'org1',
		token: 'demo-token',
	},
];
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

async function resolveSessionFromAuthSystem(headers: Headers, _env: WorkerEnv): Promise<AuthIdentity | null> {
	const authHeader = headers.get('authorization');

	if (!authHeader) {
		return null;
	}

	const token = authHeader.replace('Bearer ', '');

	const session = demoSessions.find((s) => s.token === token);

	if (!session) {
		return null;
	}

	return {
		userId: session.userId,
		sessionId: session.sessionId,
		organizationId: session.organizationId,
	};
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
