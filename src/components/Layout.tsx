import { AppShell } from "@mantine/core";
import React, { FC } from "react";
import { Header } from "./Header";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => (
  <AppShell header={<Header />}>{children}</AppShell>
);
