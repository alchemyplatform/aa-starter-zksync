import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoginForm } from "./login-form";

export default function LoginDialog() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Login by email</DialogTitle>
        <DialogDescription>
          Provide your email and we will send you a login link!
        </DialogDescription>
      </DialogHeader>
      <LoginForm />
    </DialogContent>
  );
}
