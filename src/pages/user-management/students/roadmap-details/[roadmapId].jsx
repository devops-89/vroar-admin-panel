import { data } from "@/assests/data";
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

const UserRoadmapDetails = () => {
  const router = useRouter();
  const tableHeaderData = [
    {
      label: "Tile Number",
    },
    {
      label: "Tile Name",
    },
    {
      label: "Completion Date",
    },
    {
      label: "Review Status",
    },
  ];
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
              <TableBody>
                {data.userRoadmapData.map((val, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Typography
                        sx={{ fontFamily: roboto.style, fontSize: 15 }}
                      >
                        {val.tileNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{ fontFamily: roboto.style, fontSize: 15 }}
                      >
                        {val.tileName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{ fontFamily: roboto.style, fontSize: 15 }}
                      >
                        {moment.unix(val.completionDate).format("DD-MMM-YYYY")}
                      </Typography>
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Wrapper>
    </div>
  );
};

export default UserRoadmapDetails;
