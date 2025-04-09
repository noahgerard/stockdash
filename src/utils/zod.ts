import { z } from "zod";

export const signUpValidation = z.object({
  email: z.string().email().max(50),
  name: z.string().min(5).max(20),
  password: z.string().min(8).max(20),
  confirm: z.string(),
}); /* .refine((data) => data.password === data.confirm, {
	message: "Passwords don't match",
	path: ["confirm"], // path of error
});
 */

export const signInValidation = z.object({
  email: z.string().email().max(50),
  password: z.string().min(8).max(20),
});

export const createPortfolio = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(200).optional(),
});

export const listPortfolios = z.object({
  page: z.number().min(1),
});

export const updatePortfolio = z.object({
  id: z.string(),
  name: z.string().min(1).max(50).optional(),
  description: z.string().max(200).optional(),
});

export const deletePortfolio = z.object({
  id: z.string(),
});

export const searchPoly = z.object({
  name: z.string().min(1).max(50),
});

export const getStock = z.object({
  ticker: z.string().min(1).max(10),
});
