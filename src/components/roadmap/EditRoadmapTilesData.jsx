import { getContentList } from "@/assests/apiCalling/metaDataController";
import AddRoadmapTile from "@/assests/modalCalling/metaData/AddroadmapTiles";
import EditRoadmap from "@/assests/modalCalling/metaData/EditRoadmap";
import { showModal } from "@/redux/reducers/modal";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { contentType } from "@/utils/genericArray";
import { loginTextField } from "@/utils/styles";
import { AddCircleOutline, DeleteOutlined, Edit } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";

const EditRoadmapTilesData = ({ tiles, setTiles, getRoadmapDetails }) => {
  const [contentList, setContentList] = useState({});
  const [contentLoading, setContentLoading] = useState(false);
  const dispatch = useDispatch();
  const handleInputChange = (id, field, value) => {
    setTiles((prevTiles) =>
      prevTiles.map((tile) =>
        tile.id === id ? { ...tile, [field]: value } : tile
      )
    );
  };

  const handleEditTile = (value, sequence) => {
    dispatch(
      showModal(
        <EditRoadmap
          value={value}
          sequence={sequence}
          getRoadmapDetails={getRoadmapDetails}
        />
      )
    );
  };

  const contentTypeHandler = (id, e, newValue) => {
    handleInputChange(id, "contentType", newValue);
    handleInputChange(id, "contentLibraryId", null);

    if (newValue) {
      const body = { page: 1, pageSize: 500, contentType: [newValue.label] };
      setContentLoading(true);
      getContentList({
        body,
        setData: (data) => {
          const filteredData = data.filter(
            (val) => val.contentType === newValue.label
          );
          setContentList((prev) => ({
            ...prev,
            [newValue.label]: filteredData,
          }));
          setContentLoading(false);
        },
        setLoading: setContentLoading,
      });
    }
  };

  const contentTagHandler = (id, e, newValue) => {
    handleInputChange(id, "contentLibraryId", newValue);
  };

  const addTile = (sequence) => {
    // setTiles((prev) => [
    //   ...prev,
    //   {
    //     id: prev.length + 1,
    //     tileName: "",
    //     contentType: null,
    //     contentLibraryId: null,
    //     time: "",
    //     points: "",
    //   },
    // ]);
    dispatch(
      showModal(
        <AddRoadmapTile
          sequence={tiles.length + 1}
          getRoadmapDetails={getRoadmapDetails}
        />
      )
    );
  };

  const handleDeleteTiles = (id) => {
    setTiles((prev) => prev.filter((q) => q.id !== id));
  };
  useEffect(() => {
    if (tiles.length > 0) {
      const uniqueContentTypes = [
        ...new Set(
          tiles.map((tile) => tile.contentType?.label).filter(Boolean)
        ),
      ];

      uniqueContentTypes.forEach((type) => {
        if (!contentList[type]) {
          const body = { page: 1, pageSize: 500, contentType: [type] };
          getContentList({
            body,
            setData: (data) => {
              setContentList((prev) => ({
                ...prev,
                [type]: data,
              }));
            },
            setLoading: setContentLoading,
          });
        }
      });
    }
  }, [tiles]);

  return (
    <div>
      {tiles.map((val, i) => (
        <Box key={val.id} sx={{ mt: 2 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ width: "100%" }}
          >
            <Typography sx={{ fontSize: 18, fontFamily: roboto.style }}>
              Tile {i + 1}
            </Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              {tiles.length > 1 && (
                <Button
                  endIcon={<DeleteOutlined />}
                  sx={{
                    color: COLORS.DANGER,
                    border: `1px solid ${COLORS.DANGER}`,
                    fontFamily: roboto.style,
                  }}
                  onClick={() => handleDeleteTiles(val.id)}
                >
                  Delete
                </Button>
              )}
              <Button
                endIcon={<FaRegEdit />}
                sx={{
                  fontFamily: roboto.style,
                  color: COLORS.DONE_TEXT,
                  border: `1px solid ${COLORS.DONE_TEXT}`,
                }}
                onClick={() => handleEditTile(val, i + 1)}
              >
                Edit
              </Button>
            </Stack>
          </Stack>

          <Stack alignItems={"center"} spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Enter Tile Name"
              sx={{
                ...loginTextField,
                "& .MuiOutlinedInput-input": {
                  fontFamily: roboto.style,
                },
              }}
              fullWidth
              value={val.tileName}
              onChange={(e) =>
                handleInputChange(val.id, "tileName", e.target.value)
              }
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />

            <Autocomplete
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    ...loginTextField,
                    "& .MuiOutlinedInput-input": {
                      fontFamily: roboto.style,
                    },
                  }}
                  label="Select Content Type"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              )}
              fullWidth
              options={contentType}
              renderOption={(props, option) => (
                <Box {...props}>
                  <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    {option.label}
                  </Typography>
                </Box>
              )}
              onChange={(e, newValue) =>
                contentTypeHandler(val.id, e, newValue)
              }
              value={val.contentType}
              filterSelectedOptions
            />

            <Autocomplete
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    ...loginTextField,
                    "& .MuiOutlinedInput-input": {
                      fontFamily: roboto.style,
                    },
                  }}
                  label="Select Content"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              )}
              fullWidth
              options={
                val.contentType?.label && contentList[val.contentType.label]
                  ? contentList[val.contentType.label]
                  : []
              }
              renderOption={(props, option) => (
                <Box {...props}>
                  <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    {option.name}
                  </Typography>
                </Box>
              )}
              onChange={(e, newValue) => contentTagHandler(val.id, e, newValue)}
              value={val.contentLibraryId || null}
              loading={contentLoading}
              getOptionLabel={(option) => option.name || ""}
              filterSelectedOptions
            />

            <TextField
              label="Enter Time (in minutes)"
              sx={{
                ...loginTextField,
                "& .MuiOutlinedInput-input": {
                  fontFamily: roboto.style,
                },
              }}
              type="number"
              fullWidth
              value={val.time}
              onChange={(e) =>
                handleInputChange(val.id, "time", e.target.value)
              }
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />

            <TextField
              label="Enter Points"
              sx={{
                ...loginTextField,
                "& .MuiOutlinedInput-input": {
                  fontFamily: roboto.style,
                },
              }}
              fullWidth
              value={val.points}
              onChange={(e) =>
                handleInputChange(val.id, "points", e.target.value)
              }
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
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
              value={val.description}
              onChange={(e) =>
                handleInputChange(val.id, "description", e.target.value)
              }
              multiline
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
          </Stack>
        </Box>
      ))}

      <Box sx={{ textAlign: "end" }}>
        <Button
          startIcon={<AddCircleOutline />}
          sx={{
            border: "1px solid #000",
            mt: 2,
            fontSize: 14,
            textTransform: "initial",
            fontFamily: roboto.style,
            color: COLORS.BLACK,
          }}
          onClick={addTile}
        >
          Add Another Tile
        </Button>
      </Box>
    </div>
  );
};

export default EditRoadmapTilesData;
