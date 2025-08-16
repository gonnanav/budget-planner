export type BudgetStatus = 'balanced' | 'positive' | 'negative';

export interface BudgetEvaluation {
  balance: number;
  status: BudgetStatus;
}

export function evaluateBudget(incomes: number, expenses: number): BudgetEvaluation {
  const balance = incomes - expenses;
  const status = balance === 0 ? 'balanced' : balance > 0 ? 'positive' : 'negative';
  
  return {
    balance,
    status
  };
}
