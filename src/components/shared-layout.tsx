import { config } from "@/config";
import { cookieToInitialState } from "@alchemy/aa-alchemy/config";
import { headers } from "next/headers";
import "../styles/globals.css";
import { Providers } from "./providers";
import TopNav from "./top-nav/top-nav";

export default function SharedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const intialState = cookieToInitialState(
    config,
    headers().get("cookie") ?? undefined,
  );

  return (
    <Providers initialState={intialState}>
      <div className="max-w-screen flex h-screen max-h-screen w-screen flex-col">
        <TopNav />
        <main className="flex max-h-screen grow flex-col items-center justify-center gap-4 sm:p-8 md:p-4 lg:p-6 xl:p-8 2xl:p-24">
          {children}
        </main>
      </div>
    </Providers>
  );
}
