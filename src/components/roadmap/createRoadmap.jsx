import { getMetaDataType } from "@/assests/apiCalling/metaDataController";
import { data } from "@/assests/data";
import { COLORS, METADATA_TYPE, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import RoadmapTiles from "./roadmapTiles";
import { metaDataController } from "@/api/metaDataController";
import { useDispatch } from "react-redux";
import { setToast } from "@/redux/reducers/toast";
import Loading from "react-loading";
import { roadmapValidationSchema } from "@/utils/validationSchema";
import { useRouter } from "next/router";
import CustomChip from "../customChip";

const Createroadmap = () => {
  const [tiles, setTiles] = useState([
    {
      id: 1,
      tileName: "",
      contentType: "",
      contentLibraryId: "",
      time: "",
      points: "",
      description: "",
    },
  ]);
  const [state, setState] = useState({
    roadmapName: "",
    metaDataType: "",
    metaDataTag: [],
  });
  const router = useRouter();
  const [selectedMetaDataType, setSelectedMetaDataType] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [metaDataList, setMetaDataList] = useState([]);
  const metaTagTypeHandler = (e, newValue) => {
    setSelectedMetaDataType(newValue);
    if (newValue) {
      const body = {
        page: 1,
        pageSize: 100,
        type: newValue?.label,
      };
      setMetaDataList([]);

      getMetaDataType({
        body,
        setData: setMetaDataList,
        isLoading: setListLoading,
      });
      setState({ ...state, metaDataType: newValue?.label });
    }
  };

  const metaTagHandler = (e, newValue) => {
    setSelectedTags(newValue);

    if (newValue) {
      setState({ ...state, metaDataTag: newValue.map((val) => val.id) });
    }
  };
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
  };
  const [loading, setLoading] = useState(false);
  const createRoadmap = (body) => {
    setLoading(true);
    metaDataController
      .createRoadmapJourney(body)
      .then((res) => {
        console.log("res", res);
        setLoading(false);
        dispatch(
          setToast({
            open: true,
            message: res.data.message,
            severity: ToastStatus.SUCCESS,
          })
        );
        setLoading(false);
        router.back();
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

  const submitHandler = () => {
    const transformedData = tiles.map(
      ({ id, contentType, contentLibraryId, ...rest }) => ({
        ...rest,

        contentLibraryId: contentLibraryId?.id || null,
      })
    );

    const body = {
      roadmapName: state.roadmapName,

      metadataIds: state.metaDataTag,
      tiles: transformedData,
    };

    roadmapValidationSchema
      .validate(body, { abortEarly: false })
      .then(() => {
        createRoadmap(body);
      })
      .catch((err) => {
        const errorMessages = err.inner.map((e) => e.message).join("\n");
        dispatch(
          setToast({
            open: true,
            message: errorMessages,
            severity: ToastStatus.ERROR,
          })
        );
      });
  };

  return (
    <div>
      <Stack spacing={2}>
        <TextField
          label="Enter Roadmap Name"
          sx={{
            ...loginTextField,
            "& .MuiOutlinedInput-input": {
              fontFamily: roboto.style,
            },
          }}
          fullWidth
          id="roadmapName"
          onChange={inputHandler}
        />
        <Autocomplete
          renderInput={(params) => (
            <TextField
              label="Select MetaData"
              sx={{
                ...loginTextField,
                "& .MuiOutlinedInput-input": {
                  fontFamily: roboto.style,
                },
              }}
              {...params}
            />
          )}
          options={data.METATDATA}
          renderOption={(props, option) => (
            <Box {...props}>
              <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                {option.label}
              </Typography>
            </Box>
          )}
          fullWidth
          onChange={metaTagTypeHandler}
          value={selectedMetaDataType}
        />
        <Autocomplete
          renderInput={(params) => (
            <TextField
              label="Select Tags"
              sx={{
                ...loginTextField,
                "& .MuiOutlinedInput-input": {
                  fontFamily: roboto.style,
                },
              }}
              {...params}
            />
          )}
          options={metaDataList}
          renderOption={(props, option) => (
            <Box {...props}>
              <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                {option.name}
              </Typography>
            </Box>
          )}
          fullWidth
          loading={listLoading}
          onChange={metaTagHandler}
          getOptionLabel={(option) => option.name}
          value={selectedTags}
          multiple
          filterSelectedOptions
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <CustomChip
                  variant={selectedMetaDataType.label}
                  label={option.name}
                  onDelete={() => {
                    setSelectedTags((tags) =>
                      tags.filter((tag) => tag.id !== option.id)
                    );
                  }}
                  key={key}
                  {...tagProps}
                  removable={true}
                />
              );
            })
          }
        />

        <RoadmapTiles tiles={tiles} setTiles={setTiles} />
      </Stack>
      <Divider sx={{ mt: 2 }} />
      <Box sx={{ textAlign: "end" }}>
        <Button
          sx={{
            fontSize: 14,
            backgroundColor: COLORS.PRIMARY,
            color: COLORS.WHITE,
            fontFamily: roboto.style,
            mt: 2,
            width: 120,
          }}
          onClick={submitHandler}
          disabled={loading}
        >
          {loading ? (
            <Loading type="bars" width={20} height={20} color={COLORS.BLACK} />
          ) : (
            "Proceed"
          )}
        </Button>
      </Box>
    </div>
  );
};

export default Createroadmap;
