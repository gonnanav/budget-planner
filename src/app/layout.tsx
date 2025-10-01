import type { Metadata } from "next";
import { Providers } from "@/providers";
import { Header } from "@/header";
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
          <Header />
          <main className="px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
