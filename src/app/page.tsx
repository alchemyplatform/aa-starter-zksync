"use client";

import { useSignerStatus } from "@alchemy/aa-alchemy/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginCTA from "@/components/login/login-cta";

export default function Home() {
  const status = useSignerStatus();
  const router = useRouter();

  useEffect(() => {
    if (status.isConnected) {
      router.push("/home");
    }
  }, [status, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <LoginCTA />
    </main>
  );
}
