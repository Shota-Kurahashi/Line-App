import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import queryClient from "../libs/queryClient";
import { useInitialize } from "../hooks/useInitialize";

const App = ({ Component, pageProps }: AppProps) => {
  const [client] = useState(() => queryClient);

  useInitialize();

  return (
    <QueryClientProvider client={client}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <NotificationsProvider position="top-right">
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
