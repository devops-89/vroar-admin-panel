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
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  tileName: Yup.string()
    .required('Tile name is required')
    .test('no-leading-trailing-spaces', 'Tile name should not contain leading or trailing spaces', 
      value => value === value?.trim()),
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
      value => String(value) === String(value)?.trim()),
  points: Yup.number()
    .required('Coins are required')
    .min(1, 'Coins must be at least 1')
    .max(999, 'Coins cannot exceed 999')
    .integer('Coins must be a whole number')
    .test('no-leading-trailing-spaces', 'Coins should not contain leading or trailing spaces', 
      value => String(value) === String(value)?.trim()),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must contain at least 10 characters')
    .max(500, 'Description must not exceed 500 characters')
    .test('no-leading-trailing-spaces', 'Description should not contain leading or trailing spaces', 
      value => value === value?.trim()),
});

const AddRoadmapTile = ({ sequence, getRoadmapDetails }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // console.log("test", sequence);
  const { roadmapId } = router.query;
  const [content, setContent] = useState(null);
  const [contentList, setContentList] = useState([]);
  const [contentLibraryId, setContentLibraryId] = useState(null);
  const [contentLoading, setContentLoading] = useState(true);
  const formik = useFormik({
    initialValues: {
      tileName: "",
      contentType: "",
      contentLibraryId: "",
      time: "",
      points: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const body = {
        roadmapId: roadmapId,
        sequenceNo: sequence,
        tileName: values?.tileName?.trim(),
        time: String(values?.time),
        points: values.points,
        description: values.description?.trim(),
        contentLibraryId: values.contentLibraryId,
      };
      submitHandler(body);
    },
  });
  const [loading, setLoading] = useState(false);

  const submitHandler = (body) => {
    setLoading(true);
    metaDataController
      .addRoadmapTile(body)
      .then((res) => {
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
      setContentLoading(true);
      formik.setFieldValue(id, newValue?.label);
      setContent(newValue);
      setContentLibraryId(null);
      const type = [];
      type.push(newValue?.label);
      // console.log("type", type);
      const body = {
        page: 1,
        pageSize: 500,
        contentType: type,
      };
      getContentList({
        body,
        setData: setContentList,
        setLoading: setContentLoading,
      });
    }
    if (id === "contentLibraryId") {
      formik.setFieldValue(id, newValue?.id);
      setContentLibraryId(newValue);
    }
  };

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

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
          Add Roadmap Tile
        </Typography>
        <IconButton onClick={handleCloseModal}>
          <Close sx={{ fill: COLORS.PRIMARY }} />
        </IconButton>
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Box>
            <TextField
              sx={{ ...loginTextField }}
              label="Tile Name"
              id="tileName"
              value={formik.values.tileName}
              onChange={formik.handleChange}
              error={formik.touched.tileName && Boolean(formik.errors.tileName)}
              fullWidth
            />
            {formik.touched.tileName && formik.errors.tileName && (
              <FormHelperText error sx={{ ml: 2 }}>
                {formik.errors.tileName}
              </FormHelperText>
            )}
          </Box>

          <Box>
            <Autocomplete
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ ...loginTextField }}
                  label="Select Content Type"
                  error={formik.touched.contentType && Boolean(formik.errors.contentType)}
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
              onChange={(e, newValue) =>
                handleChangeContentType(e, newValue, "contentType")
              }
              loading={contentLoading}
            />
            {formik.touched.contentType && formik.errors.contentType && (
              <FormHelperText error sx={{ ml: 2 }}>
                {formik.errors.contentType}
              </FormHelperText>
            )}
          </Box>

          <Box>
            <Autocomplete
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ ...loginTextField }}
                  label="Select Content"
                  error={formik.touched.contentLibraryId && Boolean(formik.errors.contentLibraryId)}
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
              onChange={(e, newValue) =>
                handleChangeContentType(e, newValue, "contentLibraryId")
              }
            />
            {formik.touched.contentLibraryId && formik.errors.contentLibraryId && (
              <FormHelperText error sx={{ ml: 2 }}>
                {formik.errors.contentLibraryId}
              </FormHelperText>
            )}
          </Box>

          <Box>
            <TextField
              label="Enter Time (in minutes)"
              sx={{ ...loginTextField }}
              value={formik.values.time}
              id="time"
              onChange={formik.handleChange}
              error={formik.touched.time && Boolean(formik.errors.time)}
              type="number"
              inputProps={{
                min: 1,
                max: 180,
                step: 1
              }}
              fullWidth
            />
            {formik.touched.time && formik.errors.time && (
              <FormHelperText error sx={{ ml: 2 }}>
                {formik.errors.time}
              </FormHelperText>
            )}
          </Box>

          <Box>
            <TextField
              label="Coins"
              sx={{ ...loginTextField }}
              value={formik.values.points}
              id="points"
              onChange={formik.handleChange}
              error={formik.touched.points && Boolean(formik.errors.points)}
              type="number"
              inputProps={{
                min: 1,
                max: 999,
                step: 1
              }}
              fullWidth
            />
            {formik.touched.points && formik.errors.points && (
              <FormHelperText error sx={{ ml: 2 }}>
                {formik.errors.points}
              </FormHelperText>
            )}
          </Box>

          <Box>
            <TextField
              label="Enter Tile Description"
              sx={{
                ...loginTextField,
                "& .MuiOutlinedInput-input": {
                  fontFamily: roboto.style,
                },
                "& .MuiOutlinedInput-root": {
                  height: "200px",
                },
                "& textarea": {
                  height: "170px !important",
                },
              }}
              fullWidth
              value={formik.values.description}
              onChange={formik.handleChange}
              multiline
              id="description"
              error={formik.touched.description && Boolean(formik.errors.description)}
            />
            {formik.touched.description && formik.errors.description && (
              <FormHelperText error sx={{ ml: 2 }}>
                {formik.errors.description}
              </FormHelperText>
            )}
          </Box>

          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Button
              sx={{
                fontSize: 16,
                fontFamily: roboto.style,
                backgroundColor: COLORS.PRIMARY,
                color: COLORS.WHITE,
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

export default AddRoadmapTile;
