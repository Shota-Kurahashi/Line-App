import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../libs/firebase";
import { useMessage } from "../store/meassage/useMessage";
import { useUserStore } from "../store/user/useUserStore";

export const useMutateMessage = () => {
  const user = useUserStore((state) => state.user);
  const resetMessage = useMessage((state) => state.resetMessage);
  const queryClient = useQueryClient();
  const mutateMessage = useMutation(
    async (message: string) => {
      const messageDoc = collection(db, "messages");
      const time = serverTimestamp();
      await addDoc(messageDoc, {
        text: message,
        createdAt: time,
        photoURL: user?.photoURL,
        uid: user?.uid,
      });

      return { time, message };
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["messages"]);
        resetMessage();
      },
    }
  );

  return { mutateMessage };
};
