import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useLogout, useUser } from "@alchemy/aa-alchemy/react";

export function AccountMain() {
  const user = useUser();
  const { logout } = useLogout();
  const address = user?.address;
  const email = user?.email;

  return (
    <main className="flex h-full flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Account</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 border-t pt-6">
          <div className="grid gap-2">
            <Label>Your email</Label>
            <div>{email}</div>
          </div>
          <div className="grid gap-2">
            <Label>Your address</Label>
            <a
              href={"https://sepolia.explorer.zksync.io/address/" + address}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#363FF9]"
            >
              {address}
            </a>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button className="w-full" onClick={() => logout()}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
