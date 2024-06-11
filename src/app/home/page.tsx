"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useTransaction from "@/components/web3/use-transaction";
import { useSignerStatus, useUser } from "@alchemy/aa-alchemy/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Address, Hex, isHex } from "viem";
import { z } from "zod";

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

export default function Home() {
  const user = useUser();
  const address = user?.address;
  const router = useRouter();
  const status = useSignerStatus();
  const { sendTransaction } = useTransaction();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      target: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      data: "0x1337",
      value: 0,
    },
  });

  const send = () => {
    const { target, data, value } = form.getValues();
    sendTransaction({
      to: target,
      data,
      value: BigInt(value),
    });
  };

  useEffect(() => {
    if (status.isDisconnected) {
      router.push("/");
    }
  }, [status.isDisconnected, router]);

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={(evt) => {
          evt.preventDefault();
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Send a Transaction</CardTitle>
            <CardDescription>
              Feel free to change the fields below to send a user operation to a
              specific target address, with some calldata and value!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 overflow-hidden">
                <Label htmlFor="name">Your address</Label>
                <a
                  href={"https://sepolia.explorer.zksync.io/address/" + address}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#363FF9]"
                >
                  {address}
                </a>
              </div>

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
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" onClick={() => send()}>
              Send
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
