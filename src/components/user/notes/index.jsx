import { data } from "@/assests/data";
import TabPanel from "@/components/tabPanel";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import InitialAssessment from "./initial-assessment";
import GSPResults from "./gspResults";
import Strengths from "./strengths";
import SelectedPaths from "./selectedPaths";
import SkillsAssessment from "./skillsAssesment";

const Notes = () => {
  const [value, setValue] = useState(0);

  const handleTabChangeHandler = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Tabs
        onChange={handleTabChangeHandler}
        value={value}
        sx={{
          "& .MuiTab-root": {
            border: "1px solid #000",
            borderRadius: 3,
            mx: 0.5,
            color: COLORS.BLACK,
          },
          "& .MuiTabs-indicator": {
            display: "none",
          },
          "& .Mui-selected": {
            color: COLORS.PRIMARY,
            border: `1px solid ${COLORS.PRIMARY}`,
          },
        }}
      >
        {data.ASSESSMENT_DATA.map((val, i) => (
          <Tab
            label={
              <Typography
                sx={{ fontSize: 14, fontFamily: roboto.style, fontWeight: 550 }}
              >
                {val.label}
              </Typography>
            }
            key={i}
          />
        ))}
      </Tabs>
      <TabPanel value={value} index={0}>
        <InitialAssessment />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SkillsAssessment />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GSPResults />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Strengths />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <SelectedPaths />
      </TabPanel>
    </div>
  );
};

export default Notes;
