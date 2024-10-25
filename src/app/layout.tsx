import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_components/navbar";

export const metadata: Metadata = {
  title: "Momentum",
  description: "Next level todo app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <TRPCReactProvider>
        <body>
          <Navbar />
          {children}
        </body>
      </TRPCReactProvider>
    </html>
  );
}
