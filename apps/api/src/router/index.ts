import { demoRouter } from './demo';
import { sessionRouter } from './session';

import { publicProcedure, router } from '../trpc';

export const appRouter = router({
	hello: publicProcedure.query(() => {
		return {
			message: 'Hello from the YardWatch tRPC API.',
			timestamp: new Date().toISOString(),
		};
	}),
	demo: demoRouter,
	session: sessionRouter,
});

export type AppRouter = typeof appRouter;
