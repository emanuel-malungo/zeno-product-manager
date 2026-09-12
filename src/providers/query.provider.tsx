"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Inicializamos o QueryClient numa variável de estado
  // para garantir que os dados não sejam partilhados entre diferentes 
  // utilizadores ou requisições numa renderização SSR.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minuto de cache fresca
            refetchOnWindowFocus: false, // Evita requisições extras ao mudar de aba
            retry: 1, // Tenta novamente 1 vez em caso de falha de rede
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
