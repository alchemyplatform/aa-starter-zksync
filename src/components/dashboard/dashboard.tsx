import { ReactNode } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { DetectDisconnect } from "../detect-disconnect";

export function Dashboard({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <DetectDisconnect>
      <div className="grid h-screen w-full pl-[53px]">
        <Sidebar />
        <div className="flex flex-col">
          <Header title={title} />
          {children}
        </div>
      </div>
    </DetectDisconnect>
  );
}
