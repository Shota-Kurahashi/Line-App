import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth } from "../libs/firebase";
import { useInputUserStore } from "../store/user/useUserStore";
import { UserInput } from "../types/useType";

const SignUpWithEmailAndPassword = async (
  userInput: UserInput
): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    userInput.email,
    userInput.password
  );

  return userCredential.user;
};

const SignInWithEmailAndPassword = async (
  userInput: UserInput
): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    userInput.email,
    userInput.password
  );

  return userCredential.user;
};

// const SignInWithGoogle = async (): Promise<User> => {};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const resetUserInput = useInputUserStore((state) => state.resetUserInput);

  const signUp = useMutation(
    async (userInput: UserInput) => SignUpWithEmailAndPassword(userInput),
    {
      onSuccess: (user) => {
        queryClient.setQueryData(["user"], user);
        resetUserInput();
        showNotification({
          title: "ログイン成功",
          message: "正常にログインしました",
          autoClose: 3000,
          color: "green",
        });
      },
      onError: () => {
        showNotification({
          title: "Error",
          autoClose: 3000,
          message: "メールアドレスまたはパスワードが間違っています",
        });
      },
    }
  );

  const signIn = useMutation(
    async (userInput: UserInput) => SignInWithEmailAndPassword(userInput),
    {
      onSuccess: (user) => {
        queryClient.setQueryData(["user"], user);
        resetUserInput();
        showNotification({
          title: "ログイン成功",
          message: "正常にログインしました",
          autoClose: 3000,
          color: "green",
        });
      },
      onError: () => {
        showNotification({
          title: "Error",
          message: "メールアドレスまたはパスワードが間違っています",
          autoClose: 3000,
          color: "red",
        });
      },
    }
  );

  return { signUp, signIn };
};
