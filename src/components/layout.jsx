import { useRouter } from "next/router";
import Header from "./header";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div>
      
      {router.pathname !== "/" && <Header />}
      {router.pathname !== "/" && <Sidebar />}
      {children}
    </div>
  );
};

export default Layout;
