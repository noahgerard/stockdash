import { TRPCError } from "@trpc/server";
import { middlewareBase } from "~/server/api/trpc";
import { auth } from "./auth";
import { headers } from "next/headers";

export const validateSessionMiddleware = middlewareBase(async ({ next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next();
});
