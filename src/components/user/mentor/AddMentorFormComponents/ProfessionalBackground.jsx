import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Grid2,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const ProfessionalBackground = ({
  professionalBackground,
  setProfessionalBackground,
}) => {
  const addProfessionalBackground = () => {
    setProfessionalBackground([
      ...professionalBackground,
      {
        companyName: "",
        designation: "",
        duration: "",
        description: "",
      },
    ]);
  };
  return (
    <Card sx={{ p: 2, mt: 1 }}>
      <Box>
        <Grid2 container spacing={2}>
          {professionalBackground.map((val, i) => (
            <React.Fragment>
              <Grid2 size={12}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: roboto.style,
                    }}
                  >
                    Professional Background {i + 1}
                  </Typography>
                  {professionalBackground.length > 1 && (
                    <IconButton
                      onClick={() =>
                        setProfessionalBackground(
                          professionalBackground.filter((_, index) => i !== index)
                        )
                      }
                    >
                      <Delete />
                    </IconButton>
                  )}
                </Stack>
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  label="Company Name"
                  fullWidth
                  sx={{ ...loginTextField }}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  label="Designation"
                  fullWidth
                  sx={{ ...loginTextField }}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  label="Duration"
                  fullWidth
                  sx={{ ...loginTextField }}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  label="Description"
                  fullWidth
                  sx={{ ...loginTextField }}
                  multiline
                />
              </Grid2>
            </React.Fragment>
          ))}
        </Grid2>
        <Box sx={{ textAlign: "right" }}>
          <Button
            startIcon={<Add />}
            sx={{
              fontSize: 14,
              fontWeight: 550,
              fontFamily: roboto.style,
              color: COLORS.BLACK,
            }}
            onClick={addProfessionalBackground}
          >
            Add More
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default ProfessionalBackground;
