import { useMutation } from "@tanstack/react-query";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../libs/firebase";
import { useMessage } from "../store/meassage/useMessage";
import { useUserStore } from "../store/user/useUserStore";

export const useMutateMessage = () => {
  const user = useUserStore((state) => state.user);
  const resetMessage = useMessage((state) => state.resetMessage);
  const mutateMessage = useMutation(
    async (message: string) => {
      const messageDoc = collection(db, "messages");
      await addDoc(messageDoc, {
        text: message,
        createdAt: serverTimestamp(),
        photoURL: user?.photoURL,
        uid: user?.uid,
      });

      return message;
    },
    {
      onSuccess: (message) => {
        console.log(message);
        resetMessage();
      },
    }
  );

  return { mutateMessage };
};
