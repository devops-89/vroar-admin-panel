import Layout from "@/components/layout";
import Modal from "@/components/modal";
import store from "@/redux/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import "react-quill/dist/quill.snow.css";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Modal />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
