import { metaDataController } from "@/api/metaDataController";
import { data } from "@/assests/data";
import AddMetaData from "@/assests/modalCalling/metaData/addMetaData";
import {
  CAREERDATA,
  INDUSTRYDATA,
  SOFTSKILLSDATA,
  STRENGTHDATA,
} from "@/assests/roadmapData";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import MetaData from "@/components/roadmap/metaData";
import TabPanel from "@/components/tabPanel";
import Wrapper from "@/components/wrapper";
import { showModal } from "@/redux/reducers/modal";
import { COLORS, METADATA_TYPE } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { AddCircle } from "@mui/icons-material";
import { Box, Button, Card, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Metadata = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const [metaData, setMetaData] = useState(CAREERDATA);
  const [metaDataType, setMetaDataType] = useState(METADATA_TYPE.CAREER);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const tabChangeHandler = (e, newValue) => {
    setValue(newValue);
    const text = e.target.textContent;
    if (text === METADATA_TYPE.CAREER) {
      setMetaData(CAREERDATA);
      setMetaDataType(METADATA_TYPE.CAREER);
    }
    if (text === METADATA_TYPE.INDUSTRY) {
      setMetaData(INDUSTRYDATA);
      setMetaDataType(METADATA_TYPE.INDUSTRY);
    }
    if (text === METADATA_TYPE.SOFT_SKILLS) {
      setMetaData(SOFTSKILLSDATA);
      setMetaDataType(METADATA_TYPE.SOFT_SKILLS);
    }

    if (text === METADATA_TYPE.STRENGTHS) {
      setMetaData(STRENGTHDATA);
      setMetaDataType(METADATA_TYPE.STRENGTHS);
    }
  };

  const getMetaData = (body) => {
    metaDataController
      .getMetaData(body)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addMetaData = () => {
    dispatch(showModal(<AddMetaData />));
  };

  useEffect(() => {
    let body = {
      page: page,
      pageSize: pageSize,
      type: metaDataType,
    };
    getMetaData(body);
  }, []);

  return (
    <div>
      <Wrapper>
        <Card sx={{ p: 2 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <PageBreadCrumbs
              data={[
                {
                  label: "Roadmap Management",
                  url: "/roadmap-management",
                },
                {
                  label: "Metadata",
                  url: "/roadmap-management/metadata",
                },
              ]}
            />

            <Button
              startIcon={<AddCircle />}
              sx={{
                backgroundColor: COLORS.PRIMARY,
                color: COLORS.WHITE,
                fontFamily: roboto.style,
              }}
              onClick={addMetaData}
            >
              Add New metadata
            </Button>
          </Stack>

          <Tabs
            sx={{
              mt: 2,
              "& .Mui-selected": {
                color: `${COLORS.PRIMARY} !important`,
              },
              "& .MuiTabs-indicator": {
                backgroundColor: `${COLORS.PRIMARY} !important`,
              },
              borderBottom: "1px solid #d7d7d7",
            }}
            onChange={tabChangeHandler}
            value={value}
          >
            {data.METATDATA.map((val, i) => (
              <Tab
                label={
                  <Typography
                    sx={{
                      fontFamily: roboto.style,
                      fontSize: 14,
                      fontWeight: 550,
                    }}
                  >
                    {val.label}
                  </Typography>
                }
              />
            ))}
          </Tabs>
          <Box sx={{ mt: 2 }}>
            {data.METATDATA.map((_, i) => (
              <TabPanel value={value} index={i}>
                <MetaData tableData={metaData} />
              </TabPanel>
            ))}
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default Metadata;
