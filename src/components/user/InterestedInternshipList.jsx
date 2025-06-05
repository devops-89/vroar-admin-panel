import { internshipController } from "@/api/internship";
import { metaDataController } from "@/api/metaDataController";
import { roboto } from "@/utils/fonts";
import moment from "moment";
import {
  CircularProgress,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  IconButton,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { data } from "@/assests/data";
import { Visibility } from "@mui/icons-material";
import Loading from "react-loading";
import { useRouter } from "next/router";

const InterestedInternshipList = () => {
  const user = useSelector((state) => state.USER);
  const [loading, setLoading] = useState(true);
  // console.log(user)
  const [interestedApplication, setInterestedApplication] = useState([]);
  const getInterestedApplication = () => {
    if (user) {
      setLoading(true);
      metaDataController
        .getInterestedApplication(user.id)
        .then((res) => {
          setInterestedApplication(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    getInterestedApplication();
  }, []);
  const router = useRouter();
  const handleViewInternship = (internshipId) => {
    router.push(`/user-management/students/internship-details/${internshipId}`);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Loading type="bars" color="#000" width={20} height={20} />
      </Box>
    );
  }

  if (interestedApplication.length === 0) {
    return (
      <Typography
        className="text-center"
        fontFamily={roboto.style}
        fontWeight={500}
        color="#000"
      >
        No interested internship
      </Typography>
    );
  }

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {data.internshipApplicationHeader.map((item, index) => (
                <TableCell key={index}>
                  <Typography
                    fontFamily={roboto.style}
                    fontWeight={500}
                    color="#000"
                    fontSize={16}
                  >
                    {item.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {interestedApplication.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography
                    fontFamily={roboto.style}
                    color="#000"
                    fontSize={14}
                  >
                    {item.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    fontFamily={roboto.style}
                    color="#000"
                    fontSize={14}
                  >
                    {item.companyName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    fontFamily={roboto.style}
                    color="#000"
                    fontSize={14}
                  >
                    {item.createdAt
                      ? moment.unix(item.createdAt).format("DD-MM-YYYY")
                      : "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    fontFamily={roboto.style}
                    color="#000"
                    fontSize={14}
                  >
                    {item.duration ?? "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleViewInternship(item.id)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InterestedInternshipList;
