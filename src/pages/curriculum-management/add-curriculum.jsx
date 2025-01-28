import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  FormHelperText,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import dynamic from "next/dynamic";
import ToastBar from "@/components/toastBar";
import Wrapper from "@/components/wrapper";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddCurriculum = () => {
  const validationSchema = Yup.object({
    curriculumTitle: Yup.string().required("Curriculum Title is required"),
    modules: Yup.array().of(
      Yup.object({
        title: Yup.string().required("Module Title is required"),
        url: Yup.string().required("URL is required"),
        content: Yup.string().required("Content is required"),
      })
    ),
  });

  const [formValues, setFormValues] = useState({
    curriculumTitle: "",
    modules: [{ title: "", url: "", content: "" }],
  });

  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
    enableReinitialize: true,
  });

  const handleAddModule = () => {
    if (formik.values.modules.length < 10) {
      const updatedModules = [
        ...formik.values.modules,
        { title: "", url: "", content: "" },
      ];
      formik.setFieldValue("modules", updatedModules);
    }
  };

  const handleDeleteModule = (index) => {
    const updatedModules = formik.values.modules.filter((_, i) => i !== index);
    formik.setFieldValue("modules", updatedModules);
  };

  return (
    <Wrapper>
      <Card sx={{ p: 3 }}>
        <Stack direction="row" alignItems={"center"} spacing={2}>
          <Box
            sx={{ background: COLORS.linearGradient, width: 20, height: 20 }}
          ></Box>
          <Typography
            fontSize={20}
            fontWeight={600}
            color="#000"
            sx={{ fontFamily: roboto.style }}
          >
            Add Curriculum
          </Typography>
        </Stack>

        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: 12, color: "#ff0000" }}>
            * Indicates Required
          </Typography>
          <Grid2 container spacing={4} mt={3}>
            <Grid2 size={12}>
              <TextField
                label="Curriculum Title*"
                fullWidth
                sx={{ ...loginTextField }}
                value={formik.values.curriculumTitle}
                onChange={(e) =>
                  formik.setFieldValue("curriculumTitle", e.target.value)
                }
                error={
                  formik.touched.curriculumTitle &&
                  !!formik.errors.curriculumTitle
                }
                helperText={
                  formik.touched.curriculumTitle &&
                  formik.errors.curriculumTitle
                }
              />
            </Grid2>
          </Grid2>

          {formik.values.modules.map((module, index) => (
            <Grid2 container spacing={2} mt={7} key={index}>
              <Grid2 size={12}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography sx={{ fontFamily: roboto.style, fontSize: 20 }}>
                    Module {index + 1}
                  </Typography>
                  {formik.values.modules.length > 1 && (
                    <Button
                      endIcon={<Delete />}
                      onClick={() => handleDeleteModule(index)}
                      sx={{
                        fontFamily: roboto.style,
                        fontSize: 14,
                        color: COLORS.DANGER,
                        border: `1px solid ${COLORS.DANGER}`,
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </Stack>
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  label="Module title*"
                  fullWidth
                  sx={{ ...loginTextField }}
                  value={module.title}
                  onChange={(e) =>
                    formik.setFieldValue(
                      `modules[${index}].title`,
                      e.target.value
                    )
                  }
                  error={
                    formik.touched.modules?.[index]?.title &&
                    !!formik.errors.modules?.[index]?.title
                  }
                  helperText={
                    formik.touched.modules?.[index]?.title &&
                    formik.errors.modules?.[index]?.title
                  }
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  label="Url*"
                  fullWidth
                  sx={{ ...loginTextField }}
                  value={module.url}
                  onChange={(e) =>
                    formik.setFieldValue(
                      `modules[${index}].url`,
                      e.target.value
                    )
                  }
                  error={
                    formik.touched.modules?.[index]?.url &&
                    !!formik.errors.modules?.[index]?.url
                  }
                  helperText={
                    formik.touched.modules?.[index]?.url &&
                    formik.errors.modules?.[index]?.url
                  }
                />
              </Grid2>
              <Grid2 size={12}>
                <ReactQuill
                  style={{ height: 150 }}
                  value={module.content}
                  onChange={(value) =>
                    formik.setFieldValue(`modules[${index}].content`, value)
                  }
                />
                {formik.touched.modules?.[index]?.content &&
                  formik.errors.modules?.[index]?.content && (
                    <FormHelperText sx={{ mt: 6, color: COLORS.DANGER }}>
                      {formik.touched.modules?.[index]?.content &&
                        formik.errors.modules?.[index]?.content}
                    </FormHelperText>
                  )}
              </Grid2>
            </Grid2>
          ))}
          {formik.values.modules.length < 10 && (
            <Grid2 size={12} textAlign={"end"}>
              <Button
                sx={{
                  mt: 4,
                  color: COLORS.BLACK,
                  border: `1px solid ${COLORS.BLACK}`,
                  fontSize: 14,
                  fontFamily: roboto.style,
                  mt: 8,
                }}
                startIcon={<AddCircleOutline />}
                onClick={handleAddModule}
              >
                Add Modules
              </Button>
            </Grid2>
          )}
          <Grid2 item xs={12} textAlign={"end"}>
            <Button
              sx={{
                mt: formik.values.modules.length < 10 ? 4 : 10,
                background: COLORS.linearGradient,
                color: "#fff",
                fontSize: 16,
                fontFamily: roboto.style,
              }}
              onClick={formik.handleSubmit}
            >
              Submit Curriculum
            </Button>
          </Grid2>
          <ToastBar />
        </Box>
      </Card>
    </Wrapper>
  );
};

export default AddCurriculum;
