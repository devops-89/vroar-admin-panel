import {
  CAREERDATA,
  INDUSTRYDATA,
  SOFTSKILLSDATA,
  STRENGTHDATA,
} from "@/assests/roadmapData";
import CustomChip from "@/components/customChip";
import { hideModal } from "@/redux/reducers/modal";
import { COLORS, METADATA_TYPE } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { studentJourneyValidationSchema } from "@/utils/validationSchema";
import { Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AddRoadmap = () => {
  const formik = useFormik({
    initialValues: {
      journey_name: "",
      careerRoadmap: [],
      strengthRoadmap: [],
      industryRoadmap: [],
      softSkillsRoadmap: [],
    },
    validationSchema: studentJourneyValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [career, setCareer] = useState([]);
  const [strength, setStrength] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const careerSelectorHandler = (e, value) => {
    setCareer(value);
    if (value) {
      formik.setFieldValue(
        "careerRoadmap",
        value.map((val) => val.id)
      );
    }
  };
  const strengthSelectHandler = (e, value) => {
    setStrength(value);
    if (value) {
      formik.setFieldValue(
        "strengthRoadmap",
        value.map((val) => val.id)
      );
    }
  };
  const industryChangeHandler = (e, value) => {
    setIndustry(value);
    if (value) {
      formik.setFieldValue(
        "industryRoadmap",
        value.map((val) => val.id)
      );
    }
  };

  const softSkillsChangeHandler = (e, value) => {
    setSoftSkills(value);
    if (value) {
      formik.setFieldValue(
        "softSkillsRoadmap",
        value.map((val) => val.id)
      );
    }
  };

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };

  return (
    <Box sx={{ width: 400 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontFamily: roboto.style,
            fontWeight: 500,
            textTransform: "capitalize",
          }}
        >
          Create Journey for the student
        </Typography>
        <IconButton onClick={closeModal}>
          <Close htmlColor={COLORS.PRIMARY} sx={{ fontSize: 20 }} />
        </IconButton>
      </Stack>
      <Stack sx={{ mt: 2 }} spacing={1}>
        <TextField
          fullWidth
          sx={{ ...loginTextField }}
          label="Enter Journey Name"
          id="journey_name"
          onChange={formik.handleChange}
          value={formik.values.journey_name}
          error={
            formik.touched.journey_name && Boolean(formik.errors.journey_name)
          }
          helperText={formik.touched.journey_name && formik.errors.journey_name}
        />
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tag Career Roadmap"
              sx={{ ...loginTextField }}
              error={
                formik.touched.careerRoadmap &&
                Boolean(formik.errors.careerRoadmap)
              }
              helperText={
                formik.touched.careerRoadmap && formik.errors.careerRoadmap
              }
            />
          )}
          options={CAREERDATA}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box component={"li"} {...props}>
              <Typography sx={{ fontFamily: roboto.style, fontSize: 14 }}>
                {option.name}
              </Typography>
            </Box>
          )}
          onChange={careerSelectorHandler}
          value={career}
          multiple
          filterSelectedOptions
          limitTags={1}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <CustomChip
                  label={option.name}
                  variant={METADATA_TYPE.CAREER}
                  {...tagProps}
                  key={key}
                  removable={true}
                  onDelete={() => {
                    const newCareer = career.filter((_, i) => i !== index);
                    setCareer(newCareer);
                  }}
                />
              );
            })
          }
        />
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tag Strength Roadmap"
              sx={{ ...loginTextField }}
              error={
                formik.touched.strengthRoadmap &&
                Boolean(formik.errors.strengthRoadmap)
              }
              helperText={
                formik.touched.strengthRoadmap && formik.errors.strengthRoadmap
              }
            />
          )}
          options={STRENGTHDATA}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box component={"li"} {...props}>
              <Typography sx={{ fontFamily: roboto.style, fontSize: 14 }}>
                {option.name}
              </Typography>
            </Box>
          )}
          onChange={strengthSelectHandler}
          value={strength}
          multiple
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <CustomChip
                  label={option.name}
                  variant={METADATA_TYPE.STRENGTHS}
                  {...tagProps}
                  key={key}
                  removable={true}
                  onDelete={() => {
                    const newStrengths = strength.filter((_, i) => i !== index);
                    setStrength(newStrengths);
                  }}
                />
              );
            })
          }
          limitTags={1}
          filterSelectedOptions
        />
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tag Industry Roadmap"
              sx={{ ...loginTextField }}
              error={
                formik.touched.industryRoadmap &&
                Boolean(formik.errors.industryRoadmap)
              }
              helperText={
                formik.touched.industryRoadmap && formik.errors.industryRoadmap
              }
            />
          )}
          options={INDUSTRYDATA}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box component={"li"} {...props}>
              <Typography sx={{ fontFamily: roboto.style, fontSize: 14 }}>
                {option.name}
              </Typography>
            </Box>
          )}
          onChange={industryChangeHandler}
          value={industry}
          multiple
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <CustomChip
                  label={option.name}
                  variant={METADATA_TYPE.INDUSTRY}
                  {...tagProps}
                  key={key}
                  removable={true}
                  onDelete={() => {
                    const newIndustry = industry.filter((_, i) => i !== index);
                    setIndustry(newIndustry);
                  }}
                />
              );
            })
          }
          limitTags={1}
          filterSelectedOptions
        />
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tag Soft Skills Roadmap"
              sx={{ ...loginTextField }}
              error={
                formik.touched.softSkillsRoadmap &&
                Boolean(formik.errors.softSkillsRoadmap)
              }
              helperText={
                formik.touched.softSkillsRoadmap &&
                formik.errors.softSkillsRoadmap
              }
            />
          )}
          options={SOFTSKILLSDATA}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box component={"li"} {...props}>
              <Typography sx={{ fontFamily: roboto.style, fontSize: 14 }}>
                {option.name}
              </Typography>
            </Box>
          )}
          onChange={softSkillsChangeHandler}
          value={softSkills}
          multiple
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <CustomChip
                  label={option.name}
                  variant={METADATA_TYPE.SOFT_SKILLS}
                  {...tagProps}
                  key={key}
                  removable={true}
                  onDelete={() => {
                    const newSoftSkills = softSkills.filter(
                      (_, i) => i !== index
                    );
                    setSoftSkills(newSoftSkills);
                  }}
                />
              );
            })
          }
          limitTags={1}
          filterSelectedOptions
        />
        <Button
          sx={{
            backgroundColor: COLORS.PRIMARY,
            color: COLORS.WHITE,
            fontSize: 14,
            fontFamily: roboto.style,
          }}
          onClick={formik.handleSubmit}
        >
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default AddRoadmap;
