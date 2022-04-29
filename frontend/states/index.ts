import { atom } from "recoil";

interface IAccessToken {
  accessToken: string;
}

// atom localStorage 저장
const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
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
