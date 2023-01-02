import { UserInfo } from "firebase/auth";
import create from "zustand";
import { UserInput } from "../../types/userType";

type UserInputStore = {
  userInput: UserInput;
  setUserInput: (userInput: UserInput) => void;
  resetUserInput: () => void;
};

type UserStore = {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  resetUser: () => void;
};

export const useInputUserStore = create<UserInputStore>((set) => ({
  userInput: {
    email: "",
    password: "",
  },
  setUserInput: ({ email, password }) =>
    set({ userInput: { email, password } }),
  resetUserInput: () => set({ userInput: { email: "", password: "" } }),
}));

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (userProp) => set({ user: userProp }),
  resetUser: () => set({ user: null }),
}));
