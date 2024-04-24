"use-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAccount, useUser } from "@alchemy/aa-alchemy/react";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ProfileMenu } from "./profile-menu";

export default function Profile() {
  const user = useUser();
  const { account } = useAccount({
    type: "MultiOwnerModularAccount",
  });
  const address = account?.address;
  const short = address ? address.slice(0, 6) + "..." + address.slice(-4) : "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center px-2 hover:bg-slate-100">
          <Avatar>
            <AvatarImage
              src="https://bufficornbuidlbrigade.com/Bufficorn_astronaut.png"
              alt=""
            />
            <AvatarFallback>0x</AvatarFallback>
          </Avatar>
          <div className="ml-3 flex-col text-ellipsis">
            <div>{short}</div>
            <div>{user?.email}</div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <ProfileMenu />
    </DropdownMenu>
  );
}
