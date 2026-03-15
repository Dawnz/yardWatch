import type { WorkerEnv } from '../src/env';

declare module 'cloudflare:test' {
	interface ProvidedEnv extends WorkerEnv {}
}
