"use client";

import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

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
import { signInValidation } from "~/utils/zod";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { signIn } from "~/utils/auth-client";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof signInValidation>>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signInValidation>) {
    if (isPending) return;
    setIsPending(true);

    const action = await signIn.email({
      email: data.email,
      password: data.password,
    });

    setIsPending(false);

    if (action.error) {
      toast.error("Invalid email or password");
      console.error(action.error);
    } else {
      toast.success("Login successful!");
      router.push("/dashboard");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Fill in the form below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                <div className="flex justify-end">
                  <Button type="submit" className="w-full" disabled={isPending}>
                    Login
                  </Button>
                </div>
              </form>
            </Form>
            <Separator />
            <div className="flex justify-center">
              <Button size={"sm"} variant={"link"} className="w-full">
                <a href="/signup">Don&apos;t have an account? Signup</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
