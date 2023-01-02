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
import React, { FC } from "react";
import { IconAt } from "@tabler/icons";
import { useSignIn } from "../hooks/useAuth";
import { useInputUserStore } from "../store/user/useUserStore";

export const SignIn: FC = () => {
  const userInput = useInputUserStore((state) => state.userInput);
  const setUserInput = useInputUserStore((state) => state.setUserInput);
  const { signIn } = useSignIn();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn.mutate(userInput);
  };

  return (
    <div className="pt-10">
      <Container className="">
        <Group position="center">
          <form onSubmit={submitHandler}>
            <Flex justify="center" align="center" gap={20}>
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
                className="w-40"
                onChange={(e) =>
                  setUserInput({ ...userInput, password: e.target.value })
                }
              />
            </Flex>
            <Space h={44} />
            <Center>
              <Button
                loading={signIn.isLoading}
                disabled={signIn.isLoading}
                color={signIn.isSuccess ? "green" : "blue"}
                type="submit"
              >
                {signIn.isLoading ? "ログイン中..." : "ログイン"}
              </Button>
            </Center>
          </form>
        </Group>
      </Container>
    </div>
  );
};
