"use client";

import { LoginForm } from "@/components/login/login-form";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useUser } from "@alchemy/aa-alchemy/react";
import { redirect } from "next/navigation";

export default function Home() {
  const user = useUser();
  if (user) {
    redirect("/home");
  }

  return (
    <div className="max-w-screen flex h-screen max-h-screen w-screen flex-col">
      <div className="border-gray-20 flex items-center border-b bg-primary-foreground px-6 py-4">
        <h1 className="text-xl font-semibold">Web3 App</h1>
        <div className="flex-grow" />
        <div className="mr-4">
          <ModeToggle />
        </div>
      </div>
      <main className="flex max-h-screen grow flex-col items-center justify-center gap-4 sm:p-8 md:p-4 lg:p-6 xl:p-8 2xl:p-24">
        <LoginForm />
      </main>
    </div>
  );
}
