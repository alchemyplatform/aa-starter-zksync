"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useTransaction from "@/components/web3/use-transaction";
import { useSignerStatus } from "@alchemy/aa-alchemy/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransactionContext } from "./transaction-context";
import { TOKEN_ADDRESS } from "@/config";
import { encodeFunctionData, parseAbi } from "viem";

const schema = z.object({
  amount: z.number(),
});

interface Schema {
  amount: number;
}

export default function BurnForm() {
  const router = useRouter();
  const status = useSignerStatus();
  const { addTransaction } = useTransactionContext();
  const { sendTransaction } = useTransaction();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 0,
    },
  });

  const send = async () => {
    const { amount } = form.getValues();
    const txHash = await sendTransaction({
      to: TOKEN_ADDRESS,
      data: encodeFunctionData({
        abi: parseAbi(["function burn(uint) external"]),
        functionName: "burn",
        args: [BigInt(amount) * 10n ** 18n],
      }),
      value: 0n,
    });
    if (txHash) addTransaction(txHash);
  };

  useEffect(() => {
    if (status.isDisconnected) {
      router.push("/");
    }
  }, [status.isDisconnected, router]);

  return (
    <Form {...form}>
      <form
        className="grid gap-6"
        onSubmit={(evt) => {
          evt.preventDefault();
        }}
      >
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input {...field} defaultValue={0} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" onClick={() => send()}>
          Send
        </Button>
      </form>
    </Form>
  );
}
