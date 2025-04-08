import { data } from "@/assests/data";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { manualNotesValidationSchema } from "@/utils/validationSchema";
import {
  Box,
  Button,
  Collapse,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const ManualNotes = () => {
  const formik = useFormik({
    initialValues: {
      notes: "",
    },
    validationSchema: manualNotesValidationSchema,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });
  const [open, setOpen] = useState(false);
  const handleOpen = (index) => {
    setOpen((prev) => (prev === index ? null : index));
  };

  return (
    <div>
      {data.notes.map((val, i) => (
        <Stack
          alignItems={"start"}
          key={i}
          spacing={2}
          mt={1}
          sx={{ width: "100%" }}
        >
          <Box
            sx={{
              borderRadius: 18,
              backgroundColor: "#EEEFF3",
              px: 3,
              py: 2,
              mt: 1,
              width: "95%",
            }}
          >
            <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
              {open === i ? val.message : val.message.slice(0, 250) + "..."}
              <Typography
                component={"span"}
                sx={{
                  fontFamily: roboto.style,
                  color: COLORS.PRIMARY,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                {open !== i && (
                  <Button
                    sx={{
                      fontFamily: roboto.style,
                      color: COLORS.PRIMARY,
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                    onClick={() => handleOpen(i)}
                    variant="text"
                  >
                    Read More
                  </Button>
                )}
              </Typography>
            </Typography>
            {open === i && (
              <Button
                sx={{
                  fontFamily: roboto.style,
                  color: COLORS.PRIMARY,
                  fontSize: 14,
                  cursor: "pointer",
                }}
                onClick={() => handleOpen(i)}
                variant="text"
              >
                Read Less
              </Button>
            )}
          </Box>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            spacing={1}
            sx={{ width: "95%" }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontFamily: roboto.style,
                color: COLORS.grey,
              }}
            >
              {val.time}
            </Typography>
            <Box
              sx={{
                borderRadius: 10,
                backgroundColor: COLORS.grey,
                width: 3,
                height: 3,
              }}
            ></Box>
            <Typography
              sx={{
                fontSize: 14,
                fontFamily: roboto.style,
                color: COLORS.grey,
              }}
            >
              {val.date}
            </Typography>
          </Stack>
        </Stack>
      ))}
      <form onSubmit={formik.handleSubmit}>
        {/* <TextField
          sx={{
            ...loginTextField,
            fieldset: {
              height: 110,
            },
            "& .MuiOutlinedInput-input": {
              height: "100px !important",
            },
            mt: 2,
          }}
          fullWidth
          multiline
          label="Enter your text (max 500 characters)"
          onChange={formik.handleChange}
          value={formik.values.notes}
          id="notes"
          error={formik.touched.notes && Boolean(formik.errors.notes)}
          helperText={formik.touched.notes && formik.errors.notes}
        /> */}
        <Box>
          <ReactQuill style={{ height: 150 }} />
        </Box>
        <Box sx={{ mt: 10, textAlign: "end" }}>
          <Button
            sx={{
              fontSize: 15,
              fontFamily: roboto.style,
              color: COLORS.WHITE,
              backgroundColor: COLORS.PRIMARY,
              textTransform: "capitalize",
              width: 180,
            }}
            type="submit"
          >
            Add Note
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default ManualNotes;
