import AddEmployee from "@/assests/modalCalling/user/employee/add-employee";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import CustomTable from "@/components/customTable";
import EmployeeList from "@/components/user/employee/employee-list";
import Wrapper from "@/components/wrapper";
import { showModal } from "@/redux/reducers/modal";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Add } from "@mui/icons-material";
import { Box, Button, Card, Stack } from "@mui/material";
import { useDispatch } from "react-redux";

const Employee = () => {
  const dispatch = useDispatch();

  const addEmployee = () => {
    dispatch(showModal(<AddEmployee />));
  };

  return (
    <Wrapper>
      <Box sx={{ p: 2 }}>
        <Card sx={{ p: 2 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <PageBreadCrumbs
              data={[
                {
                  label: "User Management",
                  url: "/user-management/employee",
                },
                {
                  label: "Employee Management",
                  url: "/user-management/employee",
                },
              ]}
            />
            <Button
              endIcon={<Add />}
              sx={{
                background: COLORS.LinearGradient,
                color: COLORS.WHITE,
                fontSize: 15,
                fontWeight: 600,
                textTransform: "capitalize",
                fontFamily: roboto.style,
              }}
              onClick={addEmployee}
            >
              Add Employee
            </Button>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <CustomTable />
          </Box>
          <EmployeeList />
        </Card>
      </Box>
    </Wrapper>
  );
};

export default Employee;
