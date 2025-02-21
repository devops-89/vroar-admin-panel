import { SIDEBARADATA } from "@/assests/sidebarData";
import logo from "@/logo/logo.svg";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Card,
  Collapse,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import lionFace from "@/logo/logo.png";
const Sidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const sidebarCollapse = useSelector(
    (state) => state.sideBarCollapse.isSidebarCollapse
  );

  // console.log("first", sidebarCollapse);

  const router = useRouter();

  const changePath = (path) => {
    router.push(path);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Card
        sx={{
          width: sidebarCollapse ? 50 : 200,
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
            width: sidebarCollapse ? 50 : 200,
            zIndex: 999,
            backgroundColor: COLORS.WHITE,
            pt: 1,
          }}
        >
          {sidebarCollapse ? (
            <Image
              src={lionFace}
              width={40}
              style={{
                opacity: sidebarCollapse ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
            />
          ) : (
            <Image
              src={logo}
              alt=""
              width={100}
              height={40}
              style={{ opacity: sidebarCollapse ? 0 : 1 }}
            />
          )}
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
                              sx={{ fontFamily: roboto.style, fontSize: 12 }}
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
                          <ListItemAvatar sx={{ minWidth: 30 }}>
                            {subVal.avatar}
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography
                                sx={{
                                  fontFamily: roboto.style,
                                  fontSize: 12,
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
                          sx={{ fontFamily: roboto.style, fontSize: 12 }}
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
    </Box>
  );
};

export default Sidebar;
