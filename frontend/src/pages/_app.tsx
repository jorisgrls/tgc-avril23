import "@/styles/global.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";
import GlobalLayout from "@/components/Layout/GlobalLayout";
import LayoutNavbar from "@/components/LayoutNavbar";
import { Toaster } from "react-hot-toast";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <GlobalLayout>
          <Component {...pageProps} />
          <Toaster position="bottom-right" />
        </GlobalLayout>
      </ApolloProvider>
    </>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
