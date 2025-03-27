import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { validateSessionMiddleware } from "~/utils/middlewares";
import { createPortfolio, deletePortfolio, listPortfolios } from "~/utils/zod";

export const portfolioRouter = createTRPCRouter({
  create: publicProcedure
    .use(validateSessionMiddleware)
    .input(createPortfolio)
    .mutation(async ({ input, ctx }) => {
      const { name, description } = input;

      try {
        const portfolio = await db.portfolio.create({
          data: {
            name: name,
            description: description,
            userId: ctx.session.user.id,
          },
        });

        return portfolio;
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "An error occurred creating your portfolio",
        });
      }
    }),
  delete: publicProcedure
    .use(validateSessionMiddleware)
    .input(deletePortfolio)
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      try {
        return await db.portfolio.delete({
          where: {
            id,
            userId: ctx.session.user.id,
          },
        });
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "An error occured deleting your portfolio",
        });
      }
    }),
  list: publicProcedure
    .use(validateSessionMiddleware)
    .input(listPortfolios)
    .query(async ({ ctx, input }) => {
      const portfolios = await db.portfolio.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        take: 10,
        skip: (input.page - 1) * 10,
      });

      return portfolios;
    }),
});
