import { atom } from "recoil";
import { ITodo, IRoutine } from "../types";
export interface ITodoTypes {
  todoId: string;
  date: string;
  content: string;
  completedYn: string;
}

// todo
export const todosState = atom<ITodoTypes[]>({
  key: "todos",
  default: [],
});

// routine
export const routineState = atom<IRoutine[]>({
  key: "routines",
  default: [],
});
