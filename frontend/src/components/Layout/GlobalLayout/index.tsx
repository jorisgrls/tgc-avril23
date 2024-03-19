import Head from "next/head";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function GlobalLayout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>What's for dinner ?</title>
        <meta name="description" content="petites annonces" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main-content">{children}</main>
    </>
  );
}
