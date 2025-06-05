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
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";

// ContentViewer component to handle different content types
const ContentViewer = ({ content, onClose }) => {
  const dispatch = useDispatch();
  
  if (!content) return null;

  // Handle PDF content types using the existing ViewPdf component
  if (content.contentType === CONTENT_TYPE.ARTICLE_PDF || 
      content.contentType === CONTENT_TYPE.ARTICLE_WRITEUP || 
      content.contentType === CONTENT_TYPE.ASSIGNMENT) {
    dispatch(showModal(<ViewPdf fileUrl={content.contentLink} />));
    onClose();
    return null;
  }

  // Handle external article links by opening in new tab
  if (content.contentType === CONTENT_TYPE.JOURNAL_LINK) {
    window.open(content.contentLink, '_blank', 'noopener,noreferrer');
    onClose();
    return null;
  }

  const getEmbedUrl = (url) => {
    if (content.contentType === CONTENT_TYPE.YOUTUBE_VIDEO_LINK) {
      try {
        // Handle different YouTube URL formats
        let videoId = '';
        
        // Handle youtu.be format
        if (url.includes('youtu.be')) {
          videoId = url.split('youtu.be/')[1]?.split('?')[0];
        } 
        // Handle youtube.com format
        else if (url.includes('youtube.com')) {
          // Try to get ID from v parameter
          const urlParams = new URLSearchParams(url.split('?')[1]);
          videoId = urlParams.get('v');
          
          // If no v parameter, try to get from /embed/ or /v/ format
          if (!videoId) {
            const matches = url.match(/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)([^&?/]+)/);
            videoId = matches?.[1];
          }
        }

        // Return embed URL if we found a video ID
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      } catch (error) {
        console.error('Error parsing YouTube URL:', error);
      }
      
      // Return original URL if parsing fails
      return url;
    }
    return url;
  };

  return (
    <Dialog 
      open={true} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontFamily: roboto.style, fontWeight: 500 }}>
            {content.contentFileName || "Content Preview"}
          </Typography>
          <IconButton onClick={onClose}>
            <IoClose />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        {(content.contentType === CONTENT_TYPE.YOUTUBE_VIDEO_LINK || 
          content.contentType === CONTENT_TYPE.NATIVE_VIDEO_LINK) && (
          <Box sx={{ position: 'relative', paddingTop: '56.25%', width: '100%' }}>
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              src={getEmbedUrl(content.contentLink)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video Content"
            />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

const ViewRoadmap = () => {
  const router = useRouter();
  const { roadmapId } = router.query;

  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState(null);

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
    {
      label: "Metadata Type",
      value: roadmapData?.metadataTags?.map((data) => data.type),
    },
  ];

  const handleContentClick = (content) => {
    setSelectedContent(content);
  };

  // console.log("roadmapData", roadmapData);

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
                        label: "Content Type",
                        value: data.content?.contentType,
                      },
                      {
                        label: "Content",
                        value: data.content?.contentFileName || data.content?.contentLink,
                        url: data.content?.contentLink,
                        type: data.content?.contentType,
                        content: data.content,
                      },
                      {
                        label: "Time Required",
                        value: data.time,
                      },
                      {
                        label: "Coins Allocated",
                        value: data.points,
                      },
                      {
                        label: "Description",
                        value: data.description,
                      },
                    ];

                    return (
                      <Stack
                        key={index}
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
                              {val.content ? (
                                <Typography
                                  sx={{
                                    fontSize: 14,
                                    fontFamily: roboto.style,
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                    color: COLORS.DARKBLUE,
                                  }}
                                  onClick={() => handleContentClick(val.content)}
                                >
                                  {val.value || "View Content"}
                                </Typography>
                              ) : (
                                <Typography
                                  sx={{
                                    fontSize: 14,
                                    fontFamily: roboto.style,
                                  }}
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
            {selectedContent && (
              <ContentViewer
                content={selectedContent}
                onClose={() => setSelectedContent(null)}
              />
            )}
          </Card>
        )}
      </Wrapper>
    </div>
  );
};

export default withAuth(ViewRoadmap);
