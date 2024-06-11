import { useSignerStatus } from "@alchemy/aa-alchemy/react";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect } from "react";

export const DetectDisconnect = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const status = useSignerStatus();

  useEffect(() => {
    if (status.isDisconnected) {
      router.push("/");
    }
  }, [status.isDisconnected, router]);

  return children;
};
