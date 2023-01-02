import React, { FC } from "react";
import { Avatar, Flex, Header as MHeader, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useUserStore } from "../store/user/useUserStore";
import { SignOut } from "./SignOut";

export const Header: FC = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  return (
    <MHeader height={50} bg="gray">
      <Flex className="relative h-full px-6 md:px-10" align="center">
        <SignOut />
        <Text fw={700} color="white" className="flex-1 text-center text-2xl">
          練習用チャット
        </Text>
        <Avatar
          src={user?.photoURL ?? null}
          className={` ${user ? "" : "cursor-pointer"}`}
          radius="xl"
          onClick={() => user ?? router.push("/signIn")}
        />
      </Flex>
    </MHeader>
  );
};
