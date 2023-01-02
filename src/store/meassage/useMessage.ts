import create from "zustand";

type message = {
  message: string;
  setMessage: (inputMessage: string) => void;
  resetMessage: () => void;
};

export const useMessage = create<message>((set) => ({
  message: "",
  setMessage: (inputMessage) => set({ message: inputMessage }),
  resetMessage: () => set({ message: "" }),
}));
