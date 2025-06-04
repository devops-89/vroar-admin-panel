import { metaDataController } from "@/api/metaDataController";
import { getContentList } from "@/assests/apiCalling/metaDataController";
import { hideModal } from "@/redux/reducers/modal";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { contentType } from "@/utils/genericArray";
import { loginTextField } from "@/utils/styles";
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
import React, { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

// Enhanced validation schema
const editRoadmapValidationSchema = Yup.object().shape({
  tileName: Yup.string()
    .required('Tile name is required')
    .min(2, "Tile name must be at least 2 characters")
    .test('no-leading-trailing-spaces', 'Tile name should not contain leading or trailing spaces', 
      value => value === value?.trim())
    .test(
      "no-multiple-spaces",
      "Multiple consecutive spaces are not allowed",
      (value) => {
        if (!value) return true;
        return !value.includes("  ");
      }
    ),
  contentType: Yup.string()
    .required('Content type is required'),
  contentLibraryId: Yup.string()
    .required('Content is required'),
  time: Yup.number()
    .required('Time is required')
    .min(1, 'Time must be at least 1 minute')
    .max(180, 'Time cannot exceed 180 minutes (3 hours)')
    .integer('Time must be a whole number')
    .test('no-leading-trailing-spaces', 'Time should not contain leading or trailing spaces', 
      value => String(value) === String(value)?.trim())
    .typeError('Time must be a number'),
  points: Yup.number()
    .required('Coins are required')
    .min(1, 'Coins must be at least 1')
    .max(999, 'Coins cannot exceed 999')
    .integer('Coins must be a whole number')
    .test('no-leading-trailing-spaces', 'Coins should not contain leading or trailing spaces', 
      value => String(value) === String(value)?.trim())
    .typeError('Coins must be a number'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must contain at least 10 characters')
    .max(500, 'Description must not exceed 500 characters')
    .test('no-leading-trailing-spaces', 'Description should not contain leading or trailing spaces', 
      value => value === value?.trim())
    .test(
      "no-multiple-spaces",
      "Multiple consecutive spaces are not allowed",
      (value) => {
        if (!value) return true;
        return !value.includes("  ");
      }
    ),
});

const EditRoadmap = ({ value, sequence, getRoadmapDetails }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { roadmapId } = router.query;
  const [content, setContent] = useState(null);
  const [contentList, setContentList] = useState([]);
  const [contentLibraryId, setContentLibraryId] = useState(null);
  const [contentLoading, setContentLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  // Helper function to trim spaces in real-time
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Remove multiple consecutive spaces in real-time
    const processedValue = value.replace(/\s+/g, ' ');
    
    formik.setFieldValue(id, processedValue);
    formik.setFieldTouched(id, true, false);
  };

  const formik = useFormik({
    initialValues: {
      tileName: "",
      contentType: "",
      contentLibraryId: "",
      time: "",
      points: "",
      description: "",
      id: "",
      roadmapId: roadmapId,
    },
    validationSchema: editRoadmapValidationSchema,
    onSubmit: (values) => {
      // Trim all string values before submitting
      const trimmedValues = {
        ...values,
        tileName: values.tileName.trim(),
        description: values.description.trim(),
      };

      const body = {
        roadmapId: roadmapId,
        tileId: trimmedValues.id,
        sequenceNo: sequence,
        tileName: trimmedValues.tileName,
        time: String(trimmedValues.time),
        points: Number(trimmedValues.points),
        description: trimmedValues.description,
        contentLibraryId: trimmedValues.contentLibraryId,
      };
      submitHandler(body);
    },
  });

  const submitHandler = (body) => {
    setLoading(true);
    metaDataController
      .editRoadmapTile(body)
      .then((res) => {
        // console.log("res", res);
        dispatch(
          setToast({
            open: true,
            message: res.data.message,
            severity: ToastStatus.SUCCESS,
          })
        );
        getRoadmapDetails(roadmapId);
        handleCloseModal();
        setLoading(false);
      })
      .catch((err) => {
        // console.log("err", err);
        let errMessage =
          (err.response && err.response.data.message) || err.message;
        dispatch(
          setToast({
            open: true,
            message: errMessage,
            severity: ToastStatus.ERROR,
          })
        );
        setLoading(false);
      });
  };
  const handleChangeContentType = (e, newValue, id) => {
    if (id === "contentType") {
      // First clear everything
      setContentList([]); // Clear content list first
      setContentLibraryId(null); // Clear selected content
      formik.setFieldValue("contentLibraryId", ""); // Clear content form value
      formik.setFieldValue("contentType", newValue?.label || "");
      formik.setFieldTouched("contentType", true, false);
      setContent(newValue);
      
      // Then fetch new content list if we have a content type
      if (newValue?.label) {
        setContentLoading(true);
        const body = {
          page: 1,
          pageSize: 500,
          contentType: [newValue.label], // Directly use array with label
        };
        
        getContentList({
          body,
          setData: (data) => {
            setContentList(data || []);
            setContentLoading(false);
          },
          setLoading: setContentLoading,
        });
      }
    }
    if (id === "contentLibraryId") {
      formik.setFieldValue(id, newValue?.id || "");
      formik.setFieldTouched(id, true, false);
      setContentLibraryId(newValue);
    }
  };

  const handleCloseModal = () => {
    dispatch(hideModal());
  };
  useEffect(() => {
    if (value) {
      // First set all the form values
      formik.setFieldValue("tileName", value?.tileName || "");
      formik.setFieldValue("contentType", value?.contentType?.label || "");
      formik.setFieldValue("time", value?.time || "");
      formik.setFieldValue("points", value?.points || "");
      formik.setFieldValue("id", value?.id || "");
      formik.setFieldValue("description", value?.description || "");
      
      // Set content type state
      setContent(value?.contentType);
      
      // Clear content list before fetching new one
      setContentList([]);
      
      // Only fetch content list and set content if we have a content type
      if (value?.contentType?.label) {
        setContentLoading(true);
        const body = {
          page: 1,
          pageSize: 500,
          contentType: [value.contentType.label],
        };

        getContentList({
          body,
          setData: (data) => {
            setContentList(data || []);
            // Only set contentLibraryId after new list is loaded
            if (data && value?.contentLibraryId) {
              setContentLibraryId({
                name: value.contentLibraryId.name,
                id: value.contentLibraryId.contentLibraryId,
              });
              formik.setFieldValue(
                "contentLibraryId",
                value.contentLibraryId.contentLibraryId
              );
            }
            setContentLoading(false);
          },
          setLoading: setContentLoading,
        });
      }
    }
  }, [value]);

  return (
    <Box sx={{ width: 600 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          sx={{ fontSize: 20, fontFamily: roboto.style, fontWeight: 550 }}
        >
          Edit Roadmap Tile
        </Typography>
        <IconButton onClick={handleCloseModal}>
          <Close sx={{ fill: COLORS.PRIMARY }} />
        </IconButton>
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            sx={{
              ...loginTextField,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: formik.touched.tileName && formik.errors.tileName ? COLORS.ERROR : COLORS.PRIMARY,
                  borderWidth: 2,
                },
              },
            }}
            label={
              <Typography sx={{ fontFamily: roboto.style }}>
                Tile Name <span style={{ color: COLORS.ERROR }}>*</span>
              </Typography>
            }
            id="tileName"
            value={formik.values.tileName}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            error={formik.touched.tileName && Boolean(formik.errors.tileName)}
            helperText={formik.touched.tileName && formik.errors.tileName}
          />
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  ...loginTextField,
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: formik.touched.contentType && formik.errors.contentType ? COLORS.ERROR : COLORS.PRIMARY,
                      borderWidth: 2,
                    },
                  },
                }}
                label={
                  <Typography sx={{ fontFamily: roboto.style }}>
                    Select Content Type <span style={{ color: COLORS.ERROR }}>*</span>
                  </Typography>
                }
                error={formik.touched.contentType && Boolean(formik.errors.contentType)}
                helperText={formik.touched.contentType && formik.errors.contentType}
              />
            )}
            options={contentType}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box {...props}>
                <Typography sx={{ fontSize: 16, fontFamily: roboto.style }}>
                  {option.label}
                </Typography>
              </Box>
            )}
            value={content}
            onChange={(e, newValue) => handleChangeContentType(e, newValue, "contentType")}
            onBlur={() => formik.setFieldTouched("contentType", true)}
            loading={contentLoading}
          />
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  ...loginTextField,
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: formik.touched.contentLibraryId && formik.errors.contentLibraryId ? COLORS.ERROR : COLORS.PRIMARY,
                      borderWidth: 2,
                    },
                  },
                }}
                label={
                  <Typography sx={{ fontFamily: roboto.style }}>
                    Select Content <span style={{ color: COLORS.ERROR }}>*</span>
                  </Typography>
                }
                error={formik.touched.contentLibraryId && Boolean(formik.errors.contentLibraryId)}
                helperText={formik.touched.contentLibraryId && formik.errors.contentLibraryId}
              />
            )}
            options={contentList}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box {...props}>
                <Typography sx={{ fontSize: 16, fontFamily: roboto.style }}>
                  {option.name}
                </Typography>
              </Box>
            )}
            value={contentLibraryId}
            onChange={(e, newValue) => handleChangeContentType(e, newValue, "contentLibraryId")}
            onBlur={() => formik.setFieldTouched("contentLibraryId", true)}
          />
          <TextField
            label={
              <Typography sx={{ fontFamily: roboto.style }}>
                Time (1-180 minutes) <span style={{ color: COLORS.ERROR }}>*</span>
              </Typography>
            }
            sx={{
              ...loginTextField,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: formik.touched.time && formik.errors.time ? COLORS.ERROR : COLORS.PRIMARY,
                  borderWidth: 2,
                },
              },
            }}
            value={formik.values.time}
            id="time"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.time && Boolean(formik.errors.time)}
            helperText={formik.touched.time && formik.errors.time}
            inputProps={{ 
              inputMode: 'numeric',
              pattern: '[0-9]*'
            }}
          />
          <TextField
            label={
              <Typography sx={{ fontFamily: roboto.style }}>
                Coins (1-999) <span style={{ color: COLORS.ERROR }}>*</span>
              </Typography>
            }
            sx={{
              ...loginTextField,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: formik.touched.points && formik.errors.points ? COLORS.ERROR : COLORS.PRIMARY,
                  borderWidth: 2,
                },
              },
            }}
            value={formik.values.points}
            id="points"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.points && Boolean(formik.errors.points)}
            helperText={formik.touched.points && formik.errors.points}
            inputProps={{ 
              inputMode: 'numeric',
              pattern: '[0-9]*'
            }}
          />
          <TextField
            label={
              <Typography sx={{ fontFamily: roboto.style }}>
                Enter Tile Description <span style={{ color: COLORS.ERROR }}>*</span>
              </Typography>
            }
            sx={{
              ...loginTextField,
              "& .MuiOutlinedInput-input": {
                fontFamily: roboto.style,
              },
              "& .MuiOutlinedInput-root": {
                height: "200px",
                "&.Mui-focused fieldset": {
                  borderColor: formik.touched.description && formik.errors.description ? COLORS.ERROR : COLORS.PRIMARY,
                  borderWidth: 2,
                },
              },
              "& textarea": {
                height: "170px !important",
              },
            }}
            fullWidth
            value={formik.values.description}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            multiline
            id="description"
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Button
              sx={{
                fontSize: 16,
                fontFamily: roboto.style,
                backgroundColor: COLORS.PRIMARY,
                color: COLORS.WHITE,
                "&:hover": {
                  backgroundColor: COLORS.PRIMARY,
                  opacity: 0.9,
                },
                "&.Mui-disabled": {
                  backgroundColor: COLORS.PRIMARY,
                  opacity: 0.6,
                  color: COLORS.WHITE
                }
              }}
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loading
                  type="bars"
                  width={20}
                  height={20}
                  color={COLORS.BLACK}
                />
              ) : (
                "Submit"
              )}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default EditRoadmap;
