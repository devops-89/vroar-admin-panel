import { getContentList } from "@/assests/apiCalling/metaDataController";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { contentType } from "@/utils/genericArray";
import { loginTextField } from "@/utils/styles";
import { AddCircleOutline, DeleteOutlined, Edit } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  FormHelperText,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Add, Delete } from "@mui/icons-material";

const RoadmapTiles = ({ tiles, setTiles, errors, setErrors }) => {
  const [contentList, setContentList] = useState([]);
  const [contentLoading, setContentLoading] = useState(false);

  const handleChangeContentType = (e, newValue, id, index) => {
    if (id === "contentType") {
      setContentLoading(true);
      const newTiles = [...tiles];
      newTiles[index].contentType = newValue?.label;
      newTiles[index].contentLibraryId = null;
      setTiles(newTiles);

      // Clear errors for this field
      const newErrors = [...errors];
      if (newErrors[index]) {
        newErrors[index] = { ...newErrors[index], contentType: "" };
        setErrors(newErrors);
      }

      const type = [];
      type.push(newValue?.label);
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
      const newTiles = [...tiles];
      newTiles[index].contentLibraryId = newValue;
      setTiles(newTiles);

      // Clear errors for this field
      const newErrors = [...errors];
      if (newErrors[index]) {
        newErrors[index] = { ...newErrors[index], contentLibraryId: "" };
        setErrors(newErrors);
      }
    }
  };

  const handleInputChange = (e, index) => {
    const { id, value } = e.target;
    const newTiles = [...tiles];
    newTiles[index][id] = value;
    setTiles(newTiles);

    // Clear errors for this field
    const newErrors = [...errors];
    if (newErrors[index]) {
      newErrors[index] = { ...newErrors[index], [id]: "" };
      setErrors(newErrors);
    }
  };

  const addTile = () => {
    setTiles([
      ...tiles,
      {
        id: tiles.length + 1,
        tileName: "",
        contentType: "",
        contentLibraryId: "",
        time: "",
        points: "",
        description: "",
      },
    ]);
    setErrors([...errors, {}]);
  };

  const removeTile = (index) => {
    const newTiles = tiles.filter((_, i) => i !== index);
    setTiles(newTiles);
    const newErrors = errors.filter((_, i) => i !== index);
    setErrors(newErrors);
  };

  return (
    <Box>
      <Stack spacing={2}>
        {tiles.map((tile, index) => (
          <Box
            key={tile.id}
            sx={{
              p: 2,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              position: "relative",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography sx={{ fontSize: 16, fontFamily: roboto.style }}>
                Tile {index + 1}
              </Typography>
              {tiles.length > 1 && (
                <IconButton
                  onClick={() => removeTile(index)}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: COLORS.ERROR,
                  }}
                >
                  <Delete />
                </IconButton>
              )}
            </Stack>
            <Stack spacing={2}>
              <Box>
                <TextField
                  label="Tile Name"
                  sx={{
                    ...loginTextField,
                    "& .MuiOutlinedInput-input": {
                      fontFamily: roboto.style,
                    },
                  }}
                  fullWidth
                  id="tileName"
                  value={tile.tileName}
                  onChange={(e) => handleInputChange(e, index)}
                  error={Boolean(errors[index]?.tileName)}
                />
                {errors[index]?.tileName && (
                  <FormHelperText error sx={{ ml: 2 }}>
                    {errors[index].tileName}
                  </FormHelperText>
                )}
              </Box>

              <Box>
                <Autocomplete
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Content Type"
                      sx={{
                        ...loginTextField,
                        "& .MuiOutlinedInput-input": {
                          fontFamily: roboto.style,
                        },
                      }}
                      error={Boolean(errors[index]?.contentType)}
                    />
                  )}
                  options={contentType}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box {...props}>
                      <Typography
                        sx={{ fontSize: 16, fontFamily: roboto.style }}
                      >
                        {option.label}
                      </Typography>
                    </Box>
                  )}
                  value={
                    contentType.find((ct) => ct.label === tile.contentType) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleChangeContentType(e, newValue, "contentType", index)
                  }
                  loading={contentLoading}
                />
                {errors[index]?.contentType && (
                  <FormHelperText error sx={{ ml: 2 }}>
                    {errors[index].contentType}
                  </FormHelperText>
                )}
              </Box>

              <Box>
                <Autocomplete
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Content"
                      sx={{
                        ...loginTextField,
                        "& .MuiOutlinedInput-input": {
                          fontFamily: roboto.style,
                        },
                      }}
                      error={Boolean(errors[index]?.contentLibraryId)}
                    />
                  )}
                  options={contentList}
                  getOptionLabel={(option) => option?.name || ""}
                  renderOption={(props, option) => (
                    <Box {...props}>
                      <Typography
                        sx={{ fontSize: 16, fontFamily: roboto.style }}
                      >
                        {option.name}
                      </Typography>
                    </Box>
                  )}
                  value={
                    contentList.find(
                      (content) => content.id === tile.contentLibraryId?.id
                    ) || null
                  }
                  onChange={(e, newValue) =>
                    handleChangeContentType(
                      e,
                      newValue,
                      "contentLibraryId",
                      index
                    )
                  }
                />
                {errors[index]?.contentLibraryId && (
                  <FormHelperText error sx={{ ml: 2 }}>
                    {errors[index].contentLibraryId}
                  </FormHelperText>
                )}
              </Box>

              <Box>
                <TextField
                  label="Enter Time (in minutes)"
                  sx={{
                    ...loginTextField,
                    "& .MuiOutlinedInput-input": {
                      fontFamily: roboto.style,
                    },
                  }}
                  value={tile.time}
                  id="time"
                  onChange={(e) => handleInputChange(e, index)}
                  error={Boolean(errors[index]?.time)}
                  fullWidth
                  type="number"
                  inputProps={{
                    min: 1,
                    max: 180,
                    step: 1
                  }}
                />
                {errors[index]?.time && (
                  <FormHelperText error sx={{ ml: 2 }}>
                    {errors[index].time}
                  </FormHelperText>
                )}
              </Box>

              <Box>
                <TextField
                  label="Coins"
                  sx={{
                    ...loginTextField,
                    "& .MuiOutlinedInput-input": {
                      fontFamily: roboto.style,
                    },
                  }}
                  value={tile.points}
                  id="points"
                  onChange={(e) => handleInputChange(e, index)}
                  error={Boolean(errors[index]?.points)}
                  fullWidth
                  type="number"
                  inputProps={{
                    min: 1,
                    max: 999,
                    step: 1
                  }}
                />
                {errors[index]?.points && (
                  <FormHelperText error sx={{ ml: 2 }}>
                    {errors[index].points}
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
                  value={tile.description}
                  onChange={(e) => handleInputChange(e, index)}
                  multiline
                  id="description"
                  error={Boolean(errors[index]?.description)}
                />
                {errors[index]?.description && (
                  <FormHelperText error sx={{ ml: 2 }}>
                    {errors[index].description}
                  </FormHelperText>
                )}
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
      <Button
        startIcon={<Add />}
        onClick={addTile}
        sx={{
          mt: 2,
          color: COLORS.PRIMARY,
          fontFamily: roboto.style,
          textTransform: "none",
        }}
      >
        Add Tile
      </Button>
    </Box>
  );
};

export default RoadmapTiles;
