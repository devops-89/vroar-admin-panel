import { metaDataController } from "@/api/metaDataController";
import EditEventForm from "@/components/event/editEvent";
import Wrapper from "@/components/wrapper";
import { setToast } from "@/redux/reducers/toast";
import { ToastStatus } from "@/utils/enum";
import withAuth from "@/utils/withAuth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const EditEvent = () => {
  const router = useRouter();
  const [details, setDetails] = useState(null);
  const id = router.query.slug;
  const dispatch = useDispatch();
  const getEventById = (id) => {
    metaDataController
      .getEventById(id)
      .then((res) => {
        setDetails(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
        dispatch(
          setToast({
            open: true,
            message: "Getting error in fetch details",
            severity: ToastStatus.ERROR,
          })
        );
      });
  };

  useEffect(() => {
    if (id) {
      getEventById(id);
    }
  }, [id]);

  return (
    <div>
      <EditEventForm details={details} />
    </div>
  );
};

export default withAuth(EditEvent);
