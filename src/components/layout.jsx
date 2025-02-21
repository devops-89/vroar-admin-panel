import { useRouter } from "next/router";
import Header from "./header";
import Sidebar from "./sidebar";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { Box, IconButton } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarCollapse } from "@/redux/reducers/sidebarCollapse";
const Layout = ({ children }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const collapseSidebar = (status) => {
    dispatch(setSidebarCollapse({ isSidebarCollapse: status }));
  };

  const sidebarCollapse = useSelector(
    (state) => state.sideBarCollapse.isSidebarCollapse
  );

  console.log("first", sidebarCollapse);
  return (
    <div>
      <Head>
        <link href="/favicon.png" rel="icon" />
      </Head>
      <Analytics />
      <Box sx={{ position: "relative" }}>
        <IconButton
          sx={{
            position: "absolute",
            zIndex: 9999,
            top: -40,
            left: 185,
            backgroundColor: COLORS.TRANSPARENT,
            boxShadow: "0px 0px 1px 1px #00000020",
            ":hover": {
              backgroundColor: COLORS.TRANSPARENT,
            },
            width: 30,
            height: 30,
          }}
          onClick={() => collapseSidebar(sidebarCollapse ? false : true)}
        >
          {sidebarCollapse ? (
            <ChevronRight htmlColor={COLORS.BLACK} />
          ) : (
            <ChevronLeft htmlColor={COLORS.BLACK} />
          )}
        </IconButton>
      </Box>
      {router.pathname !== "/" && <Header />}
      {router.pathname !== "/" && <Sidebar />}
      {children}
    </div>
  );
};

export default Layout;
