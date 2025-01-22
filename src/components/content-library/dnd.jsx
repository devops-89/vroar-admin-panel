import { useSortable } from "@dnd-kit/sortable";
import { Delete, DragIndicator } from "@mui/icons-material";
import {
  Box,
  Collapse,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { roboto } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";
import { useState } from "react";
import { loginTextField } from "@/utils/styles";
import OptionBox from "./quiz-option/option";
const SortableItem = ({
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
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const isOpen = openIndex === index;

  const handleCollapseToggle = () => {
    setOpenIndex(isOpen ? null : index);
  };

  return (
    <Box ref={setNodeRef} style={style} {...attributes}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          sx={{ fontSize: 17, fontFamily: roboto.style, cursor: "pointer" }}
          onClick={handleCollapseToggle}
        >
          Question Number {index + 1}
        </Typography>
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
      <Collapse in={isOpen}>
        <TextField
          multiline
          label="Enter Question?"
          fullWidth
          sx={{
            ...loginTextField,
            mt: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor: COLORS.WHITE,
              "&.Mui-focused fieldset": {
                border: "1px solid #000",
              },
            },
          }}
        />

        <Box sx={{ mt: 3, p: 1 }}>
          <OptionBox />
        </Box>
      </Collapse>
    </Box>
  );
};

export default SortableItem;
