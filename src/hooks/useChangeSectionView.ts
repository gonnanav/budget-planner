import { useRouter } from "next/navigation";

export function useChangeSectionView(basePath: string) {
  const router = useRouter();

  const changeView = (view: "items" | "categories") => {
    router.push(`${basePath}/${view}`);
  };

  return { changeView };
}
