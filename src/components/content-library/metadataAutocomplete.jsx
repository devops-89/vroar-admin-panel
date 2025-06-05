import { metaDataController } from "@/api/metaDataController";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { USER_STATUS } from "@/utils/enum";
import { Close } from "@mui/icons-material";
import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const MetaDataAutocomplete = ({
  label,
  metaDataType,
  value,
  onChange,
  error,
  helperText,
  colors,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getMetaData = async (metaDataType, setData, setLoading) => {
    setLoading(true);
    try {
      const res = await metaDataController.getMetaData({
        page: 1,
        pageSize: 100,
        type: metaDataType,
        status: USER_STATUS.ACTIVE
      });
      setData(res.data.data.docs);
    } catch (err) {
      console.error("Error fetching metadata:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Autocomplete
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          sx={{
            ...loginTextField,
            "& .MuiOutlinedInput-input": {
              fontFamily: roboto.style,
            },
          }}
          error={Boolean(error)}
          helperText={helperText}
        />
      )}
      onChange={onChange}
      value={value}
      options={data}
      loading={loading}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box {...props}>
          <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
            {option.name}
          </Typography>
        </Box>
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          return (
            <Chip
              label={option.name}
              key={key}
              {...tagProps}
              sx={{
                "& ": {
                  backgroundColor: colors.bg,
                  color: colors.text,
                  fontFamily: roboto.style,
                },
                "& svg": {
                  color: `${colors.text} !important`,
                  fontSize: "20px !important",
                },
              }}
              deleteIcon={<Close />}
            />
          );
        })
      }
      multiple
      filterSelectedOptions
      onFocus={() => getMetaData(metaDataType, setData, setLoading)}
      fullWidth
    />
  );
};

export default MetaDataAutocomplete;
