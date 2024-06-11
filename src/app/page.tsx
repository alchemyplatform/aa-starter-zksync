"use client";

import { LoginForm } from "@/components/login/login-form";
import TopNav from "@/components/top-nav/top-nav";
import { useUser } from "@alchemy/aa-alchemy/react";
import { redirect } from "next/navigation";

export default function Home() {
  const user = useUser();
  if (user) {
    redirect("/home");
  }

  return (
    <div className="max-w-screen flex h-screen max-h-screen w-screen flex-col">
      <TopNav />
      <main className="flex max-h-screen grow flex-col items-center justify-center gap-4 sm:p-8 md:p-4 lg:p-6 xl:p-8 2xl:p-24">
        <LoginForm />
      </main>
    </div>
  );
}
