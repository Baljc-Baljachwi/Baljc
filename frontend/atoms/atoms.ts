import { atom } from "recoil";
import LocalStorage from "utils/localStorage";

// atom localStorage 저장
const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = LocalStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? LocalStorage.removeItem(key)
        : LocalStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const accessTokenState = atom<string>({
  key: "accessToken",
  default: "",
  effects: [localStorageEffect("accessToken")],
});

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
