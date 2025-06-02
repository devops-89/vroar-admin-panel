import { metaDataController } from "@/api/metaDataController";
import { getMetaDataType } from "@/assests/apiCalling/metaDataController";
import { data } from "@/assests/data";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";
import CustomChip from "../customChip";
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
      description: "",
    },
  ]);
  const [state, setState] = useState({
    roadmapName: "",
    metaDataType: "",
    metaDataTag: [],
  });
  const [errors, setErrors] = useState({
    roadmapName: "",
    metaDataType: "",
    metaDataTag: "",
    tiles: [],
  });

  const router = useRouter();
  const [selectedMetaDataType, setSelectedMetaDataType] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [metaDataList, setMetaDataList] = useState([]);
  const dispatch = useDispatch();

  const validateRoadmapName = (value) => {
    if (!value || value.trim() === "") {
      return "Roadmap name is required";
    }
    // Allow spaces between words but not at start/end
    if (value !== value.trim()) {
      return "Roadmap name should not contain leading or trailing spaces";
    }
    return "";
  };

  const validateMetaDataType = (value) => {
    if (!value) {
      return "Please select a metadata type";
    }
    return "";
  };

  const validateMetaDataTag = (value) => {
    if (!value || value.length === 0) {
      return "Please select at least one metadata tag";
    }
    return "";
  };

  const validateTile = (tile) => {
    const tileErrors = {};
    
    // Validate tile name
    if (!tile.tileName || tile.tileName.trim() === "") {
      tileErrors.tileName = "Tile name is required";
    } else if (tile.tileName !== tile.tileName.trim()) {
      tileErrors.tileName = "Tile name should not contain leading or trailing spaces";
    }

    // Validate content type
    if (!tile.contentType) {
      tileErrors.contentType = "Please select a content type";
    }

    // Validate content
    if (!tile.contentLibraryId) {
      tileErrors.contentLibraryId = "Please select content";
    }

    // Validate points (coins)
    if (!tile.points) {
      tileErrors.points = "Coins are required";
    } else {
      const points = parseInt(tile.points);
      if (isNaN(points)) {
        tileErrors.points = "Coins must be a number";
      } else if (points < 1) {
        tileErrors.points = "Coins must be at least 1";
      } else if (points > 999) {
        tileErrors.points = "Coins cannot exceed 999";
      } else if (!Number.isInteger(points)) {
        tileErrors.points = "Coins must be a whole number";
      } else if (tile.points !== tile.points.trim()) {
        tileErrors.points = "Coins should not contain leading or trailing spaces";
      }
    }

    // Validate time
    if (!tile.time) {
      tileErrors.time = "Time is required";
    } else {
      const time = parseInt(tile.time);
      if (isNaN(time)) {
        tileErrors.time = "Time must be a number";
      } else if (time < 1) {
        tileErrors.time = "Time must be at least 1 minute";
      } else if (time > 180) {
        tileErrors.time = "Time cannot exceed 180 minutes (3 hours)";
      } else if (!Number.isInteger(time)) {
        tileErrors.time = "Time must be a whole number";
      } else if (tile.time !== tile.time.trim()) {
        tileErrors.time = "Time should not contain leading or trailing spaces";
      }
    }

    // Validate description
    if (!tile.description || tile.description.trim() === "") {
      tileErrors.description = "Description is required";
    } else {
      const trimmedDescription = tile.description.trim();
      const charCount = trimmedDescription.length;
      
      if (charCount < 10) {
        tileErrors.description = "Description must contain at least 10 characters";
      } else if (charCount > 500) {
        tileErrors.description = "Description must not exceed 500 characters";
      }
    }

    return tileErrors;
  };

  const metaTagTypeHandler = (e, newValue) => {
    setSelectedMetaDataType(newValue);
    if (newValue) {
      const body = {
        page: 1,
        pageSize: 500,
        type: newValue?.label,
      };
      setMetaDataList([]);
      setErrors(prev => ({ ...prev, metaDataType: "" }));

      getMetaDataType({
        body,
        setData: setMetaDataList,
        isLoading: setListLoading,
      });
      setState({ ...state, metaDataType: newValue?.label });
    } else {
      setErrors(prev => ({ ...prev, metaDataType: "Please select a metadata type" }));
    }
  };

  const metaTagHandler = (e, newValue) => {
    setSelectedTags(newValue);
    setErrors(prev => ({ ...prev, metaDataTag: "" }));

    if (newValue) {
      setState({ ...state, metaDataTag: newValue.map((val) => val.id) });
    } else {
      setErrors(prev => ({ ...prev, metaDataTag: "Please select at least one metadata tag" }));
    }
  };

  const inputHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    setErrors(prev => ({ ...prev, [id]: validateRoadmapName(value) }));
  };

  const [loading, setLoading] = useState(false);

  const createRoadmap = (body) => {
    setLoading(true);
    metaDataController
      .createRoadmapJourney(body)
      .then((res) => {
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

  const validateAllFields = () => {
    const newErrors = {
      roadmapName: validateRoadmapName(state.roadmapName),
      metaDataType: validateMetaDataType(selectedMetaDataType),
      metaDataTag: validateMetaDataTag(selectedTags),
      tiles: tiles.map(tile => validateTile(tile))
    };

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = 
      newErrors.roadmapName || 
      newErrors.metaDataType || 
      newErrors.metaDataTag || 
      newErrors.tiles.some(tileErrors => Object.keys(tileErrors).length > 0);

    return !hasErrors;
  };

  const submitHandler = () => {
    if (!validateAllFields()) {
      dispatch(
        setToast({
          open: true,
          message: "Please fix all validation errors before proceeding",
          severity: ToastStatus.ERROR,
        })
      );
      return;
    }

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

    createRoadmap(body);
  };

  return (
    <div>
      <Stack spacing={2}>
        <Box>
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
            error={Boolean(errors.roadmapName)}
          />
          {errors.roadmapName && (
            <FormHelperText error sx={{ ml: 2 }}>
              {errors.roadmapName}
            </FormHelperText>
          )}
        </Box>

        <Box>
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
                error={Boolean(errors.metaDataType)}
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
          {errors.metaDataType && (
            <FormHelperText error sx={{ ml: 2 }}>
              {errors.metaDataType}
            </FormHelperText>
          )}
        </Box>

        <Box>
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
                error={Boolean(errors.metaDataTag)}
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
          {errors.metaDataTag && (
            <FormHelperText error sx={{ ml: 2 }}>
              {errors.metaDataTag}
            </FormHelperText>
          )}
        </Box>

        <RoadmapTiles 
          tiles={tiles} 
          setTiles={setTiles} 
          errors={errors.tiles}
          setErrors={(newTileErrors) => setErrors(prev => ({ ...prev, tiles: newTileErrors }))}
        />
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
