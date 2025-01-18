import React, { useState } from "react";
import {
  Card,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography,
  Collapse,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  HomeOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import logo from "@/logo/logo.svg";
import { roboto } from "@/utils/fonts";
import { SIDEBARADATA } from "@/assests/sidebarData";
import { useRouter } from "next/router";
import { COLORS } from "@/utils/enum";

const Sidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const router = useRouter();

  const changePath = (path) => {
    router.push(path);
  };

  return (
    <div>
      <Card
        sx={{
          width: 250,
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          overflowY: "auto",
          zIndex: 999,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            p: 1,
            position: "fixed",
            width: 235,
            zIndex: 9999,
            backgroundColor: COLORS.WHITE,
          }}
        >
          <Image src={logo} alt="" width={100} height={40} />
          <Divider sx={{ mt: 1 }} />
        </Box>
        <Box sx={{ height: "90%", overflowY: "auto", pt: 8 }}>
          <List>
            {SIDEBARADATA.map((val, index) => (
              <div key={index}>
                {val.modules ? (
                  <>
                    <ListItemButton onClick={() => handleToggle(index)}>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={0.5}
                      >
                        <ListItemAvatar sx={{ minWidth: 30 }}>
                          {val.avatar}
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              sx={{ fontFamily: roboto.style, fontSize: 13 }}
                            >
                              {val.label}
                            </Typography>
                          }
                        />
                        {openIndex === index ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                      </Stack>
                    </ListItemButton>
                    <Collapse in={openIndex === index}>
                      {val.subModules.map((subVal, subIndex) => (
                        <ListItemButton
                          key={subIndex}
                          sx={{
                            pl: 4,
                            backgroundColor:
                              router.pathname === subVal.url
                                ? COLORS.SECNDARY
                                : "transparent",
                            ":hover": {
                              backgroundColor: COLORS.SECNDARY,
                            },
                          }}
                          onClick={() => changePath(subVal.url)}
                        >
                          <ListItemAvatar sx={{ minWidth: 40 }}>
                            {subVal.avatar}
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography
                                sx={{
                                  fontFamily: roboto.style,
                                  fontSize: 13,
                                  fontWeight: 500,
                                }}
                              >
                                {subVal.label}
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      ))}
                    </Collapse>
                  </>
                ) : (
                  <ListItemButton
                    onClick={() => changePath(val.url)}
                    sx={{
                      backgroundColor:
                        router.pathname === val.url
                          ? COLORS.SECNDARY
                          : "transparent",
                      ":hover": {
                        backgroundColor: COLORS.SECNDARY,
                      },
                    }}
                  >
                    <ListItemAvatar sx={{ minWidth: 40 }}>
                      {val.avatar}
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{ fontFamily: roboto.style, fontSize: 14 }}
                        >
                          {val.label}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                )}
              </div>
            ))}
          </List>
        </Box>
      </Card>
    </div>
  );
};

export default Sidebar;
