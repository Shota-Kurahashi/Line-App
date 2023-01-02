import { Button, Center, Container } from "@mantine/core";
import React from "react";
import { useAuth } from "../hooks/useAuth";

export const SignOut = () => {
  const { signOutUser } = useAuth();

  return (
    <Container>
      <Center>
        <Button onClick={() => signOutUser.mutate()}>ログアウト</Button>
      </Center>
    </Container>
  );
};
