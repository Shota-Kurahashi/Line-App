import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../libs/firebase";
import { useUserStore } from "../store/user/useUserStore";

export const useInitialize = () => {
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [setUser]);
};
