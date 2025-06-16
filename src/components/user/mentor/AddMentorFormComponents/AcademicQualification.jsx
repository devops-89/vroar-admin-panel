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

const AcademicQualification = ({
  academicQualification,
  setAcademicQualification,
  formik,
  submitted,
}) => {
  // Add local state to track errors for each row
  const [rowErrors, setRowErrors] = useState([]);

  // Helper to check if a row is complete
  const isRowComplete = (item) =>
    item.institution && item.degree && item.field && item.year;

  // Helper to get error for a field in a row
  const getFieldError = (item, idx, field) => {
   
    if ((submitted || rowErrors[idx]) && item.institution && !item[field]) {
      if (field === "degree") return "Degree is required";
      if (field === "fieldOfStudy") return "Field of Study is required";
      if (field === "year") return "Year is required";
    }
    
    if (rowErrors[idx] && !item[field]) {
      if (field === "institution") return "Institution is required";
      if (field === "degree") return "Degree is required";
      if (field === "fieldOfStudy") return "Field of Study is required";
      if (field === "year") return "Year is required";
    }
    return "";
  };

  return (
    <Card sx={{ p: 2 }}>
      <Grid2 container sx={{ mt: 2 }} spacing={2}>
        {academicQualification.map((item, index) => (
          <React.Fragment key={index}>
            <Grid2 size={12}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    fontFamily: roboto.style,
                    fontWeight: 600,
                  }}
                >
                  Academic Qualification {index + 1}
                </Typography>
                {academicQualification.length > 1 && (
                  <IconButton
                    onClick={() =>
                      setAcademicQualification(
                        academicQualification.filter((_, i) => i !== index)
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
                label="Institution Name"
                sx={{ ...loginTextField }}
                fullWidth
                value={item.institution || ""}
                onChange={(e) => {
                  const updated = [...academicQualification];
                  updated[index] = {
                    ...updated[index],
                    institution: e.target.value,
                  };
                  setAcademicQualification(updated);
                }}
                error={!!getFieldError(item, index, "institution")}
                helperText={getFieldError(item, index, "institution")}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="Degree"
                sx={{ ...loginTextField }}
                fullWidth
                value={item.degree || ""}
                onChange={(e) => {
                  const updated = [...academicQualification];
                  updated[index] = {
                    ...updated[index],
                    degree: e.target.value,
                  };
                  setAcademicQualification(updated);
                }}
                error={!!getFieldError(item, index, "degree")}
                helperText={getFieldError(item, index, "degree")}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="Field Of Study"
                sx={{ ...loginTextField }}
                fullWidth
                value={item.fieldOfStudy || ""}
                onChange={(e) => {
                  const updated = [...academicQualification];
                  updated[index] = { ...updated[index], fieldOfStudy: e.target.value };
                  setAcademicQualification(updated);
                }}
                error={!!getFieldError(item, index, "fieldOfStudy")}
                helperText={getFieldError(item, index, "fieldOfStudy")}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="Year"
                sx={{ ...loginTextField }}
                fullWidth
                value={item.year || ""}
                onChange={(e) => {
                  const updated = [...academicQualification];
                  updated[index] = { ...updated[index], year: e.target.value };
                  setAcademicQualification(updated);
                }}
                error={!!getFieldError(item, index, "year")}
                helperText={getFieldError(item, index, "year")}
              />
            </Grid2>
          </React.Fragment>
        ))}
      </Grid2>
      <Box sx={{ textAlign: "right" }}>
        <Button
          sx={{ mt: 2, color: COLORS.BLACK }}
          startIcon={<Add />}
          onClick={() => {
            const lastIdx = academicQualification.length - 1;
            const last = academicQualification[lastIdx];
            if (!isRowComplete(last)) {
              // Mark this row as having errors
              setRowErrors((prev) => {
                const next = [...prev];
                next[lastIdx] = true;
                return next;
              });
              return;
            }
            // Add new row and clear rowErrors for new row
            setAcademicQualification([
              ...academicQualification,
              { institution: "", degree: "", field: "", year: "" },
            ]);
            setRowErrors((prev) => [...prev, false]);
          }}
        >
          Add More
        </Button>
      </Box>
    </Card>
  );
};

export default AcademicQualification;
