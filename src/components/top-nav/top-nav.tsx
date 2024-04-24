"use client";

import { useAccount } from "@alchemy/aa-alchemy/react";
import NavLogin from "./nav-login";
import Profile from "./profile";

export default function TopNav() {
  const { account } = useAccount({
    type: "MultiOwnerModularAccount",
    skipCreate: true,
  });

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <h1 className="text-xl font-semibold">Web3 App</h1>
      {account ? <Profile /> : <NavLogin />}
    </div>
  );
}
