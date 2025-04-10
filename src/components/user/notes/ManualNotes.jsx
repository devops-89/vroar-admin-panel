import userController from "@/api/user";
import { data } from "@/assests/data";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus } from "@/utils/enum";
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const ManualNotes = () => {
  const user = useSelector((state) => state.USER);
  const formik = useFormik({
    initialValues: {
      notes: "",
    },
    onSubmit: (values) => {
      let body = {
        note: values.notes,
        userId: user.id,
      };
      handleSubmit(body);
    },
  });
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState("");
  const handleChangeNote = (newValue) => {
    setValue(newValue);
    formik.values.notes = newValue;
  };

  const handleOpen = (index) => {
    setOpen((prev) => (prev === index ? null : index));
  };
  const dispatch = useDispatch();
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmit = (body) => {
    if (formik.values.notes === "") {
      dispatch(
        setToast({
          open: true,
          message: "Please Enter Note",
          variant: ToastStatus.ERROR,
        })
      );
      return;
    }
    userController
      .addNotes(body)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const [notes, setNotes] = useState(null);
  const getNotes = (userId) => {
    userController
      .getNotes(userId)
      .then((res) => {
        const response = res.data.data;
        setNotes(response);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  useEffect(() => {
    if (user) {
      getNotes(user?.id);
    }
  }, [user]);

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
              px: open === i ? 4 : 3,
              py: open === i ? 3 : 2,
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
        <Box>
          <ReactQuill
            style={{ height: 150 }}
            onChange={handleChangeNote}
            value={value}
            id="notes"
          />
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
