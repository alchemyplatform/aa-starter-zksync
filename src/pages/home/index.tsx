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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSmartAccountClient } from "@alchemy/aa-alchemy/react";

export default function Home() {
  const { client } = useSmartAccountClient({
    type: "MultiOwnerModularAccount",
  });

  return (
    <Card className="w-[700px]">
      <CardHeader>
        <CardTitle>Send a User Operation</CardTitle>
        <CardDescription>
          Fill out the fields below for a user operation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Your address</Label>
              <div>{client?.account.address}</div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">to</Label>
              <Input id="to" placeholder="0x..." />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">data</Label>
              <Input id="data" placeholder="0x..." />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">value</Label>
              <Input id="value" placeholder="0" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <SendUOButton
          target="0x021aA0837FcB15e867179bC19b1DC91D9166923d"
          data="0x"
          value={0n}
        />
      </CardFooter>
    </Card>
  );
}
