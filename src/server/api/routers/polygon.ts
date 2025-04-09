import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { validateSessionMiddleware } from "~/utils/middlewares";
import { getStock, searchPoly } from "~/utils/zod";
import { restClient } from "@polygon.io/client-js";
import { env } from "~/env.js";

const rest = restClient(env.POLYGON_API_KEY);

export const polygonRouter = createTRPCRouter({
  search: publicProcedure
    .use(validateSessionMiddleware)
    .input(searchPoly)
    .query(async ({ input }) => {
      const { name } = input;

      try {
        const searchResults = await rest.reference.tickers({
          market: "stocks",
          search: name,
          active: "true",
          order: "asc",
          limit: 15,
          sort: "ticker",
        });

        if (searchResults.status !== "OK" || !searchResults.results) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No results found",
          });
        }

        return searchResults.results;
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid request",
        });
      }
    }),
  getStock: publicProcedure
    .use(validateSessionMiddleware)
    .input(getStock)
    .query(async ({ input }) => {
      const { ticker } = input;

      try {
        const data = await rest.reference.tickerDetails(ticker);

        if (data.status !== "OK" || !data.results) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No results found",
          });
        }

        return data.results;
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid request",
        });
      }
    }),
});
