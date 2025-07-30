import Layout from "@/components/layout";
import Modal from "@/components/modal";
import store from "@/redux/store";
import "@/styles/globals.css";
import { Provider, useDispatch } from "react-redux";
import "react-quill/dist/quill.snow.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ToastBar from "@/components/toastBar";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { AddUserDetails } from "@/redux/reducers/user";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = jwtDecode(token);
      dispatch(AddUserDetails({ ...decoded, isAuthenticated: true }));
    }
  }, [dispatch]);

  return null;
}

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      <Layout>
        <Modal />
        <Component {...pageProps} />
        <SpeedInsights />
        <ToastBar />
      </Layout>
    </Provider>
  );
}
