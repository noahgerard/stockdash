import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { signUp, signIn } from "~/utils/auth-client";
import { signUpValidation, signInValidation } from "~/utils/zod";

export const userRouter = createTRPCRouter({
  /*   signup: publicProcedure
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
          message: "An error occurred while creating your account.",
        });
      } else {
        return data;
      }
    }),
  signin: publicProcedure
    .input(signInValidation)
    .mutation(async ({ input }) => {
      const { email, password } = input;

      const data = await signIn.email({
        email,
        password,
      });

      if (data.error) {
        console.error(data.error);

        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "An error occurred while signing in.",
        });
      } else {
        return data;
      }
    }), */
});
