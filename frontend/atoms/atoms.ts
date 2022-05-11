import { atom } from "recoil";
import { ITodo, IRoutine } from "../types";
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

interface IUserInfo {
  accessToken: string;
  memberId: string;
  surveyedYn: boolean;
}

export const userInfoState = atom<IUserInfo>({
  key: "userInfo",
  default: {
    accessToken: "",
    memberId: "",
    surveyedYn: false,
  },
  effects: [localStorageEffect("userInfo")],
});

// export const accessTokenState = atom<string>({
//   key: "accessToken",
//   default: "",
//   effects: [localStorageEffect("accessToken")],
// });

// export const memberIdState = atom<string>({
//   key: "userInfo",
//   default: "",
//   effects: [localStorageEffect("memberId")],
// });

// export const surveyedYNState = atom<"Y" | "N">({
//   key: "surveyedYN",
//   default: "N",
//   effects: [localStorageEffect("surveyedYN")],
// });

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
