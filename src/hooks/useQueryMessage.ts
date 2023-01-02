import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../libs/firebase";
import { Message } from "../types/messgaes";

const getMessages = async (): Promise<Message[]> => {
  const massagesCollection = query(
    collection(db, "messages"),
    orderBy("createdAt", "asc")
  );

  const messages = await getDocs(massagesCollection).then((querySnapshot) =>
    querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Message, "id">),
    }))
  );

  return messages;
};

export const useQueryMessage = () =>
  useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: getMessages,
  });
