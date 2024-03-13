import Layout from "@/components/Layout";
import GlobalStyle from "../styles";
import useSWR, { SWRConfig } from "swr";

import { SessionProvider } from "next-auth/react";

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");

    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const { data: ponies, error, isLoading } = useSWR("/api/ponies", fetcher);

  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>
        <SWRConfig value={{ fetcher }}>
          <Layout>
            <Component
              {...pageProps}
              ponies={ponies}
              error={error}
              isLoading={isLoading}
            />
          </Layout>
        </SWRConfig>
      </SessionProvider>
    </>
  );
}
