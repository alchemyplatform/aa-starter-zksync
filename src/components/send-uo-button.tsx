import {
  useSendUserOperation,
  useSmartAccountClient,
} from "@alchemy/aa-alchemy/react";
import { UserOperationCallData } from "@alchemy/aa-core";
import { arbitrumSepolia } from "viem/chains";

export const SendUOButton = ({
  getUO,
}: {
  getUO: () => UserOperationCallData;
}) => {
  const { client, isLoadingClient } = useSmartAccountClient({
    type: "MultiOwnerModularAccount",
    gasManagerConfig: {
      policyId: process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID!,
    },
    opts: {
      txMaxRetries: 20,
    },
  });
  const {
    sendUserOperation,
    sendUserOperationResult,
    isSendingUserOperation,
    error: isSendUserOperationError,
  } = useSendUserOperation({ client, waitForTxn: true });

  return (
    <div className="flex flex-col">
      {sendUserOperationResult == null ? (
        <button
          className="w-full transform rounded-lg bg-[#363FF9] p-3 font-semibold text-[#FBFDFF] transition duration-500 ease-in-out hover:scale-105 disabled:bg-[#C0D4FF] disabled:hover:scale-100 dark:disabled:bg-[#4252C5]"
          onClick={async () => {
            console.log(getUO());
            sendUserOperation({
              uo: getUO(),
            });
          }}
          disabled={isSendingUserOperation || isLoadingClient}
        >
          <div className="flex flex-row items-center justify-center gap-3">
            {isSendingUserOperation && (
              // Loading spinner
              <div
                className="text-surface inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status"
              ></div>
            )}
            {isSendingUserOperation
              ? "Sending"
              : isSendUserOperationError
                ? "An error occurred. Try again!"
                : "Send user operation"}
          </div>
        </button>
      ) : (
        <a
          href={`${arbitrumSepolia.blockExplorers.default.url}/tx/${sendUserOperationResult.hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full transform rounded-lg bg-[#363FF9] p-3 text-center font-semibold text-[#FBFDFF] transition duration-500 ease-in-out hover:scale-105 dark:disabled:bg-[#4252C5]"
        >
          View transaction details
        </a>
      )}
    </div>
  );
};
