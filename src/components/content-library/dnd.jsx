import {
  Box,
  Collapse,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Delete, DragIndicator, WidthFull } from "@mui/icons-material";
import OptionBox from "./quiz-option/option";
import { loginTextField } from "@/utils/styles";

const SortableItem = ({
  id,
  index,
  question,
  onDelete,
  onQuestionChange,
  onOptionsChange,
  openIndex,
  setOpenIndex,
  canDelete,
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

  return (
    <Box ref={setNodeRef} style={style} {...attributes}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Typography
          sx={{ fontSize: 17, cursor: "pointer" }}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          Question {index + 1}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton {...listeners}>
            <DragIndicator />
          </IconButton>
          {canDelete && (
            <IconButton onClick={() => onDelete(id)}>
              <Delete />
            </IconButton>
          )}
        </Stack>
      </Stack>

      <Collapse in={openIndex === index}>
        <TextField
          multiline
          fullWidth
          label="Enter Question"
          value={question.question}
          onChange={(e) => onQuestionChange(id, e.target.value)}
          sx={{ mt: 2, ...loginTextField }}
        />

        <Box sx={{ mt: 3, p: 1 }}>
          <OptionBox
            options={question.options}
            onOptionsChange={(newOptions) => onOptionsChange(id, newOptions)}
          />
        </Box>
      </Collapse>
    </Box>
  );
};

export default SortableItem;
