import { getMetaDataType } from "@/assests/apiCalling/metaDataController";
import { data } from "@/assests/data";
import { COLORS, METADATA_TYPE } from "@/utils/enum";
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

const Createroadmap = () => {
  const [tiles, setTiles] = useState([
    {
      id: 1,
      tileName: "",
      contentType: "",
      contentLibraryId: "",
      time: "",
      points: "",
    },
  ]);
  const [state, setState] = useState({
    roadmapName: "",
    metaDataType: "",
    metaDataTag: [],
  });

  const [selectedMetaDataType, setSelectedMetaDataType] = useState(null);
  const [selectedTags, setSelectedTags] = useState(null);
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
      setState({ ...state, metaDataTag: newValue?.id });
    }
  };

  const inputHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
  };

  const submitHandler = () => {
    const transformedData = tiles.map(
      ({ id, contentType, contentLibraryId, ...rest }) => ({
        ...rest,
        contentType: contentType?.label || null,
        contentLibraryId: contentLibraryId?.id || null,
      })
    );

    const body = {
      roadmapName: state.roadmapName,
      metaDataType: state.metaDataType,
      metaDataIds: state.metaDataTag,
      tiles: transformedData,
    };
    console.log("state", body);
  };

  // console.log("tabvke", metaDataList);

  return (
    <div>
      <Stack spacing={2}>
        <TextField
          label="Enter Roadmap Name"
          sx={{ ...loginTextField }}
          fullWidth
          id="roadmapName"
          onChange={inputHandler}
        />
        <Autocomplete
          renderInput={(params) => (
            <TextField
              label="Select MetaData"
              sx={{ ...loginTextField }}
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
              sx={{ ...loginTextField }}
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
        >
          Proceed
        </Button>
      </Box>
    </div>
  );
};

export default Createroadmap;
