import { metaDataController } from "@/api/metaDataController";
import ViewPdf from "@/assests/modalCalling/View-pdf";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import Wrapper from "@/components/wrapper";
import { showModal } from "@/redux/reducers/modal";
import { COLORS, CONTENT_TYPE } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import withAuth from "@/utils/withAuth";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";

const ViewRoadmap = () => {
  const router = useRouter();
  const { roadmapId } = router.query;

  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const viewRoadmapDetails = () => {
    metaDataController
      .getRoadmapDetails(roadmapId)
      .then((res) => {
        // console.log("test", res);
        const response = res.data.data;
        setRoadmapData(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleRouter = () => {
    router.push(`/roadmap-management/${roadmapId}/edit-roadmap`);
  };

  useEffect(() => {
    if (roadmapId) {
      viewRoadmapDetails();
    }
  }, [roadmapId]);
  const dispatch = useDispatch();
  const pdfviewer = async (pdfUrl) => {
    dispatch(showModal(<ViewPdf fileUrl={pdfUrl} />));
  };


  const arrayData = [
    {
      label: "Roadmap Name",
      value: roadmapData?.name,
    },
    {
      label: "Tags",
      value: roadmapData?.metadataTags?.map((data) => data.name).join(" , "),
    },
    {
      label: "Tiles",
      value: roadmapData?.roadmapSteps?.length,
    },
  ];

  return (
    <div>
      <Wrapper>
        {loading ? (
          <Backdrop open={loading}>
            <CircularProgress sx={{ color: COLORS.WHITE }} />
          </Backdrop>
        ) : (
          <Card>
            <Box sx={{ p: 2 }}>
              <PageBreadCrumbs
                data={[
                  {
                    label: "Roadmap Management",
                    url: "/roadmap-management",
                  },
                  {
                    label: "Create/View Roadmap",
                    url: "/roadmap-management/create-roadmap",
                  },
                  {
                    label: "View Roadmap",
                    url: `/roadmap-management/${roadmapId}/view-roadmap`,
                  },
                ]}
              />
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  variant={"h5"}
                  sx={{ fontFamily: roboto.style, fontWeight: 600 }}
                >
                  Roadmap Name
                </Typography>
                <Button
                  endIcon={<FaRegEdit />}
                  sx={{
                    fontSize: 15,
                    fontFamily: roboto.style,
                    border: `1px solid ${COLORS.PRIMARY}`,
                    color: COLORS.PRIMARY,
                  }}
                  onClick={handleRouter}
                >
                  Edit
                </Button>
              </Stack>
              <Box sx={{ mt: 2 }}>
                <Stack alignItems={"flex-start"} spacing={2}>
                  {arrayData.map((data, index) => (
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      spacing={4}
                      key={index}
                    >
                      <Typography
                        variant={"body1"}
                        sx={{
                          fontFamily: roboto.style,
                          fontWeight: 500,
                          fontSize: 14,
                          width: 200,
                        }}
                      >
                        {data.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: roboto.style,
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        {data.value}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
              <Divider sx={{ mt: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    fontFamily: roboto.style,
                  }}
                >
                  Tile Details
                </Typography>
                <Stack alignItems={"flex-start"} spacing={4} sx={{ mt: 2 }}>
                  {roadmapData?.roadmapSteps.map((data, index) => {
                    const newData = [
                      {
                        label: "Name",
                        value: data.name,
                      },
                      {
                        label: "content Type",
                        value: data.content?.contentType,
                      },
                      data.content?.contentType === CONTENT_TYPE.ARTICLE_PDF ||
                      data?.content?.contentType ===
                        CONTENT_TYPE.ARTICLE_WRITEUP ||
                      data?.content?.contentType === CONTENT_TYPE.ASSIGNMENT
                        ? {
                            label: "Uploaded Pdf",
                            value: data.content?.contentFileName,
                            url: data.content?.contentLink,
                            type: data?.content?.contentType,
                          }
                        : {
                            label: data?.content?.contentType,
                            value: data.content?.contentFileName,
                            url: data.content?.contentLink,
                            type: data?.content?.contentType,
                          },
                      {
                        label: "Time Required",
                        value: data.time,
                      },
                      {
                        label: "Points Allocated",
                        value: data.points,
                      },
                    ];

                    return (
                      <Stack
                        direction={"row"}
                        alignItems={"flex-start"}
                        spacing={20}
                      >
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 500,
                            fontFamily: roboto.style,
                          }}
                        >
                          Tile {index + 1}
                        </Typography>
                        <Stack alignItems={"flex-start"} spacing={1}>
                          {newData.map((val, i) => (
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              key={i}
                            >
                              <Typography
                                sx={{
                                  fontSize: 14,
                                  fontFamily: roboto.style,
                                  width: 200,
                                }}
                              >
                                {val.label}
                              </Typography>
                              {val.type === CONTENT_TYPE.ARTICLE_PDF ||
                              val.type === CONTENT_TYPE.ARTICLE_WRITEUP ||
                              val.type === CONTENT_TYPE.ASSIGNMENT ? (
                                <Typography
                                  sx={{
                                    fontSize: 14,
                                    fontFamily: roboto.style,
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                    color: COLORS.DARKBLUE,
                                  }}
                                  onClick={() => pdfviewer(val.url)}
                                >
                                  {val.value}
                                </Typography>
                              ) : (
                                <Typography
                                  sx={{
                                    fontSize: 14,
                                    fontFamily: roboto.style,
                                  }}
                                  component={"a"}
                                  href={val.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {val.value}
                                </Typography>
                              )}
                            </Stack>
                          ))}
                        </Stack>
                      </Stack>
                    );
                  })}
                </Stack>
              </Box>
            </Box>
          </Card>
        )}
      </Wrapper>
    </div>
  );
};

export default withAuth(ViewRoadmap);
