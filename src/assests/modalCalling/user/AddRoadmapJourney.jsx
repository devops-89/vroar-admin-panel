import { metaDataController } from "@/api/metaDataController";
import userController from "@/api/user";
import CustomChip from "@/components/customChip";
import { hideModal } from "@/redux/reducers/modal";
import { setToast } from "@/redux/reducers/toast";
import {
  COLORS,
  METADATA_TYPE,
  ROADMAP_STATUS,
  ToastStatus,
} from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { studentJourneyValidationSchema } from "@/utils/validationSchema";
import { Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const AddRoadmapJourney = ({ getJourney, journeyData }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userId } = router.query;
  const formik = useFormik({
    initialValues: {
      journey_name: journeyData ? journeyData?.name : "",
      careerRoadmap: [],
      strengthRoadmap: [],
      industryRoadmap: [],
      softSkillsRoadmap: [],
      treksRoadmap: [],
    },
    onSubmit: async (values) => {
      setLoading(true);
      const body = {
        name: values.journey_name,
        roadmapJourneyIds: [
          ...values.careerRoadmap,
          ...values.industryRoadmap,
          ...values.softSkillsRoadmap,
          ...values.strengthRoadmap,
          ...values.treksRoadmap,
        ],
        userId: userId,
      };
      if (journeyData) {
        body.journeyId = journeyData.id;
      }

      try {
        await studentJourneyValidationSchema.validate(body, {
          abortEarly: false,
        });
        try {
          const res = await userController.assignRoadmapJourney(body);
          dispatch(
            setToast({
              open: true,
              message: res.data.message,
              severity: ToastStatus.SUCCESS,
            })
          );
          getJourney();
          dispatch(hideModal());
        } catch (err) {
          let errMesssage =
            (err.response && err.response.data.message) || err.message;
          dispatch(
            setToast({
              open: true,
              message: errMesssage,
              severity: ToastStatus.ERROR,
            })
          );
          setLoading(false);
        } finally {
          setLoading(false);
        }
      } catch (error) {
        if (error.inner) {
          error.inner.forEach((err) => {
            const validationErrors = {};
            error.inner.forEach((err) => {
              validationErrors[err.path] = err.message;
            });
            dispatch(
              setToast({
                open: true,
                message: err.message,
                severity: ToastStatus.ERROR,
              })
            );
          });
          setLoading(false);
        }
      }
    },
  });
  const [careerData, setCareerData] = useState([]);
  const [strengthData, setStrengthData] = useState([]);
  const [industryData, setIndustryData] = useState([]);
  const [softSkillsData, setSoftSkillsData] = useState([]);
  const [treksRoadmapData, setTreksRoadmapData] = useState([]);

  const [career, setCareer] = useState([]);
  const [strength, setStrength] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [treks, setTreks] = useState([]);
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

  const treksChangeHandler = (e, newValue) => {
    setTreks(newValue);
    if (newValue) {
      formik.setFieldValue(
        "treksRoadmap",
        newValue.map((val) => val.id)
      );
    }
  };

  const [listLoading, setListLoading] = useState(false);

  const getAllRoadmapJourney = async ({ type, setLoading, setData }) => {
    setLoading(true);
    try {
      const res = await metaDataController.getRoadmapJourney({
        page: 1,
        pageSize: 100,
        metadataType: Array.isArray(type) ? type : [type],
        status: ROADMAP_STATUS.PUBLISHED,
      });
      setData(res.data.data.docs);
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
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

  useEffect(() => {
    if (journeyData?.roadmapJourneys?.length) {
      const careerJourneyNames = [];
      const strengthJourneyNames = [];
      const industryJourneyNames = [];
      const softSkillJourneyNames = [];
      const treksJourneysName = [];

      const careerTags = [];
      const strengthTags = [];
      const industryTags = [];
      const softSkillTags = [];
      const treksTags = [];

      journeyData.roadmapJourneys.forEach((journey) => {
        let hasCareer = false;
        let hasStrength = false;
        let hasIndustry = false;
        let hasSoftSkill = false;
        let hasTreks = false;

        journey.metadataTags?.forEach((tag) => {
          switch (tag.type) {
            case METADATA_TYPE.CAREER:
              if (!careerTags.find((t) => t.id === tag.id))
                careerTags.push(tag);
              hasCareer = true;
              break;
            case METADATA_TYPE.STRENGTHS:
              if (!strengthTags.find((t) => t.id === tag.id))
                strengthTags.push(tag);
              hasStrength = true;
              break;
            case METADATA_TYPE.INDUSTRY:
              if (!industryTags.find((t) => t.id === tag.id))
                industryTags.push(tag);
              hasIndustry = true;
              break;
            case METADATA_TYPE.SOFT_SKILLS:
              if (!softSkillTags.find((t) => t.id === tag.id))
                softSkillTags.push(tag);
              hasSoftSkill = true;
              break;
            case METADATA_TYPE.MY_TREKS:
              if (!treksTags.find((t) => t.id === tag.id)) treksTags.push(tag);
              hasTreks = true;
              break;
          }
        });

        if (hasCareer && !careerJourneyNames.includes(journey.name)) {
          careerJourneyNames.push({ id: journey.id, name: journey.name });
        }
        if (hasStrength && !strengthJourneyNames.includes(journey.name)) {
          strengthJourneyNames.push({ id: journey.id, name: journey.name });
        }
        if (hasIndustry && !industryJourneyNames.includes(journey.name)) {
          industryJourneyNames.push({ id: journey.id, name: journey.name });
        }
        if (hasSoftSkill && !softSkillJourneyNames.includes(journey.name)) {
          softSkillJourneyNames.push({ id: journey.id, name: journey.name });
        }
        if (hasTreks && !treksJourneysName.includes(journey.name)) {
          treksJourneysName.push({ id: journey.id, name: journey.name });
        }
      });

      setCareer(careerJourneyNames);
      setStrength(strengthJourneyNames);
      setIndustry(industryJourneyNames);
      setSoftSkills(softSkillJourneyNames);
      setTreks(treksJourneysName);
    }
  }, [journeyData]);

  return (
    <Box sx={{ width: 600 }}>
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

        {/* career roadmap selectbar */}
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
          options={careerData}
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
          onFocus={() =>
            getAllRoadmapJourney({
              type: [METADATA_TYPE.CAREER],
              setData: setCareerData,
              setLoading: setListLoading,
            })
          }
          loading={listLoading}
        />

        {/* Industry roadmap selectbar */}
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
          options={industryData}
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
          onFocus={() =>
            getAllRoadmapJourney({
              type: [METADATA_TYPE.INDUSTRY],
              setLoading: setListLoading,
              setData: setIndustryData,
            })
          }
          loading={listLoading}
        />

        {/* strength roadmap selectbar */}
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
          options={strengthData}
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
          onFocus={() =>
            getAllRoadmapJourney({
              type: [METADATA_TYPE.STRENGTHS],
              setLoading: setListLoading,
              setData: setStrengthData,
            })
          }
          loading={listLoading}
        />

        {/* soft skills roadmap selectbar */}
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
              fullWidth
            />
          )}
          options={softSkillsData}
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
          onFocus={() =>
            getAllRoadmapJourney({
              type: [METADATA_TYPE.SOFT_SKILLS],
              setLoading: setListLoading,
              setData: setSoftSkillsData,
            })
          }
          loading={listLoading}
        />
        {/* treks skills roadmap selectbar */}
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tag My treks Roadmap"
              sx={{ ...loginTextField }}
              error={
                formik.touched.treksRoadmap &&
                Boolean(formik.errors.treksRoadmap)
              }
              helperText={
                formik.touched.treksRoadmap && formik.errors.treksRoadmap
              }
              fullWidth
            />
          )}
          options={treksRoadmapData}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box component={"li"} {...props}>
              <Typography sx={{ fontFamily: roboto.style, fontSize: 14 }}>
                {option.name}
              </Typography>
            </Box>
          )}
          onChange={treksChangeHandler}
          value={treks}
          multiple
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <CustomChip
                  label={option.name}
                  variant={METADATA_TYPE.MY_TREKS}
                  {...tagProps}
                  key={key}
                  removable={true}
                  onDelete={() => {
                    const newSoftSkills = treks.filter((_, i) => i !== index);
                    setTreks(newSoftSkills);
                  }}
                />
              );
            })
          }
          limitTags={1}
          filterSelectedOptions
          onFocus={() =>
            getAllRoadmapJourney({
              type: [METADATA_TYPE.MY_TREKS],
              setLoading: setListLoading,
              setData: setTreksRoadmapData,
            })
          }
          loading={listLoading}
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
          {loading ? (
            <Loading type="bars" color={COLORS.BLACK} width={20} height={20} />
          ) : (
            "Continue"
          )}
        </Button>
      </Stack>
    </Box>
  );
};

export default AddRoadmapJourney;
