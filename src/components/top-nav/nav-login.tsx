import { useSignerStatus } from "@alchemy/aa-alchemy/react";
import LoginDialog from "../login/login-dialog";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";

export default function NavLogin() {
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
