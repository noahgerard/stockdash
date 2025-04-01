import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { validateSessionMiddleware } from "~/utils/middlewares";
import { searchPoly } from "~/utils/zod";
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
					sort: "ticker"
				});

				if (searchResults.status !== "OK") {
					throw new TRPCError({
						code: "NOT_FOUND",
						message: "No results found",
					});
				}

				console.log("\nRESULTS");
				console.log(JSON.stringify(searchResults.results, null, 4));

				return searchResults.results;
			} catch (error) {
				console.error(error);

				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Invalid request",
				});
			}
		}),
});
