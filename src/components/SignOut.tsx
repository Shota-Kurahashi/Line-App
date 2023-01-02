import { Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import React from "react";
import { useAuth } from "../hooks/useAuth";

export const SignOut = () => {
  const { signOutUser } = useAuth();

  return (
    <Button
      onClick={() => signOutUser.mutate()}
      className="bg-transparent transition-all hover:bg-gray-400"
    >
      <IconLogout />
    </Button>
  );
};
