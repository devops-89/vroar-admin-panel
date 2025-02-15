import { useRouter } from "next/router";
import Header from "./header";
import Sidebar from "./sidebar";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <link href="/favicon.png" rel="icon" />
      </Head>
      <Analytics />
      {router.pathname !== "/" && <Header />}
      {router.pathname !== "/" && <Sidebar />}
      {children}
    </div>
  );
};

export default Layout;
