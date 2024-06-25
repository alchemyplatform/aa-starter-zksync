import { useSigner } from "@alchemy/aa-alchemy/react";
import {
  Hash,
  Hex,
  LocalAccount,
  createWalletClient,
  http,
  publicActions,
} from "viem";
import {
  zkSyncSepoliaTestnet,
  sendTransaction as sendZkSyncTransaction,
  sendEip712Transaction,
} from "viem/zksync";
import { getPaymasterParams } from "zksync-ethers/build/paymaster-utils";
import { DEFAULT_GAS_PER_PUBDATA_LIMIT } from "zksync-ethers/build/utils";
import useTransactionToast from "./use-transaction-toast";
import { PAYMASTER_ADDRESS } from "@/config";

interface TransactionArgs {
  to: Hex;
  value: bigint;
  data: Hex;
}

const useTransaction = () => {
  const signer = useSigner();
  const { createToast } = useTransactionToast();

  const sendTransaction = async ({
    to,
    value,
    data,
  }: TransactionArgs): Promise<Hex | undefined> => {
    if (!signer) return;

    const account = signer.toViemAccount() as LocalAccount;
    const client = createWalletClient({
      account,
      chain: zkSyncSepoliaTestnet,
      transport: http("/api/rpc/chain/" + zkSyncSepoliaTestnet.id),
    }).extend(publicActions);

    const { withHash } = createToast();

    let hash: Hash;

    if (PAYMASTER_ADDRESS) {
      const { paymasterInput } = getPaymasterParams(PAYMASTER_ADDRESS, {
        type: "General",
        innerInput: new Uint8Array(),
      });
      hash = await sendEip712Transaction(client, {
        to,
        data,
        value,
        account,
        paymaster: PAYMASTER_ADDRESS,
        paymasterInput: paymasterInput as Hex,
        gasPerPubdata: BigInt(DEFAULT_GAS_PER_PUBDATA_LIMIT),
        maxFeePerGas: await client.getGasPrice(),
      });
    } else {
      hash = await sendZkSyncTransaction(client, {
        to,
        data,
        value,
      });
    }

    withHash(hash);
    return hash;
  };

  return { sendTransaction };
};

export default useTransaction;
