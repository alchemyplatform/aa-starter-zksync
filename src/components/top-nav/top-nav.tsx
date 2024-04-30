"use client";

import { useSignerStatus, useUser } from "@alchemy/aa-alchemy/react";
import { ModeToggle } from "../mode-toggle";
import NavLogin from "./nav-login";
import Profile from "./profile";

export default function TopNav() {
  const { isConnected } = useSignerStatus();
  const user = useUser();

  return (
    <div className="border-gray-20 flex items-center border-b bg-primary-foreground px-6 py-4">
      <h1 className="text-xl font-semibold">Web3 App</h1>
      <div className="flex-grow" />
      <div className="mr-4">
        <ModeToggle />
      </div>
      {isConnected || user ? <Profile /> : <NavLogin />}
    </div>
  );
}
