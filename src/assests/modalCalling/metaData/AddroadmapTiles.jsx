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
    onSubmit: (values) => {
  
      const body = {
        roadmapId: roadmapId,
        sequenceNo: sequence,
        tileName: values?.tileName,
        time: values?.time,
        points: values.points,
        description: values.description,
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
        setContentLoading(true)
      formik.setFieldValue(id, newValue?.label);
      setContent(newValue);
      setContentLibraryId(null);
      const type = [];
      type.push = newValue?.label;
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
          <TextField
            sx={{ ...loginTextField }}
            label="Tile Name"
            id="tileName"
            value={formik.values.tileName}
            onChange={formik.handleChange}
          />
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ ...loginTextField }}
                label="Select Content Type"
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
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ ...loginTextField }}
                label="Select Content"
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
          <TextField
            label="Enter Time (in minutes)"
            sx={{ ...loginTextField }}
            value={formik.values.time}
            id="time"
            onChange={formik.handleChange}
          />
          <TextField
            label="Coins"
            sx={{ ...loginTextField }}
            value={formik.values.points}
            id="points"
            onChange={formik.handleChange}
          />
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
          />
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
