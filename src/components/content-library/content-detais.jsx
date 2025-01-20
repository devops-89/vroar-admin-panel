import { CONTENT_DATA } from "@/assests/roadmapData";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ContentDetails = () => {
  const router = useRouter();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (router.query.slug) {
      const newData = CONTENT_DATA.find(
        (val) => val.id === JSON.parse(router.query.slug)
      );
      setTimeout(() => {
        setDetails(newData);
        setLoading(false);
      }, 2000);
      console.log("first", newData);
    }
  }, [router.query.slug]);

  return (
    <div>
      {loading ? (
        <Backdrop open={loading}>
          <CircularProgress sx={{ color: COLORS.WHITE }} />
        </Backdrop>
      ) : (
        <Stack spacing={3} alignItems={"flex-start"}>
          <Stack direction={"row"} alignItems={"center"} spacing={10}>
            <Typography sx={{ fontFamily: roboto.style, width: 45 }}>
              ID
            </Typography>
            <Typography sx={{ fontFamily: roboto.style }}>
              {details.id}
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} spacing={10}>
            <Typography sx={{ fontFamily: roboto.style, width: 45 }}>
              Name
            </Typography>
            <Typography sx={{ fontFamily: roboto.style }}>
              {details.name}
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} spacing={10}>
            <Typography sx={{ fontFamily: roboto.style, width: 45 }}>
              Type
            </Typography>
            <Typography sx={{ fontFamily: roboto.style }}>
              {details.type}
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} spacing={10}>
            <Typography sx={{ fontFamily: roboto.style, width: 45 }}>
              Tags
            </Typography>
            <Typography sx={{ fontFamily: roboto.style }}>
              {details.tags.join(" , ")}
            </Typography>
          </Stack>
        </Stack>
      )}
    </div>
  );
};

export default ContentDetails;
