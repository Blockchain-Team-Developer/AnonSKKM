import React, { useState, useEffect } from "react";
import { useEthers, useEtherBalance, useContractFunction, useContractCall, useContractCalls } from "@usedapp/core";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import SKKMService from '../artifacts/contracts/SKKMService.sol/SKKMService.json';
import { DataForm } from '../types/interfaces';

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

  const listLength = useContractCall({
    abi: ISKKMService,
    address: SKKMServiceAddress,
    method: "getListLength",
    args: [],
  }) ?? [];

  useEffect(() => {
    const temp_array: any = [];
    if(listLength.length != 0){
     
      for(let i = 0; i < parseInt(listLength[0]._hex); i++){
        temp_array.push({
          abi: ISKKMService,
          address: SKKMServiceAddress,
          method: "SKKM_requests_list",
          args: [i],
        })
      }
      setContractCall(temp_array)
    }
  }, [listLength])

  const hasil = useContractCalls(contractCall) ?? [];
 
  const data: any = []

  const columns = ["Nama", "NIM", "Acara", "Deskripsi Acara", "Jenis SKKM", "Is Approve"];

  if(hasil[0] !== undefined){
    hasil.map((h: any) => {
      data.push([h[1], h[2], h[3], h[4], h[5]])
    })
  }
  else{
    console.log(false)
  }

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