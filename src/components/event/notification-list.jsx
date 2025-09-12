import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Box, Button, Stack, Typography } from "@mui/material";
import moment from "moment";
const NotificationList = ({ read, title, body, createdAt, id, onClick }) => {
  const handleReadNotification = (e, id) => {
    console.log("qwerty", id);
  };

  //mark notification  as read api

  return (
    <div>
      <Box sx={{}}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction="row" alignItems="start" spacing={3}>
            <Box>
              {!read && (
                <Box
                  sx={{
                    width: 5,
                    height: 5,
                    borderRadius: 10,
                    backgroundColor: COLORS.PRIMARY,
                    ml: 2,
                    mt: 1,
                  }}
                ></Box>
              )}
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: 15,
                  fontFamily: roboto.style.fontFamily,
                  fontWeight: 600,
                }}
              >
                {title}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography
                  sx={{ fontSize: 15, fontFamily: roboto.style.fontFamily }}
                >
                  {body}
                </Typography>
                <Typography
                  sx={{ fontSize: 14, fontFamily: roboto.style.fontFamily }}
                >
                  {moment.unix(createdAt).fromNow()}
                </Typography>
              </Stack>
            </Box>
          </Stack>
          {/* <FormControlLabel
            control={
              <Checkbox onChange={(e) => handleReadNotification(e, id)} />
            }
          /> */}
          {!read && (
            <Button
              sx={{
                fontSize: 12,
                fontFamily: roboto.style.fontFamily,
                color: COLORS.PRIMARY,
              }}
              onClick={onClick}
            >
              Mark as read
            </Button>
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default NotificationList;
