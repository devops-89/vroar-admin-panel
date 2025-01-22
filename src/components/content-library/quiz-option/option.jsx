import { COLORS } from "@/utils/enum";
import { loginTextField } from "@/utils/styles";
import { SortableContext } from "@dnd-kit/sortable";
import { Delete, DragIndicator } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import SortableOption from "./sortableOption";
const OptionBox = () => {
  const [optionArray, setOptionArray] = useState([1, 2, 3, 4]);
  const [isDragging, setIsDragging] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = optionArray.indexOf(active.id);
      const newIndex = optionArray.indexOf(over.id);

      setOptionArray((items) => arrayMove(items, oldIndex, newIndex));
    }

    setIsDragging(false);
  };

  const handleDelete = (id) => {
    setOptionArray((prev) => prev.filter((item) => item !== id));
  };

  const handleAddQuestion = () => {
    if (formArray.length < 10) {
      setOptionArray((prev) => [...prev, formArray.length + 1]);
    }
  };
  return (
    <div>
      {/* <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={optionArray}></SortableContext>
      </DndContext> */}

      {optionArray.map((item, index) => (
        <Box>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            sx={{ mb: 2 }}
          >
            <FormControlLabel
              control={<Checkbox sx={{ borderRadius: "50%" }} />}
            />
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
                    border: "1px solid #000",
                  },
                },
              }}
            />
          </Stack>
        </Box>
      ))}
    </div>
  );
};

export default OptionBox;
