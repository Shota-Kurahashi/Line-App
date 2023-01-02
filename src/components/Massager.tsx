import { Button, Flex, Footer, Input } from "@mantine/core";
import React, { FC } from "react";
import { useMutateMessage } from "../hooks/useMutateMessage";
import { useMessage } from "../store/meassage/useMessage";
import { useUserStore } from "../store/user/useUserStore";

export const Massager: FC = () => {
  const setMessage = useMessage((state) => state.setMessage);
  const message = useMessage((state) => state.message);
  const { mutateMessage } = useMutateMessage();
  const user = useUserStore((state) => state.user);

  return (
    <Footer height={60}>
      <Flex justify="space-around" align="center" className="h-full">
        <Input
          className="w-3/4"
          value={message}
          disabled={!user}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button disabled={!user} onClick={() => mutateMessage.mutate(message)}>
          送信
        </Button>
      </Flex>
    </Footer>
  );
};
