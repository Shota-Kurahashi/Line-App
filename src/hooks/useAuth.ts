/* eslint-disable react-hooks/rules-of-hooks */
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserInfo,
} from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../libs/firebase";
import { useInputUserStore, useUserStore } from "../store/user/useUserStore";
import { UserInput } from "../types/userType";

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

const SignInWithGoogle = async (): Promise<User> => {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const user = await signInWithPopup(auth, provider).then(
    (result) => result.user
  );

  return user;
};

export const useAuth = () => {
  const resetUserInput = useInputUserStore((state) => state.resetUserInput);
  const setUser = useUserStore((state) => state.setUser);
  const resetUser = useUserStore((state) => state.resetUser);
  const router = useRouter();
  const signUp = useMutation(
    async (userInput: UserInput) => SignUpWithEmailAndPassword(userInput),
    {
      onSuccess: (user) => {
        const userValue: UserInfo = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          providerId: user.providerId,
        };
        setUser(userValue);
        resetUserInput();
        showNotification({
          title: "ログイン成功",
          message: "正常にログインしました",
          autoClose: 3000,
          color: "green",
        });

        router.push("/main");
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
        const userValue: UserInfo = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          providerId: user.providerId,
        };
        setUser(userValue);
        resetUserInput();
        showNotification({
          title: "ログイン成功",
          message: "正常にログインしました",
          autoClose: 3000,
          color: "green",
        });

        router.push("/main");
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

  const signInWithGoogle = useMutation(async () => SignInWithGoogle(), {
    onSuccess: (user) => {
      const userValue: UserInfo = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        providerId: user.providerId,
      };
      setUser(userValue);
      resetUserInput();
      showNotification({
        title: "ログイン成功",
        message: "正常にログインしました",
        autoClose: 3000,
        color: "green",
      });

      router.push("/main");
    },
    onError: () => {
      showNotification({
        title: "Error",
        message: "メールアドレスまたはパスワードが間違っています",
        autoClose: 3000,
        color: "red",
      });
    },
  });

  const signOutUser = useMutation(async () => signOut(auth), {
    onSuccess: () => {
      resetUser();
    },
    onError: () => {
      showNotification({
        title: "Error",
        message: "ログアウトに失敗しました",
        autoClose: 3000,
        color: "red",
      });
    },
  });

  return { signUp, signIn, signInWithGoogle, signOutUser };
};
