import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const DeletemetaData = ({ value }) => {
  return (
    <div>
      <Box sx={{ width: 300 }}>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: 20,
            fontFamily: roboto.style,
            fontWeight: 550,
          }}
        >
          Delete Metadata
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: 14,
            fontFamily: roboto.style,
            fontWeight: 400,
            mt: 2,
          }}
        >
          Are you sure you want to delete the selected metadata?
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={2} mt={2}>
          <Button
            sx={{
              mt: 2,
              backgroundColor: COLORS.TRANSPARENT,
              color: COLORS.PRIMARY,
              fontFamily: roboto.style,
              border: `1px solid ${COLORS.PRIMARY}`,
            }}
            fullWidth
          >
            Discard
          </Button>
          <Button
            sx={{
              mt: 2,
              backgroundColor: COLORS.PRIMARY,
              color: COLORS.WHITE,
              fontFamily: roboto.style,
            }}
            type="submit"
            fullWidth
          >
            save
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default DeletemetaData;
