import { metaDataController } from "@/api/metaDataController";
import { getMetaDataType } from "@/assests/apiCalling/metaDataController";
import { data } from "@/assests/data";
import { setToast } from "@/redux/reducers/toast";
import { ROADMAP_STATUS, ToastStatus } from "@/utils/enum";
import { Divider, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CustomChip from "../customChip";
import {
  validateMetaDataTag,
  validateMetaDataType,
  validateRoadmapName,
  validateTile,
} from "./components/FormValidator";
import MetaDataSelector from "./components/MetaDataSelector";
import RoadmapForm from "./components/RoadmapForm";
import SubmitButton from "./components/SubmitButton";
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

  const metaTagTypeHandler = (e, newValue) => {
    setSelectedMetaDataType(newValue);
    setSelectedTags([]);
    setErrors((prev) => ({
      ...prev,
      metaDataType: "",
      metaDataTag: "",
    }));

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
      setState({
        ...state,
        metaDataType: newValue?.label,
        metaDataTag: [],
      });
    } else {
      setErrors((prev) => ({
        ...prev,
        metaDataType: "Please select a metadata type",
        metaDataTag: "Please select at least one metadata tag",
      }));
    }
  };

  const metaTagHandler = (e, newValue) => {
    setSelectedTags(newValue);
    setErrors((prev) => ({ ...prev, metaDataTag: "" }));

    if (newValue) {
      setState({ ...state, metaDataTag: newValue.map((val) => val.id) });
    } else {
      setErrors((prev) => ({
        ...prev,
        metaDataTag: "Please select at least one metadata tag",
      }));
    }
  };

  const inputHandler = (e) => {
    const { id, value } = e.target;
    setState((prev) => ({
      ...prev,
      [id]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [id]: validateRoadmapName(value),
    }));
  };

  const [loading, setLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const createRoadmap = (body) => {
    if (body.status === ROADMAP_STATUS.DRAFT) {
      setDraftLoading(true);
    } else {
      setLoading(true);
    }
    metaDataController
      .createRoadmapJourney(body)
      .then((res) => {
        setLoading(false);
        setDraftLoading(false);
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
        setDraftLoading(false);
      });
  };

  const validateAllFields = () => {
    const newErrors = {
      roadmapName: validateRoadmapName(state.roadmapName),
      metaDataType: validateMetaDataType(selectedMetaDataType),
      metaDataTag: validateMetaDataTag(selectedTags),
      tiles: tiles.map((tile) => validateTile(tile)),
    };

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors =
      newErrors.roadmapName ||
      newErrors.metaDataType ||
      newErrors.metaDataTag ||
      newErrors.tiles.some((tileErrors) => Object.keys(tileErrors).length > 0);

    return !hasErrors;
  };

  const submitHandler = (status) => {
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
      status: status,
    };

    createRoadmap(body);
  };

  return (
    <div>
      <Stack spacing={2}>
        <RoadmapForm
          label="Enter Roadmap Name"
          value={state.roadmapName}
          onChange={inputHandler}
          error={Boolean(errors.roadmapName)}
          helperText={errors.roadmapName}
          id="roadmapName"
        />

        <MetaDataSelector
          label="Select MetaData"
          options={data.METATDATA}
          value={selectedMetaDataType}
          onChange={metaTagTypeHandler}
          error={Boolean(errors.metaDataType)}
          helperText={errors.metaDataType}
        />

        <MetaDataSelector
          label="Select Tags"
          options={metaDataList}
          value={selectedTags}
          onChange={metaTagHandler}
          error={Boolean(errors.metaDataTag)}
          helperText={errors.metaDataTag}
          multiple
          loading={listLoading}
          getOptionLabel={(option) => option.name}
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

        <RoadmapTiles
          tiles={tiles}
          setTiles={setTiles}
          errors={errors.tiles}
          setErrors={(newTileErrors) =>
            setErrors((prev) => ({ ...prev, tiles: newTileErrors }))
          }
        />
      </Stack>
      <Divider sx={{ mt: 2 }} />

      <SubmitButton
        loading={loading}
        onClick={submitHandler}
        disabled={loading}
        draftLoading={draftLoading}
      />
    </div>
  );
};

export default Createroadmap;
