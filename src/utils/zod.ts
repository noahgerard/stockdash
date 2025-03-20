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
