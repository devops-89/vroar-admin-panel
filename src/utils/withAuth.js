import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setToast } from "@/redux/reducers/toast";
import { ToastStatus } from "./enum";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    const dispatch = useDispatch();

    useEffect(() => {
      if (typeof window !== "undefined") {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          router.replace("/");
          dispatch(
            setToast({
              open: true,
              message: "Please Login",
              severity: ToastStatus.WARNING,
            })
          );
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
