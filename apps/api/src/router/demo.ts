import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

const demoSubmissionSchema = z.object({
	text: z.string().trim().min(1, 'Please enter a message.').max(120),
});

export const demoRouter = router({
	submit: publicProcedure.input(demoSubmissionSchema).mutation(({ input }) => {
		return {
			status: 'accepted' as const,
			echo: input.text,
			length: input.text.length,
			receivedAt: new Date().toISOString(),
		};
	}),
});
