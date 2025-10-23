import { Header } from "@/components/header";
import { NavTabs } from "./NavTabs";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col gap-5 p-4">
      <Header />
      <NavTabs />
      <main>{children}</main>
    </div>
  );
}
