import { atom } from "recoil";

export interface ITodoTypes {
  todoId: string;
  date: string;
  content: string;
  completedYn: string;
}

export const todosState = atom<ITodoTypes[]>({
  key: "todos",
  default: [],
});

export interface IBudgetTypes {
  remainingBudget: number;
  dailyExpenditure: number;
  estimatedExpenditure: number;
}

export const budgetsState = atom<IBudgetTypes[]>({
  key: "budgets",
  default: [],
});
