import { metaDataController } from "@/api/metaDataController";
import { CONTENT_DATA } from "@/assests/roadmapData";
import { COLORS, CONTENT_TYPE, METADATA_TYPE } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import YouTube from 'react-youtube';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

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

  console.log("details", details);

  useEffect(() => {
    if (router.query.slug) {
      getContentFullDetails();
    }
  }, [router.query.slug]);

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
    {
      label: "Description",
      value: details?.description,
    },
  ];

  return (
    <div>
      {loading ? (
        <Backdrop open={loading}>
          <CircularProgress sx={{ color: COLORS.WHITE }} />
        </Backdrop>
      ) : (
        <>
          <Stack spacing={3} alignItems={"flex-start"}>
            {viewData.map((val, i) => (
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={Array.isArray(val.value) ? 10 : 10}
                key={i}
              >
                <Typography sx={{ fontFamily: roboto.style, width: 45 }}>
                  {val.label}
                </Typography>

                {Array.isArray(val.value) ? (
                  <Stack
                    direction={"row"}
                    spacing={3}
                    flexWrap={"wrap"}
                    rowGap={1}
                  >
                    {val.value.map((item, index) => (
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
                        }}
                        key={index}
                      />
                    ))}
                  </Stack>
                ) : (
                  <Typography sx={{ fontFamily: roboto.style, fontSize: 14 }}>
                    {val.value}
                  </Typography>
                )}
              </Stack>
            ))}
          </Stack>
          {details?.quiz && (
            <Stack
              alignItems={"flex-start"}
              spacing={3}
              sx={{ mt: 2, width: "100%" }}
            >
              <Typography sx={{ fontFamily: roboto.style, width: 45 }}>
                Quiz
              </Typography>
              {details?.quiz?.quizQuestions?.map((val, i) => (
                <Accordion sx={{ mt: 2, width: "100%" }}>
                  <AccordionSummary>
                    <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                      {i + 1}. {val.questionText}
                    </Typography>
                  </AccordionSummary>
                  {val.subText ? (
                    <AccordionDetails>
                      <Typography>{val.subText}</Typography>
                    </AccordionDetails>
                  ) : (
                    <AccordionDetails>
                      {val.options.map((item, i) => (
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={2}
                        >
                          <Checkbox checked={item.isCorrect} />
                          <Typography>{item.optionText}</Typography>
                        </Stack>
                      ))}
                    </AccordionDetails>
                  )}
                </Accordion>
              ))}
            </Stack>
          )}
          <ContentLink contentLink={details?.contentLink} contentType={details?.contentType} />
        </>
      )}
    </div>
  );
};

const ContentLink = ({ contentLink, contentType }) => {
  const getContentType = (url) => {
    if (url?.includes('youtube.com') || url?.includes('youtu.be')) {
      return 'youtube';
    } else if (url?.toLowerCase().endsWith('.pdf')) {
      return 'pdf';
    } else if (url?.toLowerCase().match(/\.(mp4|mov|avi|wmv)$/)) {
      return 'video';
    }
    return 'unknown';
  };

  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const renderContent = () => {
    const type = getContentType(contentLink);

    switch (type) {
      case 'youtube':
        const videoId = getYouTubeVideoId(contentLink);
        return (
          <Box 
            sx={{ 
              width: '100%', 
              maxWidth: '800px', 
              margin: '0 auto',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              '& iframe': {
                borderRadius: '12px'
              }
            }}
          >
            <YouTube
              videoId={videoId}
              opts={{
                width: '100%',
                height: '450px',
                playerVars: {
                  autoplay: 0,
                },
              }}
            />
          </Box>
        );

      case 'pdf':
        return (
          <Box 
            sx={{ 
              width: '100%', 
              maxWidth: '800px',
              margin: '0 auto',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              backgroundColor: '#f5f5f5',
              p: 3,
              textAlign: 'center'
            }}
          >
            <Typography 
              sx={{ 
                mb: 3,
                fontSize: 16,
                fontFamily: roboto.style,
                color: COLORS.PRIMARY
              }}
            >
              PDF Document
            </Typography>
            <Button
              href={contentLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M19 9H15V3H9V9H5L12 16L19 9ZM5 18V20H19V18H5Z" 
                    fill="currentColor"
                  />
                </svg>
              }
              sx={{
                backgroundColor: COLORS.PRIMARY,
                color: COLORS.WHITE,
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:hover': {
                  backgroundColor: COLORS.PRIMARY_DARK,
                  boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                },
                fontFamily: roboto.style,
              }}
            >
              Open PDF
            </Button>
          </Box>
        );

      case 'video':
        return (
          <Box 
            sx={{ 
              width: '100%', 
              maxWidth: '800px', 
              margin: '0 auto',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              backgroundColor: '#000'
            }}
          >
            <video
              controls
              width="100%"
              style={{ 
                maxHeight: '450px',
                borderRadius: '12px'
              }}
            >
              <source src={contentLink} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        );

      default:
        return (
          <Box 
            sx={{ 
              display: 'flex',
              justifyContent: 'center',
              mt: 2
            }}
          >
            <Button
              href={contentLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              sx={{
                backgroundColor: COLORS.PRIMARY,
                color: COLORS.WHITE,
                padding: '10px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:hover': {
                  backgroundColor: COLORS.PRIMARY_DARK,
                  boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                },
                fontFamily: roboto.style,
              }}
            >
              Open Link
            </Button>
          </Box>
        );
    }
  };

  return (
    <Box 
      sx={{ 
        mt: 4,
        p: 3,
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}
    >
      <Typography
        sx={{
          fontSize: 18,
          fontFamily: roboto.style,
          fontWeight: 600,
          mb: 2,
          color: COLORS.PRIMARY
        }}
      >
        Content Preview
      </Typography>
      {renderContent()}
    </Box>
  );
};

export default ContentDetails;
