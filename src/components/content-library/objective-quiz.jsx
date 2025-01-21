import { COLORS } from "@/utils/enum";
import {
    closestCenter,
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {
    AddCircleOutlineOutlined
} from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import SortableItem from "./dnd";



const ObjectiveQuiz = () => {
  const [formArray, setFormArray] = useState([1, 2, 3, 4]);
  const [isDragging, setIsDragging] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
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
      const oldIndex = formArray.indexOf(active.id);
      const newIndex = formArray.indexOf(over.id);

      setFormArray((items) => arrayMove(items, oldIndex, newIndex));
    }

    setIsDragging(false);
  };

  const handleDelete = (id) => {
    setFormArray((prev) => prev.filter((item) => item !== id));
  };

  const handleAddQuestion = () => {
    if (formArray.length < 10) {
      setFormArray((prev) => [...prev, formArray.length + 1]);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={formArray} strategy={verticalListSortingStrategy}>
        <Box
          sx={{
            backgroundColor: "#EEEFF3",
            width: "100%",
            padding: "16px",
            borderRadius: 4,
          }}
        >
          {formArray.map((item, index) => (
            <SortableItem
              key={item}
              id={item}
              index={index}
              onDelete={handleDelete}
              canDelete={formArray.length > 1}
              isDragging={isDragging}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))}
          <Button
            onClick={handleAddQuestion}
            disabled={formArray.length >= 10}
            sx={{
              mt: 2,
              borderRadius: 2,
              border: "1px solid #000000",
              color: COLORS.BLACK,
            }}
            startIcon={<AddCircleOutlineOutlined />}
            fullWidth
          >
            Add Question
          </Button>
        </Box>
      </SortableContext>
    </DndContext>
  );
};

export default ObjectiveQuiz;
