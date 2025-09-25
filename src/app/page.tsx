import { BudgetPlanner } from "@/budget";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight">Budget Planner</h1>
      <BudgetPlanner />
    </div>
  );
}
