"use client";

import { useSignerStatus } from "@alchemy/aa-alchemy/react";
import NavLogin from "./nav-login";
import Profile from "./profile";
import { ModeToggle } from "../mode-toggle";

export default function TopNav() {
  const { isConnected } = useSignerStatus();

  return (
    <div className="border-gray-20 flex items-center border-b bg-primary-foreground px-6 py-4">
      <h1 className="text-xl font-semibold">Web3 App</h1>
      <div className="flex-grow" />
      <div className="mr-4">
        <ModeToggle />
      </div>
      {isConnected ? <Profile /> : <NavLogin />}
    </div>
  );
}
