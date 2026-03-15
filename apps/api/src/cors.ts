import type { WorkerEnv } from './env';

const ACCESS_CONTROL_ALLOW_HEADERS = 'content-type, authorization';
const ACCESS_CONTROL_ALLOW_METHODS = 'GET, POST, OPTIONS';

function getAllowedOrigins(env: WorkerEnv) {
	return (env.CORS_ALLOWED_ORIGINS ?? '')
		.split(',')
		.map((origin) => origin.trim())
		.filter(Boolean);
}

function appendVary(headers: Headers, value: string) {
	const current = headers.get('Vary');

	if (!current) {
		headers.set('Vary', value);
		return;
	}

	const parts = current.split(',').map((part) => part.trim());

	if (!parts.includes(value)) {
		headers.set('Vary', `${current}, ${value}`);
	}
}

export interface CorsResult {
	allowed: boolean;
	headers: Headers;
}

export function resolveCors(request: Request, env: WorkerEnv): CorsResult {
	const headers = new Headers();
	appendVary(headers, 'Origin');

	const origin = request.headers.get('origin');

	if (!origin) {
		return { allowed: true, headers };
	}

	const isAllowedOrigin = getAllowedOrigins(env).includes(origin);

	if (!isAllowedOrigin) {
		return { allowed: false, headers };
	}

	headers.set('Access-Control-Allow-Origin', origin);
	headers.set('Access-Control-Allow-Credentials', 'true');
	headers.set('Access-Control-Allow-Headers', ACCESS_CONTROL_ALLOW_HEADERS);
	headers.set('Access-Control-Allow-Methods', ACCESS_CONTROL_ALLOW_METHODS);

	return { allowed: true, headers };
}

export function withCorsHeaders(response: Response, corsHeaders: Headers) {
	const headers = new Headers(response.headers);

	for (const [key, value] of corsHeaders.entries()) {
		if (key.toLowerCase() === 'vary') {
			appendVary(headers, value);
			continue;
		}

		headers.set(key, value);
	}

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}
