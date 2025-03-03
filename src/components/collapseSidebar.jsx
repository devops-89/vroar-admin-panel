import { COLORS } from "@/utils/enum";
import {
  Box,
  Card,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Popover,
  Popper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import lionFace from "@/logo/logo.png";
import Image from "next/image";
import { SIDEBARADATA } from "@/assests/sidebarData";
import { useRouter } from "next/router";
import { roboto } from "@/utils/fonts";
const CollapseSidebar = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarModulesData, setSideBarModulesData] = useState([]);
  const handleRouter = (e, value) => {
    if (value?.modules) {
      setAnchorEl(e.currentTarget);
      console.log("values", value);
      setSideBarModulesData(value.subModules);
    } else {
      router.push(value.url);
      setAnchorEl(null);
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
          transition: " 0.5s ease all",
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
              vertical: "top",
            }}
            onClose={() => setAnchorEl(null)}
            sx={{
              boxShadow: "none",
              "& .MuiPopover-paper": {
                boxShadow: "0px 0px 4px 4px #d7d7d7",
              },
            }}
          >
            <List>
              {sidebarModulesData.map((val, i) => (
                <ListItemButton
                  onClick={(e) => handleRouter(e, val)}
                  key={i}
                  sx={{
                    backgroundColor:
                      router.pathname === val.url ? COLORS.secondary : "#fff",
                    ":hover": {
                      backgroundColor: COLORS.secondary,
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{ fontSize: 14, fontFamily: roboto.style }}
                      >
                        {val.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Popover>
        </Box>
      </Card>
    </Box>
  );
};

export default CollapseSidebar;
