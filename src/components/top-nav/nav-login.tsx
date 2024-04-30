import { useSignerStatus } from "@alchemy/aa-alchemy/react";
import LoginDialog from "../login/login-dialog";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";

export default function NavLogin() {
  const status = useSignerStatus();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!!status.isInitializing || !!status.isAuthenticating}>
          Login
        </Button>
      </DialogTrigger>
      <LoginDialog />
    </Dialog>
  );
}
