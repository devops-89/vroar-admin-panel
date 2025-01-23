import { data } from "@/assests/data";
import {
  CAREERDATA,
  INDUSTRYDATA,
  SOFTSKILLSDATA,
  STRENGTHDATA,
} from "@/assests/roadmapData";
import { studentTableData } from "@/assests/studentData";
import { COLORS, ROADMAP_TENURE } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Createroadmap = () => {
  const [student, setStudent] = useState([]);
  const [career, setCareer] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [numberOfLevels, setNumberOfLevels] = useState([]);

  const studentSelectHandler = (e, newValue) => {
    setStudent(newValue);
  };

  const careerSelectHandler = (e, newValue) => {
    setCareer(newValue);
  };

  const industrySelectHandler = (e, newValue) => {
    setIndustry(newValue);
  };
  const softSkillsHandler = (e, newValue) => {
    setSoftSkills(newValue);
  };

  const strengthHandler = (e, newValue) => {
    setStrengths(newValue);
  };

  return (
    <div>
      <Stack alignItems={"end"} spacing={2}>
        <TextField
          label="Enter Roadmap Name"
          sx={{ ...loginTextField }}
          fullWidth
        />
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select  Student"
              sx={{ ...loginTextField }}
            />
          )}
          fullWidth
          options={studentTableData}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          renderOption={(props, option) => (
            <Box {...props}>
              <Typography sx={{ fontFamily: roboto.style, fontSize: 14 }}>
                {option.firstName} {option.lastName}
              </Typography>
            </Box>
          )}
          multiple
          filterSelectedOptions
          value={student}
          onChange={studentSelectHandler}
        />
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select  Career Tags"
              sx={{ ...loginTextField }}
            />
          )}
          fullWidth
          options={CAREERDATA}
          getOptionLabel={(option) => `${option.name} `}
          renderOption={(props, option) => (
            <Box {...props}>
              <Typography sx={{ fontFamily: roboto.style, fontSize: 14 }}>
                {option.name}
              </Typography>
            </Box>
          )}
          multiple
          filterSelectedOptions
          value={career}
          onChange={careerSelectHandler}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Chip
                  label={option.name}
                  key={key}
                  {...tagProps}
                  sx={{
                    "& ": {
                      backgroundColor: COLORS.PENDING,
                      color: COLORS.PENDING_TEXT,
                    },
                    "& svg": {
                      color: `${COLORS.PENDING_TEXT} !important`,
                      fontSize: "20px !important",
                    },
                  }}
                  deleteIcon={<Close />}
                />
              );
            })
          }
        />
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select  Industry Tags"
              sx={{ ...loginTextField }}
            />
          )}
          fullWidth
          options={INDUSTRYDATA}
          getOptionLabel={(option) => `${option.name} `}
          renderOption={(props, option) => (
            <Box {...props}>
              <Typography sx={{ fontFamily: roboto.style, fontSize: 14 }}>
                {option.name}
              </Typography>
            </Box>
          )}
          multiple
          filterSelectedOptions
          value={industry}
          onChange={industrySelectHandler}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Chip
                  label={option.name}
                  key={key}
                  {...tagProps}
                  sx={{
                    "& ": {
                      backgroundColor: COLORS.DONE,
                      color: COLORS.DONE_TEXT,
                    },
                    "& svg": {
                      color: `${COLORS.DONE_TEXT} !important`,
                      fontSize: "20px !important",
                    },
                  }}
                  deleteIcon={<Close />}
                />
              );
            })
          }
        />
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select  Soft Skills Tags"
              sx={{ ...loginTextField }}
            />
          )}
          fullWidth
          options={SOFTSKILLSDATA}
          getOptionLabel={(option) => `${option.name} `}
          renderOption={(props, option) => (
            <Box {...props}>
              <Typography sx={{ fontFamily: roboto.style, fontSize: 14 }}>
                {option.name}
              </Typography>
            </Box>
          )}
          value={softSkills}
          multiple
          filterSelectedOptions
          onChange={softSkillsHandler}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Chip
                  label={option.name}
                  key={key}
                  {...tagProps}
                  sx={{
                    "& ": {
                      backgroundColor: COLORS.PURPLE,
                      color: COLORS.PURPLE_TEXT,
                    },
                    "& svg": {
                      color: `${COLORS.PURPLE_TEXT} !important`,
                      fontSize: "20px !important",
                    },
                  }}
                  deleteIcon={<Close />}
                />
              );
            })
          }
        />
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select  Strengths  Tags"
              sx={{ ...loginTextField }}
            />
          )}
          fullWidth
          options={STRENGTHDATA}
          getOptionLabel={(option) => `${option.name} `}
          renderOption={(props, option) => (
            <Box {...props}>
              <Typography sx={{ fontFamily: roboto.style, fontSize: 14 }}>
                {option.name}
              </Typography>
            </Box>
          )}
          value={strengths}
          multiple
          filterSelectedOptions
          onChange={strengthHandler}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Chip
                  label={option.name}
                  key={key}
                  {...tagProps}
                  sx={{
                    "& ": {
                      backgroundColor: COLORS.SIGNED_UP,
                      color: COLORS.SIGNED_UP_TEXT,
                    },
                    "& svg": {
                      color: `${COLORS.SIGNED_UP_TEXT} !important`,
                      fontSize: "20px !important",
                    },
                  }}
                  deleteIcon={<Close />}
                />
              );
            })
          }
        />
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select  Roadmap Tenure"
              sx={{ ...loginTextField }}
            />
          )}
          fullWidth
          options={data.roadmap_tenure}
          getOptionLabel={(option) => `${option.label} `}
          renderOption={(props, option) => (
            <Box {...props}>
              <Typography sx={{ fontFamily: roboto.style, fontSize: 14 }}>
                {option.label}
              </Typography>
            </Box>
          )}
        />
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Number of Tiles"
              sx={{ ...loginTextField }}
            />
          )}
          fullWidth
          options={data.roadmap_tenure}
          getOptionLabel={(option) => `${option.label} `}
          renderOption={(props, option) => (
            <Box {...props}>
              <Typography sx={{ fontFamily: roboto.style, fontSize: 14 }}>
                {option.label}
              </Typography>
            </Box>
          )}
        />
      </Stack>
    </div>
  );
};

export default Createroadmap;
