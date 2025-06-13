import PageBreadCrumbs from "@/components/customBreadCrumbs";
import AcademicQualification from "@/components/user/mentor/AddMentorFormComponents/AcademicQualification";
import InitialForm from "@/components/user/mentor/AddMentorFormComponents/InitialForm";
import ProfessionalBackground from "@/components/user/mentor/AddMentorFormComponents/ProfessionalBackground";
import Wrapper from "@/components/wrapper";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { addMentorValidationSchema } from "@/utils/validationSchema";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";

const AddMentors = () => {
  const [academicQualification, setAcademicQualification] = useState([
    {
      institutionName: "",
      degree: "",
      fieldOfStudy: "",
      year: "",
    },
  ]);

  const [professionalBackground, setProfessionalBackground] = useState([
    {
      companyName: "",
      position: "",
      duration: "",
      description: "",
    },
  ]);

  const formik = useFormik({
    initialValues: {
      firstName: "", // req
      lastName: "", // req
      email: "",
      phoneNo: "", // req
      countryCode: "", //req
      password: "", // req
      avatar: "",
      coverImage: "",
      gender: "",
      birthDate: "",
      designation: "",
      skills: [],
      careerSummary: "",
      professionalBackground: [],
      academicQualification: [],
    },
    validationSchema: addMentorValidationSchema,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  if (formik.errors) {
    console.log("formik.errors", formik.errors);
    console.log("formik.values", formik.values.academicQualification);
  }
  return (
    <Wrapper>
      <Card sx={{ p: 3 }}>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600,
            fontFamily: roboto.style,
            mb: 1,
          }}
        >
          Add Mentors
        </Typography>
        <PageBreadCrumbs
          data={[
            { label: "User Management", url: "/user-management/mentors" },
            {
              label: "Add Mentors",
              url: "/user-management/mentors/add-mentors",
            },
          ]}
        />

        <form onSubmit={formik.handleSubmit}>
          <InitialForm formik={formik} />
          <Box sx={{ mt: 2 }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                fontFamily={roboto.style}
                fontSize={20}
                sx={{ mt: 5, fontWeight: 600 }}
              >
                Add Academic Qualification
              </Typography>
            </Stack>
            <AcademicQualification
              academicQualification={academicQualification}
              setAcademicQualification={setAcademicQualification}
              formik={formik}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                fontFamily={roboto.style}
                fontSize={20}
                sx={{ mt: 5, fontWeight: 600 }}
              >
                Add Professional Background
              </Typography>
            </Stack>
            <ProfessionalBackground
              professionalBackground={professionalBackground}
              setProfessionalBackground={setProfessionalBackground}
              formik={formik}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              type="submit"
              sx={{
                background: COLORS.LinearGradient,
                color: COLORS.WHITE,
                width: 150,
                fontFamily: roboto.style,
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddMentors;
