import React, { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useBundlerClient } from "@alchemy/aa-alchemy/react";
import { Hex } from "viem";

type TransactionStatus = "pending" | "success" | "reverted";

const useTransactionToast = () => {
  const client = useBundlerClient();
  const { toast } = useToast();
  const [transactionStatus, setTransactionStatus] =
    useState<TransactionStatus>("pending");

  const createToast = () => {
    const { id, update } = toast({
      title: "Transaction Pending...",
      description: "Your transaction is being processed.",
    });

    const withHash = (transactionHash: Hex) => {
      const fetchTransactionStatus = async (tryCount = 0) => {
        try {
          const { status } = await client.getTransactionReceipt({
            hash: transactionHash,
          });

          if (status === "success") {
            update({
              id,
              title: "Transaction Successful!",
              description: (
                <a
                  href={
                    client.chain.blockExplorers?.default.url +
                    `/tx/${transactionHash}`
                  }
                  className="text-[#363FF9] underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View transaction
                </a>
              ),
            });
          } else {
            update({
              id,
              title: "Transaction Failed",
              description: "There was an error processing your transaction.",
            });
          }

          setTransactionStatus(status);
        } catch (ex) {
          if (tryCount < 3) {
            setTimeout(() => {
              fetchTransactionStatus(tryCount + 1);
            }, 500);
          } else {
            update({
              id,
              title: "Transaction Failed",
              description: "There was an error processing your transaction.",
            });
          }
        }
      };

      setTimeout(() => {
        fetchTransactionStatus();
      }, 500);
    };

    return { withHash };
  };

  return { transactionStatus, createToast };
};

export default useTransactionToast;
