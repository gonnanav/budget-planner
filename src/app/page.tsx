import { BudgetPlanner } from "@/components/budget";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-screen-sm flex-col gap-6 px-4 py-6">
      <h1 className="text-2xl font-bold tracking-tight">Budget Planner</h1>
      <BudgetPlanner />
    </main>
  );
}
