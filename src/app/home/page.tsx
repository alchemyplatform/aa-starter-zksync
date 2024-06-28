"use client";

import { Dashboard } from "@/components/dashboard/dashboard";
import { TransactionsMain } from "@/components/dashboard/transactions/transactions-main";

export default function Home() {
  return (
    <Dashboard title="Mint Tokens">
      <TransactionsMain />
    </Dashboard>
  );
}
