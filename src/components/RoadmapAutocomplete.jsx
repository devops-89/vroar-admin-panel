import { METADATA_TYPE } from "@/utils/enum";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import CustomChip from "./customChip";

const RoadmapAutocomplete = ({ journeyData, formik, loginTextField }) => {
  // State hooks
  const [career, setCareer] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [strength, setStrength] = useState([]);
  const [softSkill, setSoftSkill] = useState([]);

  // Helper: Filter roadmap journeys by metadata type
  const filterJourneysByMetadataType = (type) =>
    journeyData?.roadmapJourneys.filter((journey) =>
      journey.metadataTags?.some((tag) => tag.type === type)
    ) || [];

  const metadataFields = [
    {
      label: "Career",
      type: METADATA_TYPE.CAREER,
      value: career,
      setValue: setCareer,
      formikField: "careerRoadmap",
    },
    {
      label: "Industry",
      type: METADATA_TYPE.INDUSTRY,
      value: industry,
      setValue: setIndustry,
      formikField: "industryRoadmap",
    },
    {
      label: "Strength",
      type: METADATA_TYPE.STRENGTH,
      value: strength,
      setValue: setStrength,
      formikField: "strengthRoadmap",
    },
    {
      label: "Soft Skills",
      type: METADATA_TYPE.SOFTSKILL,
      value: softSkill,
      setValue: setSoftSkill,
      formikField: "softSkillRoadmap",
    },
  ];

  return (
    <>
      {metadataFields.map((field) => {
        const options = filterJourneysByMetadataType(field.type);

        return (
          <Autocomplete
            key={field.type}
            multiple
            options={options}
            getOptionLabel={(option) => option.name}
            value={field.value}
            onChange={(e, value) => {
              field.setValue(value);
              formik.setFieldValue(
                field.formikField,
                value.map((val) => val.id)
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`Select ${field.label}`}
                sx={{ ...loginTextField }}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <CustomChip
                    key={key}
                    label={option.name}
                    variant={field.type}
                    removable
                    onDelete={() => {
                      const newValues = field.value.filter(
                        (_, i) => i !== index
                      );
                      field.setValue(newValues);
                      formik.setFieldValue(
                        field.formikField,
                        newValues.map((val) => val.id)
                      );
                    }}
                    {...tagProps}
                  />
                );
              })
            }
            sx={{ mb: 2 }}
          />
        );
      })}
    </>
  );
};

export default RoadmapAutocomplete;
