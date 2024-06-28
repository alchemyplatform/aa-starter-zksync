import { Badge } from "@/components/ui/badge";
import { AccountDetails } from "./account-details";
import TransactionForm from "./transaction-form";
import Transactions from "./transactions";
import { TransactionProvider } from "./transaction-context";
import BurnForm from "./burn-form";

export function TransactionsMain() {
  return (
    <TransactionProvider>
      <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          className="relative flex flex-col items-start gap-8"
          x-chunk="dashboard-03-chunk-0"
        >
          <div className="grid w-full items-start gap-6">
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Account
              </legend>
              <AccountDetails />
            </fieldset>
            <fieldset className="rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Mint Tokens
              </legend>
              <TransactionForm />
            </fieldset>
            <fieldset className="rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Burn Tokens
              </legend>
              <BurnForm />
            </fieldset>
          </div>
        </div>
        <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
          <Badge variant="outline" className="absolute right-3 top-3">
            Transactions
          </Badge>
          <div className="flex-1">
            <Transactions />
          </div>
        </div>
      </main>
    </TransactionProvider>
  );
}
