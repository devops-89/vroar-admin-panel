import { metaDataHeader } from "@/assests/roadmapData";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { FilterList, SwapVert } from "@mui/icons-material";
import { Box, Button, Grid2, TextField } from "@mui/material";
import RoadmapTable from "./roadmaptable";

const MetaData = ({  tableData }) => {
  return (
    <div>
      <Grid2 container spacing={2}>
        <Grid2 size={9}>
          <TextField sx={{ ...loginTextField }} label="Search" fullWidth />
        </Grid2>
        <Grid2 size={1.5}>
          <Button
            endIcon={<SwapVert />}
            sx={{
              border: "1px solid #d7d7d7",
              height: 55,
              color: COLORS.BLACK,
              fontSize: 14,
              fontFamily: roboto.style,
            }}
            fullWidth
          >
            sort
          </Button>
        </Grid2>
        <Grid2 size={1.5}>
          <Button
            endIcon={<FilterList />}
            sx={{
              border: "1px solid #d7d7d7",
              height: 55,
              color: COLORS.BLACK,
              fontFamily: roboto.style,
            }}
            fullWidth
          >
            Filter
          </Button>
        </Grid2>
      </Grid2>
      <Box sx={{ mt: 1 }}>
        <RoadmapTable tableHeader={metaDataHeader} tableData={tableData} />
      </Box>
    </div>
  );
};

export default MetaData;
