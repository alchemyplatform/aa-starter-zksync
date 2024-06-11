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
import { Address, Hex, isHex } from "viem";
import { z } from "zod";
import { useTransactionContext } from "../../web3/transaction-context";

const hexStringSchema = z.string().refine((data) => isHex(data), {
  message: "Invalid hex format",
});

const schema = z.object({
  target: hexStringSchema,
  data: hexStringSchema,
  value: z.number(),
});

interface Schema {
  target: Address;
  data: Hex;
  value: number;
}

export default function TransactionForm() {
  const router = useRouter();
  const status = useSignerStatus();
  const { addTransaction } = useTransactionContext();
  const { sendTransaction } = useTransaction();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      target: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      data: "0x1337",
      value: 0,
    },
  });

  const send = async () => {
    const { target, data, value } = form.getValues();
    const txHash = await sendTransaction({
      to: target,
      data,
      value: BigInt(value),
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
            name="target"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To</FormLabel>
                <FormControl>
                  <Input placeholder="0x..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="data"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <FormControl>
                  <Input {...field} defaultValue={"0x"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value (in wei)</FormLabel>
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
