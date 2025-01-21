import { COLORS } from "@/utils/enum";
import { loginTextField } from "@/utils/styles";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CheckBox, Delete, DragIndicator } from "@mui/icons-material";
import {
  Box,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";

const SortableOption = ({
  id,
  index,
  onDelete,
  canDelete,
  isDragging,
  openIndex,
  setOpenIndex,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "10px",
    padding: "16px",
    backgroundColor: "#EEEFF3",
    borderRadius: "8px",
    // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <Box ref={setNodeRef} {...attributes} style={style}>
      <Stack direction={"row"} alignItems={"center"} spacing={2} sx={{ mb: 2 }}>
        <FormControlLabel control={<CheckBox sx={{ borderRadius: "50%" }} />} />
        <TextField
          label={`OPTION ${index + 1}`}
          fullWidth
          sx={{
            ...loginTextField,
            mt: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor: COLORS.WHITE,
              borderRadius: 2,
              "&.Mui-focused fieldset": {
                borderColor: COLORS.BLACK,
              },
            },
          }}
        />
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <IconButton
            {...listeners}
            sx={{
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            <DragIndicator htmlColor={COLORS.BLACK} />
          </IconButton>
          {canDelete && (
            <IconButton onClick={() => onDelete(id)} disa>
              <Delete htmlColor={COLORS.BLACK} />
            </IconButton>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default SortableOption;
