"use client";

import { useAccount, useAuthenticate } from "@alchemy/aa-alchemy/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSuccess } from "./login-success";

const schema = z.object({
  email: z.string().email().min(5),
});

type Schema = z.infer<typeof schema>;

export const LoginForm = () => {
  const {
    authenticate,
    isPending: isAuthenticatingUser,
    error,
  } = useAuthenticate();
  const { isLoadingAccount } = useAccount({
    type: "MultiOwnerModularAccount",
    skipCreate: true,
  });

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = ({ email }: Schema) => {
    authenticate({ type: "email", email });
  };

  if (isAuthenticatingUser || isLoadingAccount) {
    return <LoginSuccess />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="web3fan@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {error.message}
          </p>
        )}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button type="submit">Send Email</Button>
        </div>
      </form>
    </Form>
  );
};
