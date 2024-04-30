"use client";

import LoginCTA from "@/components/login/login-cta";
import { useUser } from "@alchemy/aa-alchemy/react";
import { redirect } from "next/navigation";

export default function Home() {
  const user = useUser();
  if (user) {
    redirect("/home");
  }

  return <LoginCTA />;
}
