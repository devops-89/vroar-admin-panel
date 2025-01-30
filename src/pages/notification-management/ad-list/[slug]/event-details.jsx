import Wrapper from "@/components/wrapper";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Button, Stack, Typography } from "@mui/material";
import { FaRegEdit } from "react-icons/fa";

const EventDetails = () => {
  const newData = [
    {
      label: "Event Name",
      value: "Creative Writing Workshop",
    },
    {
      label: "Speaker Name",
      value: "Emily Johnson",
    },
    {
      label: "Event Description",
      value:
        "A workshop to inspire young writers and enhance their creative writing skills.",
    },

    {
      label: "Speaker Summary",
      value:
        "Emily Johnson is an award-winning author and educator with a passion for nurturing young talent.",
    },
    {
      label: "Session Details",
      value:
        "Includes writing exercises, group discussions, and personalized feedback.	",
    },
    {
      label: "Session Dates",
      value: "7th December 2024 - 20th December 2024",
    },
    {
      label: "Session Timings",
      value: "1:00 PM - 3:00 PM",
    },
    {
      label: "Zoom Link",
      value: "https://zoom.us/j/1234567890",
    },
  ];
  return (
    <div>
      <Wrapper>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography
            sx={{ fontSize: 20, fontFamily: roboto.style, fontWeight: 550 }}
          >
            Event Details
          </Typography>
          <Button
            endIcon={<FaRegEdit />}
            sx={{
              fontSize: 14,
              color: COLORS.PRIMARY,
              border: `1px solid ${COLORS.PRIMARY}`,
            }}
          >
            Edit
          </Button>
        </Stack>
        <Stack spacing={2} sx={{ mt: 3 }}>
          {newData.map((val, i) => (
            <Stack direction={"row"} alignItems={"center"} spacing={10} key={i}>
              <Typography
                sx={{ fontSize: 15, fontFamily: roboto.style, width: 140 }}
              >
                {" "}
                {val.label}
              </Typography>

              <Typography
                sx={{
                  fontSize: 14,
                  fontFamily: roboto.style,
                  fontWeight: 0,
                }}
              >
                {" "}
                {val.value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Wrapper>
    </div>
  );
};

export default EventDetails;
