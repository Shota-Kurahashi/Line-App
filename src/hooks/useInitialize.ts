import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../libs/firebase";
import { useUserStore } from "../store/user/useUserStore";

export const useInitialize = () => {
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        const createGustUser = async () => {
          const gustUser = await signInAnonymously(auth).then(
            (result) => result.user
          );

          if (gustUser) {
            console.log("gustUser", gustUser);
            setUser(gustUser);
          }
        };
        createGustUser();
      }
    });
  }, [setUser]);
};
