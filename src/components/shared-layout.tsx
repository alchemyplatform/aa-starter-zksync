import { config } from "@/config";
import { cookieToInitialState } from "@alchemy/aa-alchemy/config";
import { headers } from "next/headers";
import "../styles/globals.css";
import { Providers } from "./providers";

export default function SharedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const intialState = cookieToInitialState(
    config,
    headers().get("cookie") ?? undefined,
  );

  return <Providers initialState={intialState}>{children}</Providers>;
}
