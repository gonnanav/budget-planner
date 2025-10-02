import { usePathname } from "next/navigation";
import { PathnameContext } from "@/contexts/PathnameContext";

export function PathnameProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return <PathnameContext value={pathname}>{children}</PathnameContext>;
}
