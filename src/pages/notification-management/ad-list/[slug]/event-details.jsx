import { metaDataController } from "@/api/metaDataController";
import Wrapper from "@/components/wrapper";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
const EventDetails = () => {
  const router = useRouter();

  const id = router.query.slug;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const getEventById = (id) => {
    metaDataController
      .getEventById(id)
      .then((res) => {
        setDetails(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      getEventById(id);
    }
  }, [id]);

  const newData = [
    {
      label: "Event Name",
      value: details?.eventName,
    },
    {
      label: "Speaker Name",
      value: details?.speakerName,
    },
    {
      label: "Event Description",
      value: details?.eventDescription,
    },

    {
      label: "Speaker Summary",
      value: details?.speakerSummary,
    },
    {
      label: "Session Details",
      value: details?.sessionDetails,
    },
    {
      label: "Session Dates",
      value: `${moment
        .unix(details?.sessionStartDate)
        .format("Do MMMM YYYY")} - ${moment
        .unix(details?.sessionEndDate)
        .format("Do MMMM YYYY")}`,
    },
    {
      label: "Session Timings",
      value: `${details?.sessionStartTime} - ${details?.sessionEndTime}`,
    },
    {
      label: "Zoom Link",
      value: details?.zoomLink,
      url: true,
    },
  ];
  return (
    <div>
      <Wrapper>
        {loading ? (
          <Backdrop open={loading}>
            <CircularProgress color={COLORS.WHITE} />
          </Backdrop>
        ) : (
          <>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                sx={{ fontSize: 20, fontFamily: roboto.style, fontWeight: 550 }}
              >
                Event Details
              </Typography>
              <Button
                endIcon={<FaRegEdit />}
                sx={{
                  fontSize: 14,
                  color: COLORS.PRIMARY,
                  border: `1px solid ${COLORS.PRIMARY}`,
                }}
              >
                Edit
              </Button>
            </Stack>
            <Stack spacing={2} sx={{ mt: 3 }}>
              {newData.map((val, i) => (
                <Stack direction={"row"} spacing={10} key={i}>
                  <Box sx={{ width: 200 }}>
                    <Stack spacing={2}>
                      <Typography
                        sx={{ fontSize: 15, fontFamily: roboto.style }}
                      >
                        {val.label}
                      </Typography>
                    </Stack>
                  </Box>
                  <Box sx={{ width: 900 }}>
                    <Stack spacing={2}>
                      <Typography
                        component={val.url ? "a" : "text"}
                        href={val.value}
                        sx={{ fontSize: 14, fontFamily: roboto.style }}
                      >
                        {val.value}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </>
        )}
      </Wrapper>
    </div>
  );
};

export default EventDetails;
