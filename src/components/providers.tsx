"use client";

import { config, queryClient } from "@/config";
import {
  AlchemyAccountProvider,
  AlchemyAccountsProviderProps,
} from "@alchemy/aa-alchemy/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, Suspense } from "react";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "./ui/tooltip";

export const Providers = ({
  initialState,
  children,
}: PropsWithChildren<{
  initialState?: AlchemyAccountsProviderProps["initialState"];
}>) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Suspense>
        <QueryClientProvider client={queryClient}>
          <AlchemyAccountProvider
            config={config}
            queryClient={queryClient}
            initialState={initialState}
          >
            <TooltipProvider>{children}</TooltipProvider>
          </AlchemyAccountProvider>
        </QueryClientProvider>
      </Suspense>
    </ThemeProvider>
  );
};
