"use client";

import LoginCTA from "@/components/login/login-cta";
import { useSignerStatus } from "@alchemy/aa-alchemy/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const status = useSignerStatus();
  const router = useRouter();

  useEffect(() => {
    if (status.isConnected) {
      router.push("/home");
    }
  }, [status, router]);

  return <LoginCTA />;
}
