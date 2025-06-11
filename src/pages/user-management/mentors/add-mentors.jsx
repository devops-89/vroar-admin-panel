import PageBreadCrumbs from "@/components/customBreadCrumbs";
import AcademicQualification from "@/components/user/mentor/AddMentorFormComponents/AcademicQualification";
import InitialForm from "@/components/user/mentor/AddMentorFormComponents/InitialForm";
import Wrapper from "@/components/wrapper";
import { roboto } from "@/utils/fonts";
import { Box, Card, Stack, Typography } from "@mui/material";
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

        <form>
          <InitialForm />
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
            />
          </Box>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddMentors;
