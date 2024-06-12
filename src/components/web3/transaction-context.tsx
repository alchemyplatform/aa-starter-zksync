import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useBundlerClient } from "@alchemy/aa-alchemy/react";
import { Hex } from "viem";

type TransactionStatus = "pending" | "success" | "reverted";

interface Transaction {
  hash: Hex;
  status: TransactionStatus;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (hash: Hex) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined,
);

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider",
    );
  }
  return context;
};

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const client = useBundlerClient();

  const fetchTransactionStatus = useCallback(
    async (hash: Hex) => {
      try {
        const { status } = await client.getTransactionReceipt({ hash });
        const newStatus: TransactionStatus =
          status === "success" ? "success" : "reverted";

        setTransactions((prev) =>
          prev.map((tx) =>
            tx.hash === hash ? { ...tx, status: newStatus } : tx,
          ),
        );
      } catch (ex) {
        setTimeout(() => {
          fetchTransactionStatus(hash);
        }, 1500);
      }
    },
    [client],
  );

  const addTransaction = (hash: Hex) => {
    setTransactions((prev) => [...prev, { hash, status: "pending" }]);
    fetchTransactionStatus(hash);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      transactions.forEach((transaction) => {
        if (transaction.status === "pending") {
          fetchTransactionStatus(transaction.hash);
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [transactions, fetchTransactionStatus]);

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
