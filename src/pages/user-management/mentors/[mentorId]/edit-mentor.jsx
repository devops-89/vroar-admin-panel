import PageBreadCrumbs from "@/components/customBreadCrumbs";
import AcademicQualification from "@/components/user/mentor/AddMentorFormComponents/AcademicQualification";
import InitialForm from "@/components/user/mentor/AddMentorFormComponents/InitialForm";
import ProfessionalBackground from "@/components/user/mentor/AddMentorFormComponents/ProfessionalBackground";
import Wrapper from "@/components/wrapper";
import { COLORS, MEDIA_TYPE } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { addMentorValidationSchema } from "@/utils/validationSchema";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { setToast } from "@/redux/reducers/toast";
import { ToastStatus } from "@/utils/enum";
import { useDispatch } from "react-redux";
import userController from "@/api/user";
import { useRouter } from "next/router";
import { getMentorById } from "@/assests/apiCalling/userController";

const EditMentors = () => {
  const dispatch = useDispatch();
  const [academicQualification, setAcademicQualification] = useState([
    {
      institution: "",
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

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "", // req
      lastName: "", // req
      email: "",
      phoneNo: "", // req
      countryCode: "", //req
      password: "", // req
      avatar: "",
      gender: "",
      birthDate: "",
      designation: "",
      skills: [],
      careerSummary: "",
      professionalBackground: [],
      academicQualification: [],
    },
    validationSchema: addMentorValidationSchema,
    onSubmit: async (values) => {
      // Upload avatar first
      let avatar = "";
      if (values.avatar) {
        const body = {
          mediaLibraryType: MEDIA_TYPE.PROFILE,
          mediaFile: values.avatar,
        };
        setLoading(true);

        try {
          const res = await userController.mediaUpload(body);
          avatar = res?.data?.data?.filePath;
        } catch (err) {
          let errorMessage =
            (err.response && err.response.data.message) || err.response;
          dispatch(
            setToast({
              open: true,
              message: errorMessage,
              severity: ToastStatus.ERROR,
            })
          );
          setLoading(false);
          return;
        }
      }
      // Prepare body for addMentor
      const isAllAcademicEmpty = values.academicQualification.every(
        (item) =>
          !item.institution && !item.degree && !item.fieldOfStudy && !item.year
      );
      const isAllProfessionalEmpty = values.professionalBackground.every(
        (item) =>
          !item.companyName &&
          !item.designation &&
          !item.duration &&
          !item.description
      );
      const body = {
        ...values,
        avatar,
      };
      if (isAllAcademicEmpty) {
        delete body.academicQualification;
      }
      if (isAllProfessionalEmpty) {
        delete body.professionalBackground;
      }
      handleAddMentor(body);
    },
  });

  const handleAddMentor = (body) => {
    userController
      .addMentor(body)
      .then((res) => {
        dispatch(
          setToast({
            open: true,
            message: res.data.message,
            severity: ToastStatus.SUCCESS,
          })
        );
        setLoading(false);
        formik.resetForm();
        setAcademicQualification([]);
        setProfessionalBackground([]);
      })
      .catch((err) => {
        console.log("err", err);
        let errorMessage =
          (err.response && err.response.data.message) || err.response;
        dispatch(
          setToast({
            open: true,
            message: errorMessage,
            severity: ToastStatus.ERROR,
          })
        );
        setLoading(false);
      });
  };
  const [mentorData, setMentorData] = useState(null);
  const router = useRouter();
  const { mentorId } = router.query;

  // Fetch mentor data when mentorId changes
  useEffect(() => {
    const fetchMentor = async () => {
      if (mentorId) {
        await getMentorById(mentorId, setMentorData);
      }
    };
    fetchMentor();
  }, [mentorId]);

  useEffect(() => {
    if (mentorData) {
      formik.setValues({
        ...formik.initialValues,
        ...mentorData,
        academicQualification: mentorData.academicQualification || [],
        professionalBackground: mentorData.professionalBackground || [],
      });
      setAcademicQualification(mentorData.academicQualification || []);
      setProfessionalBackground(mentorData.professionalBackground || []);
    }
  }, [mentorData]);

//   console.log("mentorData", mentorData);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Check for incomplete academic qualification
    const hasIncompleteAcademic = academicQualification.some(
      (item) =>
        item.institution && (!item.degree || !item.fieldOfStudy || !item.year)
    );
    if (hasIncompleteAcademic) {
      dispatch(
        setToast({
          open: true,
          message:
            "Please fill all required fields for each academic qualification.",
          severity: ToastStatus.ERROR,
        })
      );
      return;
    }
    // Check for incomplete professional background
    const hasIncompleteProfessional = professionalBackground.some(
      (item) =>
        item.companyName &&
        (!item.designation || !item.duration || !item.description)
    );
    if (hasIncompleteProfessional) {
      dispatch(
        setToast({
          open: true,
          message:
            "Please fill all required fields for each professional background.",
          severity: ToastStatus.ERROR,
        })
      );
      return;
    }
    formik.setFieldValue("academicQualification", academicQualification, false);
    formik.setFieldValue(
      "professionalBackground",
      professionalBackground,
      false
    );
    formik.handleSubmit();
  };

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

        <form onSubmit={handleSubmit}>
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
              submitted={submitted}
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
              submitted={submitted}
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
              {loading ? (
                <CircularProgress size={20} sx={{ color: COLORS.WHITE }} />
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </form>
      </Card>
    </Wrapper>
  );
};

export default EditMentors;
