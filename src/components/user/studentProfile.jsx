import { roboto } from "@/utils/fonts";
import { Divider, Typography } from "@mui/material";
import ContactInformation from "./contactInformation";
import LinkedProfile from "./linkedProfile";
import PersonalInformation from "./personalInformation";

const StudentProfile = () => {
  return (
    <div>
      <Typography
        sx={{ fontSize: 18, fontFamily: roboto.style, fontWeight: 700 }}
      >
        Profile Details
      </Typography>
      <PersonalInformation />
      <Divider sx={{ mt: 2, mb: 2 }} />
      <ContactInformation />
      <Divider sx={{ mt: 2, mb: 2 }} />
      <LinkedProfile />
    </div>
  );
};

export default StudentProfile;
