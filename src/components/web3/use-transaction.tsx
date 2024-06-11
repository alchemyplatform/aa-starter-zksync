import { useBundlerClient, useSigner } from "@alchemy/aa-alchemy/react";
import { Hex } from "viem";
import { chainConfig, zkSyncSepoliaTestnet } from "viem/zksync";
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
  const client = useBundlerClient();
  const { createToast } = useTransactionToast();

  const sendTransaction = async ({
    to,
    value,
    data,
  }: TransactionArgs): Promise<Hex | undefined> => {
    if (!signer || !client) return;

    const { withHash } = createToast();
    const address = await signer.getAddress();
    const gasPrice = await client.getGasPrice();
    const nonce = await client.getTransactionCount({ address });
    const gas = await client.estimateGas({ account: address, to, data, value });

    const { paymasterInput } = getPaymasterParams(PAYMASTER_ADDRESS, {
      type: "General",
      innerInput: new Uint8Array(),
    });

    const args = {
      account: address,
      from: address,
      maxFeePerGas: gasPrice,
      gas,
      gasPerPubdata: BigInt(DEFAULT_GAS_PER_PUBDATA_LIMIT),
      nonce,
      chainId: client.chain.id,
      to,
      data,
      value,
      paymaster: PAYMASTER_ADDRESS,
      paymasterInput: paymasterInput as Hex,
    };

    const eip712Domain = zkSyncSepoliaTestnet.custom.getEip712Domain({
      ...args,
      type: "eip712",
    });

    const customSignature = await signer.signTypedData(eip712Domain);

    const signedTx = await signer.signTransaction(
      { ...args, customSignature },
      {
        serializer: chainConfig.serializers.transaction,
      },
    );

    const txHash = await client.sendRawTransaction({
      serializedTransaction: signedTx,
    });

    withHash(txHash);
    return txHash;
  };

  return { sendTransaction };
};

export default useTransaction;
