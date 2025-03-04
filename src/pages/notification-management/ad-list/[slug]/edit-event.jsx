import { metaDataController } from "@/api/metaDataController";
import EditEventForm from "@/components/event/editEvent";
import Wrapper from "@/components/wrapper";
import withAuth from "@/utils/withAuth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const EditEvent = () => {
  const router = useRouter();
  const [details, setDetails] = useState(null);
  const id = router.query.slug;

  const getEventById = (id) => {
    metaDataController
      .getEventById(id)
      .then((res) => {
        // console.log("rs", res);
        setDetails(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
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
