import { Avatar, Flex } from "@mantine/core";
import React, { FC } from "react";
import { useQueryMessage } from "../hooks/useQueryMessage";
import { useUserStore } from "../store/user/useUserStore";
import { Massager } from "./Massager";

export const Line: FC = () => {
  const { data } = useQueryMessage();
  const user = useUserStore((state) => state.user);

  return (
    <div className="h-full w-full ">
      <ul className="mt-10 space-y-10 p-0">
        {data?.map((message) => (
          <li key={message.id} className="list-none rounded-md">
            <div
              className={`flex items-center px-4 md:px-10 ${
                message.uid === user?.uid ? "justify-end" : "justify-start"
              }`}
            >
              <Flex
                className="max-w-[70%] space-x-4 overflow-hidden "
                justify={message.uid === user?.uid ? "end" : "start"}
                align="center"
              >
                <Avatar
                  src={message.photoURL ?? null}
                  radius="xl"
                  className="mt-2 self-start"
                />
                <div className="w-[calc(100%-38px-16px)] pt-2">
                  <p className="break-words rounded-md bg-purple-200 p-2">
                    {message.text}
                  </p>
                </div>
              </Flex>
            </div>
          </li>
        ))}
      </ul>
      <Massager />
    </div>
  );
};
