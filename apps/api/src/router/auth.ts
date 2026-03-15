// import { z } from 'zod';
// import { router, publicProcedure } from '../trpc';
// import { login, verifyOTP } from '../auth/authService';

// export const authRouter = router({
// 	login: publicProcedure
// 		.input(
// 			z.object({
// 				email: z.string(),
// 				password: z.string(),
// 			}),
// 		)
// 		.mutation(({ input }) => {
// 			return login(input.email, input.password);
// 		}),

// 	verify: publicProcedure
// 		.input(
// 			z.object({
// 				userId: z.string(),
// 				code: z.string(),
// 			}),
// 		)
// 		.mutation(({ input }) => {
// 			return verifyOTP(input.userId, input.code);
// 		}),
// });
