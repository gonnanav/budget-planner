"use client";

import { IncomeSection } from "@/components/income/IncomeSection";

export default function Home() {
  return (
    <div>
      <h1 className="mb-4 text-2xl">Budget Planner</h1>
      <IncomeSection />
    </div>
  );
}
