import { getContentList } from "@/assests/apiCalling/metaDataController";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { contentType } from "@/utils/genericArray";
import { loginTextField } from "@/utils/styles";
import { AddCircleOutline, DeleteOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const RoadmapTiles = ({ tiles, setTiles }) => {
  const [contentList, setContentList] = useState([]);
  const [contentLoading, setContentLoading] = useState(false);
  const handleInputChange = (id, field, value) => {
    setTiles((prevTiles) =>
      prevTiles.map((tile) =>
        tile.id === id ? { ...tile, [field]: value } : tile
      )
    );
  };

  const contentTypeHandler = (id, e, newValue) => {
    handleInputChange(id, "contentType", newValue);
    handleInputChange(id, "contentLibraryId", null);

    if (newValue) {
      const body = { page: 1, pageSize: 100 };
      setContentLoading(true);

      getContentList({
        body,
        setData: (data) => {
          const filteredData = data.filter(
            (val) => val.contentType === newValue.label
          );
          setContentList(filteredData);
          setContentLoading(false);
        },
        setLoading: setContentLoading,
      });
    }
  };

  const contentTagHandler = (id, e, newValue) => {
    handleInputChange(id, "contentLibraryId", newValue);
  };

  const addTile = () => {
    setTiles((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        tileName: "",
        contentType: null,
        contentLibraryId: null,
        time: "",
        points: "",
      },
    ]);
  };

  const handleDeleteTiles = (id) => {
    setTiles((prev) => prev.filter((q) => q.id !== id));
  };

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
                />
              )}
              fullWidth
              options={contentList}
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
              getOptionLabel={(option) => option.name}
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

export default RoadmapTiles;
