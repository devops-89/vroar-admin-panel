import { metaDataHeader } from "@/assests/roadmapData";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { FilterList, SwapVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid2,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import RoadmapTable from "./roadmaptable";
import Loading from "react-loading";

const MetaData = ({
  tableData,
  editMetaData,
  statusHandler,
  onSearch,
  loading,
  page,
  pageSize,
  pageChangeHandler,
  pageSizeHandler,
}) => {
  return (
    <div>
      <Grid2 container spacing={2}>
        <Grid2 size={9}>
          <TextField
            sx={{ ...loginTextField }}
            label="Search"
            fullWidth
            onChange={onSearch}
          />
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

      {tableData?.docs.length === 0 ? (
        <Typography
          sx={{
            fontSize: 20,
            fontFamily: roboto.style,
            textAlign: "center",
            mt: 2,
          }}
        >
          No Data Found
        </Typography>
      ) : (
        <Box sx={{ mt: 1 }}>
          {loading ? (
            <Loading
              type="bars"
              width={20}
              height={20}
              color={COLORS.BLACK}
              className="m-auto"
            />
          ) : (
            <>
              <RoadmapTable
                tableHeader={metaDataHeader}
                tableData={tableData?.docs}
                editMetaData={editMetaData}
                statusHandler={statusHandler}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <TablePagination
                  page={page}
                  rowsPerPage={pageSize}
                  count={tableData?.totalDocs}
                  onPageChange={pageChangeHandler}
                  onRowsPerPageChange={pageSizeHandler}
                />
              </Box>
            </>
          )}
        </Box>
      )}
    </div>
  );
};

export default MetaData;
