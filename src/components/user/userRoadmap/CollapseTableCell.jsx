import { roadMapTableHeader } from "@/assests/studentData";
import CustomChip from "@/components/customChip";
import { roboto } from "@/utils/fonts";
import { Remove, VisibilityOutlined } from "@mui/icons-material";
import {
  Button,
  Collapse,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import UserRoadmapProgress from "../user-roadmap-progress";
import { COLORS } from "@/utils/enum";
import { useRouter } from "next/router";

const CollapseTableCell = ({ data }) => {
  const [open, setOpen] = useState(null);
  const handleToggle = (index) => {
    setOpen((prev) => (prev === index ? null : index));
  };
  const router = useRouter();
  const { userId } = router.query;
  const handleRouter = (roadmapId) => {
    router.push(
      `/user-management/students/roadmap-details/${roadmapId}?userId=${userId}`
    );
  };
  return (
    <Table>
      <TableHead>
        <TableRow>
          {roadMapTableHeader.map((val, i) => (
            <TableCell>
              <Typography
                sx={{ fontSize: 15, fontFamily: roboto.style, fontWeight: 550 }}
              >
                {val.label}
              </Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((val, i) => (
          <TableRow key={i}>
            <TableCell>
              <Typography
                sx={{
                  fontSize: 14,
                  fontFamily: roboto.style,
                  textTransform: "capitalize",
                }}
              >
                {val.name}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                {moment.unix(val.assignedDate).format("DD-MM-YYYY")}
              </Typography>
            </TableCell>
            <TableCell>
              <Stack
                direction={"row"}
                alignItems={"center"}
                flexWrap={"wrap"}
                spacing={1}
              >
                {val.metadataTags.slice(0, 2).map((tag, index) => (
                  <CustomChip label={tag.name} variant={tag.type} />
                ))}
                {val.metadataTags.length > 2 && (
                  <Button
                    sx={{ fontFamily: roboto.style, fontSize: 12 }}
                    onClick={() => handleToggle(i)}
                  >
                    {open === i ? (
                      <Remove sx={{ fontSize: 14 }} />
                    ) : (
                      `+${val.metadataTags.length - 2}`
                    )}
                  </Button>
                )}
              </Stack>
              <Collapse
                in={open === i}
                timeout="auto"
                unmountOnExit
                sx={{ mt: 1 }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  flexWrap={"wrap"}
                  spacing={1}
                >
                  {val.metadataTags.slice(2).map((tag, index) => (
                    <CustomChip label={tag.name} variant={tag.type} />
                  ))}
                </Stack>
              </Collapse>
            </TableCell>
            <TableCell>
              <UserRoadmapProgress
                progress={`${Math.round(
                  (val.completedSteps / val.totalSteps) * 100
                )}`}
              />
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleRouter(val.id)}>
                <VisibilityOutlined
                  sx={{ fontSize: 20, color: COLORS.BLACK }}
                />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CollapseTableCell;
