"use client";

import { ModeToggle } from "@/components/ui/mode-toggle";

export default function TopNav() {
  return (
    <div className="border-gray-20 flex items-center border-b bg-primary-foreground px-6 py-4">
      <h1 className="text-xl font-semibold">Web3 App</h1>
      <div className="flex-grow" />
      <div className="mr-4">
        <ModeToggle />
      </div>
    </div>
  );
}
