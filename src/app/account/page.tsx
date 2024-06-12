"use client";

import { AccountMain } from "@/components/dashboard/account/account-main";
import { Dashboard } from "@/components/dashboard/dashboard";

export default function Account() {
  return (
    <Dashboard title="Account">
      <AccountMain />
    </Dashboard>
  );
}
