import { cookieStorage, createConfig } from "@alchemy/aa-alchemy/config";
import { AlchemyChainMap } from "@alchemy/aa-core";
import { QueryClient } from "@tanstack/react-query";
import { Hex } from "viem";
import { zkSyncSepoliaTestnet } from "viem-aa-sdk-compatible/zksync";

export const chain = {
  ...zkSyncSepoliaTestnet,
  rpcUrls: {
    ...zkSyncSepoliaTestnet.rpcUrls,
    alchemy: {
      http: ["https://zksync-sepolia.g.alchemy.com/v2"],
    },
  },
};

AlchemyChainMap.set(chain.id, chain);

export const queryClient = new QueryClient();
export const config = createConfig({
  rpcUrl: "/api/rpc/chain/" + chain.id,
  signerConnection: {
    rpcUrl: "/api/rpc/",
  },
  chain,
  ssr: true,
  storage: cookieStorage,
  sessionConfig: {
    expirationTimeMs: 2 * 60 * 60 * 1000,
  },
});

export const TOKEN_ADDRESS: Hex = "0xe3Db158F42F2D01Aa76840e93db1148493cca980";

export const PAYMASTER_ADDRESS: Hex | undefined = process.env
  .NEXT_PUBLIC_PAYMASTER_ADDRESS as Hex | undefined;
