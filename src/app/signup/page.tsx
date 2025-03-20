"use client";

import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpValidation } from "~/utils/zod";
import { api } from "~/trpc/react";
import { TRPCError } from "@trpc/server";

export default function InputForm() {
  const { mutateAsync, isPending} = api.user.signup.useMutation();
  const form = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signUpValidation>) {
    await mutateAsync(data).then(() => {
			toast.success("Account created successfully!");
		}).catch((error: TRPCError) => {
			console.error(error)
			toast.error(error.message);
		});
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="w-full max-w-[24rem]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="chuck norris" {...field} />
                    </FormControl>
                    <FormDescription>Your name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="chucknorris@gmail.com" {...field} />
                    </FormControl>
                    <FormDescription>Your email address</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Your password</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
