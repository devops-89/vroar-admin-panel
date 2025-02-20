import { getMetaDataType } from "@/assests/apiCalling/metaDataController";
import { data } from "@/assests/data";
import { METADATA_TYPE } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import RoadmapTiles from "./roadmapTiles";

const Createroadmap = () => {
  const formik = useFormik({
    initialValues: {
      roadmapName: "",
      metaDataType: "",
      metaDataTag: "",
    },
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
    }
  };

  const metaTagHandler = (e, newValue) => {
    setSelectedTags(newValue);
    console.log("test", newValue);
  };

  // console.log("tabvke", metaDataList);

  return (
    <div>
      <Stack spacing={2}>
        <TextField
          label="Enter Roadmap Name"
          sx={{ ...loginTextField }}
          fullWidth
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

        <RoadmapTiles />
      </Stack>
    </div>
  );
};

export default Createroadmap;
