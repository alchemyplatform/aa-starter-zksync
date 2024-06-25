import React from "react";
import { useTransactionContext } from "./transaction-context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react";

export const Transactions = () => {
  const { transactions } = useTransactionContext();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="size-4" />;
      case "reverted":
        return <XCircle className=" size-4" />;
      case "pending":
      default:
        return <Clock className="size-4" />;
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      {transactions.map((transaction, index) => (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://sepolia.explorer.zksync.io/tx/${transaction.hash}`}
          key={transaction.hash}
          className={`relative self-start rounded-lg p-2 text-foreground shadow-md dark:bg-slate-600 dark:text-foreground md:w-4/5 ${
            index % 2 === 0 ? " bg-white" : "bg-slate-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>{getStatusIcon(transaction.status)}</div>
              </TooltipTrigger>
              <TooltipContent>
                {transaction.status.charAt(0).toUpperCase() +
                  transaction.status.slice(1)}
              </TooltipContent>
            </Tooltip>
            <div className="flex-1 text-sm font-semibold">
              Transaction {index + 1}
            </div>
          </div>
          <div className="mt-1 text-xs">{transaction.hash}</div>
          <ExternalLink className="absolute right-2 top-2 h-4 w-4" />
        </a>
      ))}
    </div>
  );
};

export default Transactions;
