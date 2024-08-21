"use client";
import { ClerkProvider, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CartProvider } from "../context/CartContext";
import { WatchlistProvider } from "../context/WatchListContext";
import { Navbar } from "./ui-core/components";
// import { Roboto } from "next/font/google";
import "./App.css";

// const roboto = Roboto({
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <CartProvider>
              <WatchlistProvider>
                <Navbar />
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
                {children}
              </WatchlistProvider>
            </CartProvider>
          </QueryClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
