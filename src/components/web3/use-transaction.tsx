import { Hash, Hex } from "viem";
import {
  sendTransaction as sendZkSyncTransaction,
  sendEip712Transaction,
} from "viem/zksync";
import { getPaymasterParams } from "zksync-ethers/build/paymaster-utils";
import { DEFAULT_GAS_PER_PUBDATA_LIMIT } from "zksync-ethers/build/utils";
import useTransactionToast from "./use-transaction-toast";
import { PAYMASTER_ADDRESS } from "@/config";
import useSignerClient from "./use-signer-client";

interface TransactionArgs {
  to: Hex;
  value: bigint;
  data: Hex;
}

const useTransaction = () => {
  const signerClient = useSignerClient();
  const { createToast } = useTransactionToast();

  const sendTransaction = async ({
    to,
    value,
    data,
  }: TransactionArgs): Promise<Hex | undefined> => {
    if (!signerClient) return;
    const { withHash } = createToast();

    let hash: Hash;

    if (PAYMASTER_ADDRESS) {
      const { paymasterInput } = getPaymasterParams(PAYMASTER_ADDRESS, {
        type: "General",
        innerInput: new Uint8Array(),
      });
      hash = await sendEip712Transaction(signerClient, {
        to,
        data,
        value,
        account: signerClient.account,
        paymaster: PAYMASTER_ADDRESS,
        paymasterInput: paymasterInput as Hex,
        gasPerPubdata: BigInt(DEFAULT_GAS_PER_PUBDATA_LIMIT),
        maxFeePerGas: await signerClient.getGasPrice(),
      });
    } else {
      hash = await sendZkSyncTransaction(signerClient, {
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
