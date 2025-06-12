const { createSlice } = require("@reduxjs/toolkit");

let initialState = [
  {
    institution: "",
    degree: "",
    fieldOfStudy: "",
    year: "",
  },
];

const academicQualificationReducer = createSlice({
  name: "academicQualification",
  initialState,
  reducers: {
    addAcademicQualification: (state, action) => {
      state.push(action.payload);
    },
    removeAcademicQualification: (state, action) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { addAcademicQualification, removeAcademicQualification } =
  academicQualificationReducer.actions;

export default academicQualificationReducer.reducer;
