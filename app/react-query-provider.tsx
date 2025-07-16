"use client";
// NOTE: if not included error occurs
// ⨯ Error: Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.
//   <... client={{}} children={{...}}>
//               ^^^^
//     at stringify (<anonymous>)
//     at stringify (<anonymous>)
//     at stringify (<anonymous>) {
//   digest: '310912883'
// }

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();
export function ReactQueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
