import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import "@fontsource/dm-sans/200.css";
import "@fontsource/dm-sans/300.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/800.css";
import { Nav } from "./_components/NavBar";

export const metadata: Metadata = {
  title: "Raindex",
  description: "Deploy Raindex strategies with a few clicks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        <Providers>
          <div className={`flex flex-col min-h-screen`}>
            <Nav />
            <div className="flex flex-col flex-grow md:items-center justify-center">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
