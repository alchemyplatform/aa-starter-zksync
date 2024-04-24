import { useSignerStatus } from "@alchemy/aa-alchemy/react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import LoginDialog from "./login-dialog";

export default function Cta() {
  const { isInitializing, isAuthenticating } = useSignerStatus();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={isInitializing || isAuthenticating}>Login</Button>
      </DialogTrigger>
      <LoginDialog />
    </Dialog>
  );
}
