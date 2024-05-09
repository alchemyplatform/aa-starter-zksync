"use client";

import { SendUOButton } from "@/components/send-uo-button";
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
import { useAccount, useSignerStatus } from "@alchemy/aa-alchemy/react";
import { UserOperationCallData } from "@alchemy/aa-core";
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
  const { address } = useAccount({
    type: "MultiOwnerModularAccount",
  });
  const router = useRouter();
  const status = useSignerStatus();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      target: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      data: "0x1337",
      value: 0,
    },
  });

  useEffect(() => {
    if (status.isDisconnected) {
      router.push("/");
    }
  }, [status.isDisconnected, router]);

  const short = address ? address.slice(0, 6) + "..." + address.slice(-4) : "";

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
            <CardTitle>Send a User Operation</CardTitle>
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
                  href={"https://sepolia.arbiscan.io/address/" + address}
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
                    <FormLabel>Target</FormLabel>
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
            <SendUOButton
              getUO={(): UserOperationCallData => ({
                target: form.getValues("target"),
                data: form.getValues("data"),
                value: BigInt(form.getValues("value") || 0),
              })}
            />
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
