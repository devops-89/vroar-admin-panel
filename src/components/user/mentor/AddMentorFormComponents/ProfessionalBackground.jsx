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
import React, { useState } from "react";

const ProfessionalBackground = ({
  professionalBackground,
  setProfessionalBackground,
  submitted,
}) => {
  const [rowErrors, setRowErrors] = useState([]);

  const isRowComplete = (item) =>
    !item.companyName || (item.companyName && item.designation && item.duration && item.description);

  const getFieldError = (item, idx, field) => {
    if (item.companyName && (submitted || rowErrors[idx]) && !item[field]) {
      if (field === "designation") return "Designation is required";
      if (field === "duration") return "Duration is required";
      if (field === "description") return "Description is required";
    }
    if (rowErrors[idx] && item.companyName && !item[field]) {
      if (field === "designation") return "Designation is required";
      if (field === "duration") return "Duration is required";
      if (field === "description") return "Description is required";
    }
    if (rowErrors[idx] && !item.companyName && (item.designation || item.duration || item.description)) {
      if (field === "companyName") return "Company Name is required";
    }
    return "";
  };

  const addProfessionalBackground = () => {
    const lastIdx = professionalBackground.length - 1;
    const last = professionalBackground[lastIdx];
    if (!isRowComplete(last)) {
      setRowErrors((prev) => {
        const next = [...prev];
        next[lastIdx] = true;
        return next;
      });
      return;
    }
    setProfessionalBackground([
      ...professionalBackground,
      {
        companyName: "",
        designation: "",
        duration: "",
        description: "",
      },
    ]);
    setRowErrors((prev) => [...prev, false]);
  };

  return (
    <Card sx={{ p: 2, mt: 1 }}>
      <Box>
        <Grid2 container spacing={2}>
          {professionalBackground.map((val, i) => (
            <React.Fragment key={i}>
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
                  value={val.companyName || ""}
                  onChange={(e) => {
                    const updated = [...professionalBackground];
                    updated[i] = { ...updated[i], companyName: e.target.value };
                    setProfessionalBackground(updated);
                  }}
                  error={!!getFieldError(val, i, "companyName")}
                  helperText={getFieldError(val, i, "companyName")}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  label="Designation"
                  fullWidth
                  sx={{ ...loginTextField }}
                  value={val.designation || ""}
                  onChange={(e) => {
                    const updated = [...professionalBackground];
                    updated[i] = { ...updated[i], designation: e.target.value };
                    setProfessionalBackground(updated);
                  }}
                  error={!!getFieldError(val, i, "designation")}
                  helperText={getFieldError(val, i, "designation")}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  label="Duration"
                  fullWidth
                  sx={{ ...loginTextField }}
                  value={val.duration || ""}
                  onChange={(e) => {
                    const updated = [...professionalBackground];
                    updated[i] = { ...updated[i], duration: e.target.value };
                    setProfessionalBackground(updated);
                  }}
                  error={!!getFieldError(val, i, "duration")}
                  helperText={getFieldError(val, i, "duration")}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  label="Description"
                  fullWidth
                  sx={{ ...loginTextField }}
                  multiline
                  value={val.description || ""}
                  onChange={(e) => {
                    const updated = [...professionalBackground];
                    updated[i] = { ...updated[i], description: e.target.value };
                    setProfessionalBackground(updated);
                  }}
                  error={!!getFieldError(val, i, "description")}
                  helperText={getFieldError(val, i, "description")}
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
