import type { Metadata } from "next";
import { Providers } from "@/providers";
import { RootLayoutClient } from "./layout.client";
import "./globals.css";

export const metadata: Metadata = {
  title: "Budget Planner",
  description: "A simple budget planning application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Providers>
      </body>
    </html>
  );
}
