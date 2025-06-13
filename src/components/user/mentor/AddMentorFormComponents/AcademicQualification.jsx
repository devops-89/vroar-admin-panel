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

const AcademicQualification = ({
  academicQualification,
  setAcademicQualification,
  formik,
}) => {
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
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="Field Of Study"
                sx={{ ...loginTextField }}
                fullWidth
                value={item.field || ""}
                onChange={(e) => {
                  const updated = [...academicQualification];
                  updated[index] = { ...updated[index], field: e.target.value };
                  setAcademicQualification(updated);
                }}
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
              />
            </Grid2>
          </React.Fragment>
        ))}
      </Grid2>
      <Box sx={{ textAlign: "right" }}>
        <Button
          sx={{ mt: 2, color: COLORS.BLACK }}
          startIcon={<Add />}
          onClick={() =>
            setAcademicQualification([
              ...academicQualification,
              { institution: "", degree: "", field: "", year: "" },
            ])
          }
        >
          Add More
        </Button>
      </Box>
    </Card>
  );
};

export default AcademicQualification;
