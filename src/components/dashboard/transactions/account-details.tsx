import { useBundlerClient, useUser } from "@alchemy/aa-alchemy/react";
import { Label } from "../../ui/label";
import { useEffect, useState } from "react";
import { formatEther, parseAbi, parseEther } from "viem";
import { TOKEN_ADDRESS } from "@/config";
import { useTransactionContext } from "./transaction-context";

export const AccountDetails = () => {
  const user = useUser();
  const address = user?.address;
  const client = useBundlerClient();
  const [balance, setBalance] = useState("0");
  const { transactions } = useTransactionContext();

  useEffect(() => {
    (async () => {
      if (!address) return;
      const bal = await client.readContract({
        address: TOKEN_ADDRESS,
        abi: parseAbi(["function balanceOf(address) view returns (uint256)"]),
        functionName: "balanceOf",
        args: [address],
      });
      setBalance(formatEther(bal));
    })();
  }, [address, client, transactions]);

  return (
    <div className="flex flex-col space-y-1.5 overflow-hidden">
      <Label htmlFor="name">Your address</Label>
      <a
        href={"https://sepolia.explorer.zksync.io/address/" + address}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#363FF9]"
      >
        {address}
      </a>
      <Label htmlFor="name">Your balance</Label>
      <div>{balance}</div>
    </div>
  );
};
