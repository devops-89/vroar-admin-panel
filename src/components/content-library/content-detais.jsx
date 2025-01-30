import { metaDataController } from "@/api/metaDataController";
import { CONTENT_DATA } from "@/assests/roadmapData";
import { COLORS, CONTENT_TYPE, METADATA_TYPE } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import {
  Backdrop,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ContentDetails = () => {
  const router = useRouter();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const getContentFullDetails = () => {
    metaDataController
      .getContentDetails(router.query.slug)
      .then((res) => {
        setDetails(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    if (router.query.slug) {
      getContentFullDetails();
    }
  }, [router.query.slug]);

  console.log("test", details);

  const viewData = [
    {
      label: "ID",
      value: details?.id,
    },
    {
      label: "Name",
      value: details?.name,
    },
    {
      label: "Type",
      value: details?.contentType,
    },
    {
      label: "Tags",
      value: details?.metadataTags,
    },
    {
      label: "Status",
      value: details?.status,
    },
  ];

  return (
    <div>
      {loading ? (
        <Backdrop open={loading}>
          <CircularProgress sx={{ color: COLORS.WHITE }} />
        </Backdrop>
      ) : (
        <Stack spacing={3} alignItems={"flex-start"}>
          {viewData.map((val, i) => (
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={Array.isArray(val.value) ? 10 : 10}
              flexWrap={"wrap"}
            >
              <Typography sx={{ fontFamily: roboto.style, width: 45 }}>
                {val.label}
              </Typography>
              {Array.isArray(val.value) ? (
                val.value.map((item, index) => (
                  <Chip
                    label={
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontFamily: roboto.style,
                        }}
                      >
                        {item.name}
                      </Typography>
                    }
                    sx={{
                      backgroundColor:
                        item.type === METADATA_TYPE.CAREER
                          ? COLORS.PENDING
                          : item.type === METADATA_TYPE.INDUSTRY
                          ? COLORS.DONE
                          : item.type === METADATA_TYPE.SOFT_SKILLS
                          ? COLORS.SIGNED_UP
                          : item.type === METADATA_TYPE.STRENGTHS
                          ? COLORS.PURPLE
                          : "",
                      color:
                        item.type === METADATA_TYPE.CAREER
                          ? COLORS.PENDING_TEXT
                          : item.type === METADATA_TYPE.INDUSTRY
                          ? COLORS.DONE_TEXT
                          : item.type === METADATA_TYPE.SOFT_SKILLS
                          ? COLORS.SIGNED_UP_TEXT
                          : item.type === METADATA_TYPE.STRENGTHS
                          ? COLORS.PURPLE_TEXT
                          : "",
                      mt: 1,
                    }}
                    key={index}
                  />
                ))
              ) : (
                <Typography sx={{ fontFamily: roboto.style, fontSize: 14 }}>
                  {val.value}
                </Typography>
              )}
            </Stack>
          ))}
        </Stack>
      )}
    </div>
  );
};

export default ContentDetails;
