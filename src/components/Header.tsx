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
      <Flex className="relative h-full" align="center" justify="space-around">
        <SignOut />
        <Text fw={700} color="white" className="text-2xl">
          Line App
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
