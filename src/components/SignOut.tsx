import { Button } from "@mantine/core";
import React from "react";
import { useAuth } from "../hooks/useAuth";

export const SignOut = () => {
  const { signOutUser } = useAuth();

  return <Button onClick={() => signOutUser.mutate()}>ログアウト</Button>;
};
