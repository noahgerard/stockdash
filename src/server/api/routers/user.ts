import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { signUp } from "~/utils/auth-client";
import { signUpValidation } from "~/utils/zod";

export const userRouter = createTRPCRouter({
	signup: publicProcedure
//		.use(validateSessionMiddleware)
		.input(signUpValidation)
		.mutation(async ({ input }) => {
			const { email, name, password } = input;

			const data = await signUp.email({
				email,
				name, 
				password,
			});

			if (data.error) {
				console.error(data.error);

				throw new TRPCError({
					code: "BAD_REQUEST",
					message: data.error.message ?? data.error.statusText,
				});
			}

			return data;
		})
});