import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Text,
  Switch,
  Box
} from "@chakra-ui/react";
import MUIDataTable from "mui-datatables";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const colorTheme = createMuiTheme({
  palette: {
    primary: {
      main: `#13DF80`,
    },
    secondary: {
      main: `#FF0000`,
    },
  },
});

const AdminDashboard: React.FC = () => {
  const data = [
    ["Jane Cooper Krisna Cahyadi", "34242", "jane.cooper@student.umn.ac.id"],
    [
      "Maximilliano Adrian Stefan Gabrielsar",
      "23231",
      "jane.cooper@student.umn.ac.id",
    ],
    ["Carlos Cooper", "12121", "jane.cooper@student.umn.ac.id"],
    ["Jane Dharmawan Cooper", "56565", "jane.cooper@student.umn.ac.id"],
    ["Jane Cooper June Caaper", "35353", "jane.cooper@student.umn.ac.id"],
    [
      "Jane Cooper Krisna Finantyo Chandra",
      "35353",
      "jane.cooper@student.umn.ac.id",
    ],
    ["Jane Dharmawan Cooper", "56565", "jane.cooper@student.umn.ac.id"],
    ["Jane Cooper June Caaper", "35353", "jane.cooper@student.umn.ac.id"],
    [
      "Jane Cooper Krisna Finantyo Chandra",
      "35353",
      "jane.cooper@student.umn.ac.id",
    ],
    ["William Cooper", "34242", "jane.cooper@student.umn.ac.id"],
    [
      "Jane Cooper Krisna Finantyo Chandra",
      "35353",
      "jane.cooper@student.umn.ac.id",
    ],
    ["Jane Dharmawan Cooper", "56565", "jane.cooper@student.umn.ac.id"],
    ["Jane Cooper June Caaper", "35353", "jane.cooper@student.umn.ac.id"],
    [
      "Jane Cooper Krisna Finantyo Chandra",
      "35353",
      "jane.cooper@student.umn.ac.id",
    ],
    ["Jane Bonifasius", "23231", "jane.cooper@student.umn.ac.id"],
    ["Jane Cooper", "12121", "jane.cooper@student.umn.ac.id"],
    ["Gabrielsar Cooper", "56565", "jane.cooper@student.umn.ac.id"],
  ];

  const columns = ["Nama", "NIM", "Email"];

  return (
    <Flex py={2} px={16} flexDirection="column">
      <Heading my={4}>Admin Dashboard</Heading>
      <Box my={6} w="100%">
        <MUIDataTable
          title={"SKKM Request List"}
          data={data}
          columns={columns}
          options={{
            selectableRows: "none",
            rowsPerPage: 15,
            rowsPerPageOptions: [10, 15, 20],
            elevation: 0,
          }}
        />
      </Box>
    </Flex>
  )
}

export default AdminDashboard;