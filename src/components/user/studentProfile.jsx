import { data } from "@/assests/data";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import {
  Autocomplete,
  Avatar,
  Box,
  Divider,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import PersonalInformation from "./personalInformation";
import ContactInformation from "./contactInformation";
import LinkedProfile from "./linkedProfile";

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
