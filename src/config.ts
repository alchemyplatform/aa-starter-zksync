import { cookieStorage, createConfig } from "@alchemy/aa-alchemy/config";
import { arbitrumSepolia } from "@alchemy/aa-core";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
export const config = createConfig({
  rpcUrl: "/api/rpc",
  chain: arbitrumSepolia,
  ssr: true,
  storage: cookieStorage,
});
