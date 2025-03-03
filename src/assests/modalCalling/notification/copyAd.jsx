import { metaDataController } from "@/api/metaDataController";
import { hideModal } from "@/redux/reducers/modal";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Close } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const CopyAd = ({ id }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const copyDetails = () => {
    router.push(
      `/notification-management/ad-list//${id}/edit-event?event=copy`
    );
    closeModal();
  };

  const closeModal = () => {
    dispatch(hideModal());
  };
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const getEventById = (id) => {
    metaDataController
      .getEventById(id)
      .then((res) => {
        // console.log("res", res);
        setDetails(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Err", err);
        setLoading(true);
      });
  };

  useEffect(() => {
    if (id) {
      getEventById(id);
    }
  }, [id]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography sx={{ fontSize: 18, fontFamily: roboto.style }}>
          Copy Details
        </Typography>
        <IconButton onClick={closeModal}>
          <Close htmlColor={COLORS.PRIMARY} />
        </IconButton>
      </Stack>
      <Divider />
      {loading ? (
        <Box
          sx={{
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loading type="bars" width={30} height={30} color={COLORS.PRIMARY} />
        </Box>
      ) : (
        <>
          <Stack spacing={2} sx={{ mt: 3 }}>
            {newData.map((val, i) => (
              <Stack direction={"row"} spacing={10} key={i}>
                <Box sx={{ width: 300 }}>
                  <Stack spacing={2}>
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {val.label}
                    </Typography>
                  </Stack>
                </Box>
                <Box sx={{ width: 900 }}>
                  <Stack spacing={2}>
                    <Typography
                      component={val.url ? "a" : "text"}
                      href={val.value}
                      sx={{
                        fontSize: 14,
                        fontFamily: roboto.style,
                        fontWeight: 400,
                      }}
                    >
                      {val.value}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            ))}
          </Stack>
          <Stack direction={"row"} alignItems={"center"} spacing={4} mt={3}>
            <Button
              sx={{
                backgroundColor: COLORS.TRANSPARENT,
                color: COLORS.PRIMARY,
                border: `1px solid ${COLORS.PRIMARY}`,
                textTransform: "initial",
                fontFamily: roboto.style,
              }}
              fullWidth
              onClick={copyDetails}
            >
              Edit Event
            </Button>
            <Button
              sx={{
                backgroundColor: COLORS.PRIMARY,
                color: COLORS.WHITE,
                border: `1px solid ${COLORS.PRIMARY}`,
                textTransform: "initial",
                fontFamily: roboto.style,
              }}
              fullWidth
            >
              Publish Event
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default CopyAd;
