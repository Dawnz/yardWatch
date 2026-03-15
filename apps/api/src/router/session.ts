import { authProcedure, router } from '../trpc';

export const sessionRouter = router({
	me: authProcedure.query(({ ctx }) => {
		return {
			userId: ctx.auth.userId,
			sessionId: ctx.auth.sessionId,
			organizationId: ctx.auth.organizationId,
		};
	}),
});
