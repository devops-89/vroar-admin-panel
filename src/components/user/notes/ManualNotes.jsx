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
import moment from "moment";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const ManualNotes = () => {
  const user = useSelector((state) => state.USER);
  const [loading, setLoading] = useState(true);
  const formik = useFormik({
    initialValues: {
      notes: "",
    },
    onSubmit: (values) => {
      if (values.notes === "") {
        dispatch(
          setToast({
            open: true,
            message: "Please Enter Note",
            severity: ToastStatus.ERROR,
          })
        );
        return;
      }
      setSubmitLoading(true);

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
    userController
      .addNotes(body)
      .then((res) => {
        setSubmitLoading(false);
        dispatch(
          setToast({
            open: true,
            message: res.data.message,
            severity: ToastStatus.SUCCESS,
          })
        );
        getNotes(user.id);
        formik.resetForm();
        setValue("");
      })
      .catch((err) => {
        let errMessage =
          (err.response && err.response.data.message) || err.message;
        dispatch(
          setToast({
            open: true,
            message: errMessage,
            severity: ToastStatus.ERROR,
          })
        );
        setSubmitLoading(false);
      });
  };
  const [notes, setNotes] = useState(null);
  const getNotes = (userId) => {
    userController
      .getNotes(userId)
      .then((res) => {
        const response = res.data.data;
        setNotes(response);
        setLoading(false);
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
      {loading ? (
        <Box>
          <Loading
            width={30}
            height={30}
            color={COLORS.BLACK}
            className="m-auto"
            type="bars"
          />
        </Box>
      ) : (
        notes?.docs.map((val, i) => (
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
                <div
                  dangerouslySetInnerHTML={{
                    __html: open === i ? val.note : val.note.slice(0, 100),
                  }}
                ></div>
                <Typography
                  component={"span"}
                  sx={{
                    fontFamily: roboto.style,
                    color: COLORS.PRIMARY,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  {notes.length === 100 && open !== i && (
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
                {moment.unix(val.createdAt).format("hh:mm A")}
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
                {moment.unix(val.createdAt).format("DD MMM YYYY")}
              </Typography>
            </Stack>
          </Stack>
        ))
      )}
      <Box sx={{ mt: 2 }}>
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
              {submitLoading ? (
                <Loading
                  width={20}
                  height={20}
                  color={COLORS.BLACK}
                  type="bars"
                />
              ) : (
                "Add Note"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default ManualNotes;
