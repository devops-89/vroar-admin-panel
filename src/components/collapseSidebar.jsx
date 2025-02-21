import { COLORS } from "@/utils/enum";
import {
  Box,
  Card,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  Popover,
  Popper,
} from "@mui/material";
import React, { useState } from "react";
import lionFace from "@/logo/logo.png";
import Image from "next/image";
import { SIDEBARADATA } from "@/assests/sidebarData";
import { useRouter } from "next/router";
const CollapseSidebar = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleRouter = (e, value) => {
    if (value?.modules) {
      setAnchorEl(e.currentTarget);
    } else {
      router.push(value.url);
    }

    console.log("value", value);
  };
  return (
    <Box>
      <Card
        sx={{
          width: 50,
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          overflowY: "auto",
          zIndex: 999,
          transition: "width 0.5s ease all",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            // p: 1,
            position: "fixed",
            width: 50,
            zIndex: 999,
            backgroundColor: COLORS.WHITE,
            pt: 1,
          }}
        >
          <Image
            src={lionFace}
            width={40}
            style={{
              transition: "opacity 0.5s ease-in-out",
            }}
          />

          <Divider sx={{ mt: 1 }} />
        </Box>
        <Box sx={{ height: "90%", overflowY: "auto", pt: 8 }}>
          <List>
            {SIDEBARADATA.map((val, i) => (
              <ListItemButton onClick={(e) => handleRouter(e, val)} key={i}>
                <ListItemAvatar sx={{ minWidth: 30 }}>
                  {val.avatar}
                </ListItemAvatar>
              </ListItemButton>
            ))}
          </List>

          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
          >
            hello
          </Popover>
        </Box>
      </Card>
    </Box>
  );
};

export default CollapseSidebar;
