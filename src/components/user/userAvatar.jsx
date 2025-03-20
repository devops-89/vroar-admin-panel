import { roboto } from "@/utils/fonts";
import { Avatar, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const UserAvatar = (props) => {
  const { avatar, firstName, lastName, name } = props;
  return (
    <div>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Avatar>
          <Image
            src={avatar}
            alt={"user avatar"}
            width={40}
            height={40}
            style={{ objectFit: "cover" }}
          />
        </Avatar>
        <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
          {name ? name : `${firstName} ${lastName}`}
        </Typography>
      </Stack>
    </div>
  );
};

export default UserAvatar;
