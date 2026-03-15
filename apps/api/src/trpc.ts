import { initTRPC, TRPCError } from '@trpc/server';
import SuperJSON from 'superjson';

import type { Context } from './context';

const t = initTRPC.context<Context>().create({
	transformer: SuperJSON,
});

export const router = t.router;

export const publicProcedure = t.procedure;

export const authProcedure = t.procedure.use(({ ctx, next }) => {
	if (!ctx.auth) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Missing user identity',
		});
	}

	return next({
		ctx: {
			...ctx,
			auth: ctx.auth,
		},
	});
});
