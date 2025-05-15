import { PointsHeader } from "@/assests/studentData";
import coins from "@/icons/coins.png";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import {
  Box,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import Image from "next/image";
import { useEffect } from "react";
import Loading from "react-loading";
import { useSelector } from "react-redux";
const Points = ({ getUserRewardPoint, rewardData, loading }) => {
  const userId = useSelector((state) => state.USER.id);

  useEffect(() => {
    if (userId) {
      getUserRewardPoint(userId);
    }
  }, [userId]);

  return (
    <div>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={1}
        px={2}
        sx={{ borderRadius: 2, border: "1px solid #d7d7d7" }}
      >
        <Typography
          sx={{ fontSize: 20, fontWeight: 550, fontFamily: roboto.style }}
        >
          Total Coins Earned
        </Typography>
        {loading ? (
          <Skeleton />
        ) : (
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Image src={coins} />
            <Typography
              sx={{
                color: COLORS.PRIMARY,
                fontSize: 45,
                fontFamily: roboto.style,
                fontWeight: 600,
              }}
            >
              {rewardData?.totalCoinEarn}{" "}
              <Typography
                component={"span"}
                sx={{
                  color: COLORS.BLACK,
                  fontSize: 18,
                  fontFamily: roboto.style,
                }}
              >
                Coins
              </Typography>
            </Typography>
          </Stack>
        )}
      </Stack>
      <Box sx={{ mt: 2 }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
              <TableRow>
                {PointsHeader.map((val, i) => (
                  <TableCell key={i}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: roboto.style,
                        fontWeight: 600,
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
                {rewardData?.docs.map((val, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Typography
                        sx={{ fontSize: 14, fontFamily: roboto.style }}
                      >
                        {moment.unix(val.createdAt).format("DD-MM-YYYY")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{ fontSize: 14, fontFamily: roboto.style }}
                      >
                        {val.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{ fontSize: 14, fontFamily: roboto.style }}
                      >
                        {val.earnedFrom}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={1}
                      >
                        <Image src={coins} width={20} alt="" />
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontFamily: roboto.style,
                            color: COLORS.PRIMARY,
                          }}
                        >
                          {val.rewardValue}
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default Points;
