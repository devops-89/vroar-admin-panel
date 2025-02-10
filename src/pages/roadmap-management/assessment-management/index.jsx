import { data } from "@/assests/data";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import CustomTable from "@/components/customTable";
import Wrapper from "@/components/wrapper";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

const Assessment = () => {
  const router = useRouter();

  const handleAddAssessment = () => {
    router.push("/roadmap-management/assessment-management/create-assessment");
  };
  return (
    <div>
      <Wrapper>
        <Card>
          <Box sx={{ p: 2 }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <PageBreadCrumbs
                data={[
                  {
                    label: "Roadmap Management",
                    url: "/roadmap-management",
                  },
                  {
                    label: "Assessment Management",
                    url: "/roadmap-management/assessment-management",
                  },
                ]}
              />
              <Button
                sx={{
                  fontSize: 14,
                  fontFamily: roboto.style,
                  color: COLORS.WHITE,
                  backgroundColor: COLORS.PRIMARY,
                  textTransform: "initial",
                }}
                onClick={handleAddAssessment}
              >
                Add Assessment
              </Button>
            </Stack>
          </Box>
          <Divider />
          <Box sx={{ mt: 2, p: 2 }}>
            <CustomTable />
          </Box>
          <Box sx={{ p: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
                <TableRow>
                  {data.assessmentHeader.map((val, i) => (
                    <TableCell>
                      <Typography sx={{ fontFamily: roboto.style }}>
                        {val.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
            </Table>
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default Assessment;
