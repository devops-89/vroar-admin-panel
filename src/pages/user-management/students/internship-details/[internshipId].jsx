import Wrapper from "@/components/wrapper";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  Chip,
  Divider,
  CircularProgress,
  Paper,
} from "@mui/material";
import { roboto } from "@/utils/fonts";
import { metaDataController } from "@/api/metaDataController";
import moment from "moment";
import {
  Business,
  LocationOn,
  Timer,
  CalendarMonth,
  Work,
  AttachMoney,
  Description,
  ArrowBack,
} from "@mui/icons-material";
import { COLORS } from "@/utils/enum";

const InternshipDetails = () => {
  const router = useRouter();
  const { internshipId } = router.query;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const getInternshipDetails = (id) => {
    setLoading(true);
    metaDataController
      .getInternshipDetails(id)
      .then((res) => {
        setDetails(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (internshipId) {
      getInternshipDetails(internshipId);
    }
  }, [internshipId]);

  if (loading) {
    return (
      <Wrapper>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress size={60} thickness={4} sx={{ color: COLORS.PRIMARY }} />
        </Box>
      </Wrapper>
    );
  }

  if (!details) {
    return (
      <Wrapper>
        <Container maxWidth="lg">
          <Typography variant="h6" fontFamily={roboto.style}>
            No internship details found
          </Typography>
        </Container>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Box
          sx={{
            mb: 3,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "#666",
            "&:hover": { color: COLORS.PRIMARY },
            transition: "color 0.3s ease",
          }}
          onClick={() => router.back()}
        >
          <ArrowBack />
          <Typography fontFamily={roboto.style}>Back to list</Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            background: COLORS.LinearGradient,
            mb: 3,
            p: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: 32,
              fontFamily: roboto.style,
              fontWeight: 600,
              color: "#fff",
              mb: 2,
            }}
          >
            {details.title}
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
              fontFamily: roboto.style,
              color: "rgba(255, 255, 255, 0.9)",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Business /> {details.companyName}
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 2,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontFamily: roboto.style,
                    fontWeight: 600,
                    mb: 3,
                    color: COLORS.PRIMARY,
                  }}
                >
                  Key Details
                </Typography>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <LocationOn sx={{ color: COLORS.PRIMARY, fontSize: 28 }} />
                    <Box>
                      <Typography
                        fontFamily={roboto.style}
                        color="text.secondary"
                        fontSize={14}
                      >
                        Location
                      </Typography>
                      <Typography fontFamily={roboto.style} fontWeight={500}>
                        {details.location || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Timer sx={{ color: COLORS.PRIMARY, fontSize: 28 }} />
                    <Box>
                      <Typography
                        fontFamily={roboto.style}
                        color="text.secondary"
                        fontSize={14}
                      >
                        Duration
                      </Typography>
                      <Typography fontFamily={roboto.style} fontWeight={500}>
                        {details.duration || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Work sx={{ color: COLORS.PRIMARY, fontSize: 28 }} />
                    <Box>
                      <Typography
                        fontFamily={roboto.style}
                        color="text.secondary"
                        fontSize={14}
                      >
                        Work Mode
                      </Typography>
                      <Typography fontFamily={roboto.style} fontWeight={500}>
                        {details.workMode || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <AttachMoney sx={{ color: COLORS.PRIMARY, fontSize: 28 }} />
                    <Box>
                      <Typography
                        fontFamily={roboto.style}
                        color="text.secondary"
                        fontSize={14}
                      >
                        Stipend
                      </Typography>
                      <Typography fontFamily={roboto.style} fontWeight={500}>
                        {details.stipend || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CalendarMonth sx={{ color: COLORS.PRIMARY, fontSize: 28 }} />
                    <Box>
                      <Typography
                        fontFamily={roboto.style}
                        color="text.secondary"
                        fontSize={14}
                      >
                        Posted on
                      </Typography>
                      <Typography fontFamily={roboto.style} fontWeight={500}>
                        {details.createdAt
                          ? moment.unix(details.createdAt).format("DD MMM YYYY")
                          : "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 2,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontFamily: roboto.style,
                    fontWeight: 600,
                    mb: 3,
                    color: COLORS.PRIMARY,
                  }}
                >
                  Skills Required
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                  {details.skills && details.skills.length > 0 ? (
                    details.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        sx={{
                          fontFamily: roboto.style,
                          backgroundColor: "#e3f2fd",
                          color: COLORS.PRIMARY,
                          fontWeight: 500,
                          fontSize: "0.9rem",
                          padding: "20px 10px",
                          "&:hover": {
                            backgroundColor: COLORS.PRIMARY,
                            color: "#fff",
                          },
                          transition: "all 0.3s ease",
                        }}
                      />
                    ))
                  ) : (
                    <Typography
                      fontFamily={roboto.style}
                      color="text.secondary"
                    >
                      No skills specified
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: 2,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontFamily: roboto.style,
                    fontWeight: 600,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: COLORS.PRIMARY,
                  }}
                >
                  <Description /> Description
                </Typography>
                <Typography
                  fontFamily={roboto.style}
                  sx={{
                    whiteSpace: "pre-line",
                    color: "#444",
                    lineHeight: 1.8,
                    fontSize: "1rem",
                  }}
                >
                  {details.description || "No description available"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default InternshipDetails;
