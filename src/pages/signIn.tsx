import {
  Button,
  Center,
  Container,
  Flex,
  Group,
  Input,
  PasswordInput,
  Space,
} from "@mantine/core";
import React from "react";
import { IconAt, IconBrandGoogle } from "@tabler/icons";
import { NextPage } from "next";
import { useAuth } from "../hooks/useAuth";
import { useInputUserStore } from "../store/user/useUserStore";

const SignIn: NextPage = () => {
  const userInput = useInputUserStore((state) => state.userInput);
  const setUserInput = useInputUserStore((state) => state.setUserInput);
  const { signIn, signInWithGoogle } = useAuth();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn.mutate(userInput);
  };

  return (
    <Container className="h-full  p-10 ">
      <Group position="center" className="h-full">
        <form
          onSubmit={submitHandler}
          className="flex  flex-col items-center justify-center "
        >
          <Flex justify="center" direction="column" align="center" gap={20}>
            <Input
              icon={<IconAt size={16} />}
              value={userInput.email}
              placeholder="Your email"
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
            />
            <PasswordInput
              value={userInput.password}
              placeholder="Password"
              withAsterisk
              className="w-52"
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
            />
          </Flex>
          <Space h={44} />
          <Center className="space-x-6">
            <Button
              loading={signIn.isLoading}
              disabled={signIn.isLoading}
              color={signIn.isSuccess ? "green" : "blue"}
              type="submit"
            >
              {signIn.isLoading ? "ログイン中..." : "ログイン"}
            </Button>
            <Button
              loading={signIn.isLoading}
              disabled={signIn.isLoading}
              color={signIn.isSuccess ? "green" : "blue"}
              type="button"
              leftIcon={<IconBrandGoogle />}
              onClick={() => signInWithGoogle.mutate()}
            >
              {signIn.isLoading ? "ログイン中..." : "Googleでログイン"}
            </Button>
          </Center>
        </form>
      </Group>
    </Container>
  );
};

export default SignIn;
