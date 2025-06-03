import { COLORS, METADATA_TYPE } from "@/utils/enum";
import { loginTextField } from "@/utils/styles";
import { Stack } from "@mui/material";
import { ValidationTextField } from "../styled-components";
import MetaDataAutocomplete from "../metadataAutocomplete";

export const ContentForm = ({
  state,
  errors,
  onChange,
  onMetadataChange,
  disabled,
}) => {
  return (
    <>
      <ValidationTextField
        sx={{ ...loginTextField }}
        label="Description"
        multiline
        fullWidth
        id="description"
        onChange={onChange}
        value={state.description}
        focused={Boolean(state.description)}
        error={Boolean(errors.description)}
        helperText={errors.description}
        disabled={disabled}
      />

      <MetaDataAutocomplete
        label="Career"
        metaDataType={METADATA_TYPE.CAREER}
        value={state.career}
        onChange={(e, value) => onMetadataChange("career", value)}
        error={Boolean(errors.career)}
        helperText={errors.career}
        colors={{ bg: COLORS.PENDING, text: COLORS.PENDING_TEXT }}
        required
        disabled={disabled}
      />

      <MetaDataAutocomplete
        label="Industry"
        metaDataType={METADATA_TYPE.INDUSTRY}
        value={state.industry}
        onChange={(e, value) => onMetadataChange("industry", value)}
        error={Boolean(errors.industry)}
        helperText={errors.industry}
        colors={{ bg: COLORS.DONE, text: COLORS.DONE_TEXT }}
        required
        disabled={disabled}
      />

      <MetaDataAutocomplete
        label="Strengths"
        metaDataType={METADATA_TYPE.STRENGTHS}
        value={state.strengths}
        onChange={(e, value) => onMetadataChange("strengths", value)}
        error={Boolean(errors.strengths)}
        helperText={errors.strengths}
        colors={{ bg: COLORS.SIGNED_UP, text: COLORS.SIGNED_UP_TEXT }}
        required
        disabled={disabled}
      />

      <MetaDataAutocomplete
        label="Soft Skills"
        metaDataType={METADATA_TYPE.SOFT_SKILLS}
        value={state.softSkills}
        onChange={(e, value) => onMetadataChange("softSkills", value)}
        error={Boolean(errors.softSkills)}
        helperText={errors.softSkills}
        colors={{ bg: COLORS.PURPLE, text: COLORS.PURPLE_TEXT }}
        required
        disabled={disabled}
      />

      <ValidationTextField
        label="Add Name"
        fullWidth
        sx={{ ...loginTextField }}
        id="contentName"
        onChange={onChange}
        value={state.contentName}
        error={Boolean(errors.contentName)}
        helperText={errors.contentName}
        disabled={disabled}
      />
    </>
  );
}; 