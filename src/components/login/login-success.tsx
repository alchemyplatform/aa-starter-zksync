import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function LoginSuccess() {
  return (
    <Alert>
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Email Sent</AlertTitle>
      <AlertDescription>Its on the way, check your inbox!</AlertDescription>
    </Alert>
  );
}
