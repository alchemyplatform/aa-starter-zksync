import { useUser } from "@alchemy/aa-alchemy/react";
import { Label } from "../../ui/label";

export const AccountDetails = () => {
  const user = useUser();
  const address = user?.address;

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
    </div>
  );
};
