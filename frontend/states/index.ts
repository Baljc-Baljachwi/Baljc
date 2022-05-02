import { atom } from "recoil";
import LocalStorage from "utils/localStorage";

interface IAccessToken {
  accessToken: string;
}

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

const accessTokenState = atom<IAccessToken>({
  key: "accessTokenState",
  default: {
    accessToken: "",
  },
  effects: [localStorageEffect("accessToken")],
});

export { accessTokenState };
