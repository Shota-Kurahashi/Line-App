import create from "zustand";
import { UserInput } from "../../types/useType";

type UserStore = {
  userInput: UserInput;
  setUserInput: (userInput: UserInput) => void;
  resetUserInput: () => void;
};

export const useInputUserStore = create<UserStore>((set) => ({
  userInput: {
    email: "",
    password: "",
  },
  setUserInput: ({ email, password }) =>
    set({ userInput: { email, password } }),
  resetUserInput: () => set({ userInput: { email: "", password: "" } }),
}));
