import { useSigner, useSignerStatus } from "@alchemy/aa-alchemy/react";
import { useState, useEffect } from "react";
import {
  Account,
  Chain,
  Client,
  LocalAccount,
  PublicActions,
  RpcSchema,
  Transport,
  WalletActions,
  createWalletClient,
  http,
  publicActions,
} from "viem";
import { zkSyncSepoliaTestnet } from "viem/chains";

type ExtendedClient<
  transport extends Transport = Transport,
  chain extends Chain = Chain,
  account extends Account = Account,
> = Client<
  transport,
  chain,
  account,
  RpcSchema,
  WalletActions<chain, account> & PublicActions<transport, chain, account>
>;

const useSignerClient = () => {
  const [client, setClient] = useState<ExtendedClient | null>(null);
  const signer = useSigner();
  const { status } = useSignerStatus();

  useEffect(() => {
    if (!signer || status !== "CONNECTED") return;

    const account = signer.toViemAccount() as LocalAccount;
    const newClient = createWalletClient({
      account,
      chain: zkSyncSepoliaTestnet,
      transport: http("/api/rpc/chain/" + zkSyncSepoliaTestnet.id),
    }).extend(publicActions);

    setClient(newClient as ExtendedClient);
  }, [signer, status]);

  return client;
};

export default useSignerClient;
