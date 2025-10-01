import { Header } from "@/components/header";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header />
      <main className="px-4 py-6">{children}</main>
    </>
  );
}
