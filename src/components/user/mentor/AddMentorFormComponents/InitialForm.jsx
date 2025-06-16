import { data } from "@/assests/data";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import {
  Autocomplete,
  Avatar,
  Box,
  Card,
  FormHelperText,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import Image from "next/image";
import { useRef, useState } from "react";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { skillsOptions } from "@/utils/genericArray";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const InitialForm = ({ formik }) => {
  const [previewImage, setPerviewImage] = useState(formik.values.avatar || "");
  const ref = useRef();

  // image upload handler
  const handleImageUpload = () => {
    ref.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPerviewImage(url);
      formik.setFieldValue("avatar", file);
    }
  };
  // phone number change handler
  const [phone, setPhone] = useState("");
  const handleChangePhoneNumber = (value, countryData) => {
    setPhone(value);

    const isValid = matchIsValidTel(value);
    if (isValid && countryData?.nationalNumber) {
      formik.setFieldValue("phoneNo", countryData.nationalNumber);
      formik.setFieldValue("countryCode", countryData.countryCallingCode);
    } else {
      formik.setFieldError("phoneNo", "Invalid phone number");
      formik.setFieldValue("phoneNo", "");
      formik.setFieldValue("countryCode", "");
    }
  };

  // gender change handler
  const [gender, setGender] = useState(null);

  const handleChangeGender = (e, newValue) => {
    setGender(newValue);
    if (newValue) {
      formik.setFieldValue("gender", newValue?.label);
      formik.setFieldError("gender", "");
    } else {
      formik.setFieldError("gender", "Please select gender");
    }
  };

  //  birthdate change Handler
  const [birthDate, setBirthDate] = useState(null);
  const handleChangeBirthDate = (value) => {
    setBirthDate(value);
    if (value) {
      formik.setFieldValue("birthDate", moment(value).unix());
      formik.setFieldError("birthDate", "");
    } else {
      formik.setFieldError("birthDate", "Please select birth date");
    }
  };

  const filter = createFilterOptions();

  // skills change handler
  const handleSkillsChange = (event, newValue) => {
    if (!newValue || newValue.length === 0) {
      formik.setFieldError("skills", "Please select at least one skill");
      formik.setFieldValue("skills", []);
      return;
    } else {
      formik.setFieldError("skills", "");
    }
    const lastValue = newValue[newValue.length - 1];
    if (typeof lastValue === "string" && lastValue.startsWith('Add "')) {
      const skillToAdd = lastValue.slice(5, -1);
      formik.setFieldValue("skills", [...newValue.slice(0, -1), skillToAdd]);
    } else {
      formik.setFieldValue("skills", newValue);
    }
  };

  return (
    <div>
      <Grid2 container spacing={2} mt={2}>
        <Grid2 size={3}>
          <Card
            sx={{
              p: 2,
              height: 290,
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <IconButton
                sx={{
                  height: 220,
                  width: 220,
                  margin: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: formik.errors.avatar
                    ? "1px solid red"
                    : "1px solid #d7d7d7",
                }}
                onClick={handleImageUpload}
              >
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="avatar"
                    width={200}
                    height={200}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                ) : (
                  <Avatar
                    sx={{ height: 200, width: 200, margin: "auto" }}
                  ></Avatar>
                )}
                <input
                  type="file"
                  ref={ref}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </IconButton>

              <FormHelperText
                sx={{ textAlign: "center", color: COLORS.DANGER }}
              >
                {formik.errors.avatar}
              </FormHelperText>
            </Box>
          </Card>
        </Grid2>
        <Grid2 size={9}>
          <Grid2 container spacing={4}>
            <Grid2 size={6}>
              <TextField
                sx={{ ...loginTextField }}
                label="First Name"
                fullWidth
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                sx={{ ...loginTextField }}
                label="Last Name"
                fullWidth
                id="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                sx={{ ...loginTextField }}
                label="Email"
                fullWidth
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid2>
            <Grid2 size={6}>
              <MuiTelInput
                sx={{ ...loginTextField }}
                fullWidth
                defaultCountry="US"
                onChange={handleChangePhoneNumber}
                value={phone}
                error={formik.touched.phoneNo && Boolean(formik.errors.phoneNo)}
                helperText={formik.touched.phoneNo && formik.errors.phoneNo}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                sx={{ ...loginTextField }}
                label="Designation"
                fullWidth
                id="designation"
                value={formik.values.designation}
                onChange={formik.handleChange}
                error={
                  formik.touched.designation &&
                  Boolean(formik.errors.designation)
                }
                helperText={
                  formik.touched.designation && formik.errors.designation
                }
              />
            </Grid2>
            <Grid2 size={6}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ ...loginTextField }}
                    label="Gender"
                    fullWidth
                    error={
                      formik.touched.gender && Boolean(formik.errors.gender)
                    }
                    helperText={formik.touched.gender && formik.errors.gender}
                  />
                )}
                options={data.genderData}
                renderOption={(props, option) => (
                  <Box component={"li"} {...props}>
                    <Typography fontFamily={roboto.style}>
                      {option.label}
                    </Typography>
                  </Box>
                )}
                onChange={handleChangeGender}
                value={gender}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                sx={{ ...loginTextField }}
                label="Password"
                fullWidth
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid2>
            <Grid2 size={6}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Birth Date"
                  sx={{ ...loginTextField, width: "100%" }}
                  value={birthDate}
                  onChange={handleChangeBirthDate}
                  slotProps={{
                    textField: {
                      error:
                        formik.touched.birthDate &&
                        Boolean(formik.errors.birthDate),
                      helperText:
                        formik.touched.birthDate && formik.errors.birthDate,
                    },
                  }}
                  disableFuture
                />
              </LocalizationProvider>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={12}>
          <Autocomplete
            multiple
            freeSolo
            options={skillsOptions}
            value={formik.values.skills || []}
            onChange={handleSkillsChange}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              if (
                params.inputValue !== "" &&
                !options.includes(params.inputValue)
              ) {
                filtered.push(`Add "${params.inputValue}"`);
              }
              return filtered;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ ...loginTextField }}
                label="Skills"
                fullWidth
                multiline
                error={formik.touched.skills && Boolean(formik.errors.skills)}
                helperText={formik.touched.skills && formik.errors.skills}
                id="skills"
              />
            )}
            renderOption={(props, option) => (
              <Box component={"li"} {...props}>
                <Typography fontFamily={roboto.style}>{option}</Typography>
              </Box>
            )}
            filterSelectedOptions
          />
        </Grid2>

        <Grid2 size={12}>
          <TextField
            sx={{
              ...loginTextField,
              fieldset: {
                height: 110,
              },
              "& .MuiOutlinedInput-input": {
                height: "100px !important",
              },
            }}
            label="Career Summary"
            fullWidth
            multiline
            value={formik.values.careerSummary}
            onChange={formik.handleChange}
            error={
              formik.touched.careerSummary &&
              Boolean(formik.errors.careerSummary)
            }
            helperText={
              formik.touched.careerSummary && formik.errors.careerSummary
            }
            id="careerSummary"
          />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default InitialForm;
