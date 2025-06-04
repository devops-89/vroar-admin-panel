import { metaDataController } from "@/api/metaDataController";
import { getMetaDataType } from "@/assests/apiCalling/metaDataController";
import { data } from "@/assests/data";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { roadmapValidationSchema } from "@/utils/validationSchema";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";
import CustomChip from "../customChip";
import EditRoadmapTilesData from "./EditRoadmapTilesData";
import moment from "moment";

const EditRoadmapTiles = () => {
  //   const router = useRouter();
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
  const [selectedMetaDataType, setSelectedMetaDataType] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [metaDataList, setMetaDataList] = useState([]);
  const [state, setState] = useState({
    roadmapName: "",
    metaDataType: "",
    metaDataTag: [],
  });
  const router = useRouter();
  const { roadmapId } = router.query;
  const [roadmapData, setRoadmapData] = useState(null);
  const getRoadmapDetails = (id) => {
    metaDataController
      .getRoadmapDetails(id)
      .then((res) => {
        const response = res.data.data;

        setRoadmapData(response);
        if (response) {
          setState({
            ...state,
            roadmapName: response.name,
            metaDataType: response.metadataTags[0]?.type,
            metaDataTag: response.metadataTags.map((val) => val.id),
          });
          setSelectedMetaDataType({ label: response.metadataTags[0].type });
          setSelectedTags(
            response.metadataTags.map((val) => ({
              name: val.name,
              id: val.id,
            }))
          );
          setTiles(
            response.roadmapSteps.map((val) => ({
              id: val.id,
              tileName: val.name,
              contentType: { label: val.content?.contentType },
              contentLibraryId: {
                name: val.content.name,
                contentLibraryId: val.content.id,
              },
              time: val.time,
              points: val.points,
              description: val.description,
            }))
          );
          const body = {
            page: 1,
            pageSize: 500,
            type: response.metadataTags[0].type,
          };
          getMetaDataType({
            body,
            setData: setMetaDataList,
            isLoading: setListLoading,
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
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
    // const transformedData = tiles.map(
    //   ({ id, contentType, contentLibraryId, ...rest }) => ({
    //     ...rest,

    //     contentLibraryId: contentLibraryId?.id || null,
    //   })
    // );

    // const body = {
    //   roadmapName: state.roadmapName,

    //   metadataIds: state.metaDataTag,
    //   tiles: transformedData,
    // };

    // roadmapValidationSchema
    //   .validate(body, { abortEarly: false })
    //   .then(() => {
    //     createRoadmap(body);
    //   })
    //   .catch((err) => {
    //     const errorMessages = err.inner.map((e) => e.message).join("\n");
    //     dispatch(
    //       setToast({
    //         open: true,
    //         message: errorMessages,
    //         severity: ToastStatus.ERROR,
    //       })
    //     );
    //   });
    router.back();
  };

  useEffect(() => {
    if (roadmapId) {
      getRoadmapDetails(roadmapId);
    }
  }, [roadmapId]);

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
          value={state.roadmapName}
          InputProps={{
            readOnly: true,
          }}
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
          disabled
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
          disabled
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
                  removable={false}
                />
              );
            })
          }
        />

        <EditRoadmapTilesData
          tiles={tiles}
          setTiles={setTiles}
          getRoadmapDetails={getRoadmapDetails}
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

export default EditRoadmapTiles;
