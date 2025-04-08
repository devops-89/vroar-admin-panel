import userController from "@/api/user";
import { data } from "@/assests/data";
import CustomChip from "@/components/customChip";
import Wrapper from "@/components/wrapper";
import { COLORS, USER_ROADMAP_REVIEW_STATUS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "react-loading";

const UserRoadmapDetails = () => {
  const router = useRouter();
  const { roadmapId, userId } = router.query;
  const [userAssignedRoadmap, setUserAssignedRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const body = {
    roadmapId: roadmapId,
    userId: userId,
  };
  const getUserRoadmapDetails = () => {
    userController
      .getUserRoadmapDetails(body)
      .then((res) => {
        // console.log("res", res);
        const response = res.data.data;
        setUserAssignedRoadmap(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const tableHeaderData = [
    {
      label: "Tile Number",
    },
    {
      label: "Tile Name",
    },
    {
      label: "Status",
    },
    {
      label: "Completion Date",
    },
    {
      label: "Review Status",
    },
  ];
  // console.log("uer", userAssignedRoadmap);

  useEffect(() => {
    if (roadmapId && userId) {
      getUserRoadmapDetails();
    }
  }, [roadmapId, userId]);

  return (
    <div>
      <Wrapper>
        <Card sx={{ p: 1 }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
                <TableRow>
                  {tableHeaderData.map((val, i) => (
                    <TableCell key={i}>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontFamily: roboto.style,
                          fontWeight: 550,
                        }}
                      >
                        {val.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {loading ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={12}>
                      <Loading
                        type="bars"
                        width={20}
                        height={20}
                        color={COLORS.BLACK}
                        className="m-auto"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {userAssignedRoadmap?.roadmapSteps.map((val, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Typography
                          sx={{ fontFamily: roboto.style, fontSize: 15 }}
                        >
                          {val.sequenceNo}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontFamily: roboto.style, fontSize: 15 }}
                        >
                          {val.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {/* <Typography
                        sx={{ fontFamily: roboto.style, fontSize: 15 }}
                      >
                        {val.status}
                      </Typography> */}
                        <CustomChip label={val.status} variant={val.status} />
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontFamily: roboto.style, fontSize: 15 }}
                        >
                          {val.completionDate
                            ? moment
                                .unix(val.completionDate)
                                .format("DD-MMM-YYYY")
                            : "--"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {val.review_status ? (
                          <Button
                            sx={{
                              fontFamily: roboto.style,
                              fontSize: 13,
                              cursor: "pointer",
                              color:
                                val.review_status ===
                                USER_ROADMAP_REVIEW_STATUS.FEEDBACK_PROVIDED
                                  ? COLORS.DONE_TEXT
                                  : COLORS.SIGNED_UP_TEXT,
                              p: 0,
                            }}
                          >
                            {val.review_status}
                          </Button>
                        ) : (
                          <Typography
                            sx={{ fontFamily: roboto.style, fontSize: 15 }}
                          >
                            --
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Card>
      </Wrapper>
    </div>
  );
};

export default UserRoadmapDetails;
