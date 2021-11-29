import React, { useState, useEffect } from "react";
import { useEthers, useEtherBalance, useContractFunction, useContractCall, useContractCalls } from "@usedapp/core";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import SKKMService from '../artifacts/contracts/SKKMService.sol/SKKMService.json';

import {
  Flex,
  Heading,
  Button,
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

  const ISKKMService = new utils.Interface(SKKMService.abi)
  const SKKMServiceAddress = '0xF3f6075Ba946918Be0BA9C1b5C4B4921Fa4fb66B'
  const contract = new Contract(SKKMServiceAddress, ISKKMService)

  const [contractCall, setContractCall] = useState([]);

  const { state, send } = useContractFunction(contract, 'owner', { transactionName: 'owner'})

  const fetchRequestList = () => {
    // const temp_array: any = [];

    // for(let i = 0; i < parseInt(listLength[0]._hex); i++){
    //   const array = {
    //     abi: ISKKMService,
    //     address: SKKMServiceAddress,
    //     method: "SKKM_requests_list",
    //     args: [i],
    //   }

    //   temp_array.push(array);
    // }
    // setContractCall(temp_array);
    console.log(listLength)
  }

  const listLength = useContractCall({
    abi: ISKKMService,
    address: SKKMServiceAddress,
    method: "getListLength",
    args: [],
  }) ?? [];

  const hasil = useContractCalls(contractCall) ?? [];

  // useEffect(() => {
  //   if(listLength){
  //     fetchRequestList()
  //   }
  //   console.log(listLength)
  // }, [listLength])
  

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
      <Button onClick={fetchRequestList}>Test</Button>
      <Button onClick={() => {console.log(hasil)}}>Test2</Button>
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