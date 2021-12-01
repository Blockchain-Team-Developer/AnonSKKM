import React, { useState, useEffect } from "react";
import { useEthers, useEtherBalance, useContractFunction, useContractCall, useContractCalls } from "@usedapp/core";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import SKKMService from '../artifacts/contracts/SKKMService.sol/SKKMService.json';
import { DataForm } from '../types/interfaces';
import { dataApprove } from "../types/enums";

import {
  Flex,
  Heading,
  Button,
  Text,
  Switch,
  Spacer,
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
  const SKKMServiceAddress = '0xCC8048eF226eb2383B08949F752Cf31932d487cc'
  const contract = new Contract(SKKMServiceAddress, ISKKMService)

  const { state, send } = useContractFunction(contract, 'approveSKKM', { transactionName: 'approveSKKM'})

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

  const tempData: any = []
  const data: any = []

  const approveThis = (index: number, approve: boolean, jenisSKKM: string) => {
    let indexURL = 0
    if(jenisSKKM === "Ilmiah dan Penalaran"){
      indexURL = 0
    }
    else if(jenisSKKM === "Bakat dan Minat"){
      indexURL = 1
    }
    else if(jenisSKKM === "Organisasi dan Pengembangan Kepribadian"){
      indexURL = 2
    }
    else if(jenisSKKM === "Pengabdian Masyarakat"){
      indexURL = 3
    }
    let metadataURL: any = dataApprove[indexURL]; 
    
    send(index, approve, metadataURL)
  }

  const rejectThis = (index: number, approve: boolean, jenisSKKM: string) => {
    let indexURL = 0
    if(jenisSKKM === "Ilmiah dan Penalaran"){
      indexURL = 0
    }
    else if(jenisSKKM === "Bakat dan Minat"){
      indexURL = 1
    }
    else if(jenisSKKM === "Organisasi dan Pengembangan Kepribadian"){
      indexURL = 2
    }
    else if(jenisSKKM === "Pengabdian Masyarakat"){
      indexURL = 3
    }
    let metadataURL: any = dataApprove[indexURL]; 
    
    send(index, approve, metadataURL)
  }

  const tableColumns = [
    {
      name: "Index",
      label: "Index",
      options: {
        display: false
      }
    }
    ,"Nama", "NIM", "Acara", "Deskripsi Acara", "Jenis SKKM",
    {
      name: "Is Approve",
      label: "Is Approve",
      options: {
        customBodyRender: (value:any, tableMeta:any) => (
          <Flex flexDirection="row">
            <Button colorScheme="teal" size="sm" onClick={() => approveThis(tableMeta.rowData[0], true, tableMeta.rowData[5])} mr={4}>Approve</Button>
            <Button colorScheme="red" size="sm" onClick={() => rejectThis(tableMeta.rowData[0], false, tableMeta.rowData[5])}>Reject</Button>
          </Flex>
        )
      }
    }
  ];

  if(hasil[0] !== undefined){
    hasil.map((h: any, index:any) => {
      let jenisSKKM = '';
      if(h[5] === "0" || h[5] === 0){
        jenisSKKM = 'Ilmiah dan Penalaran'
      }
      else if(h[5] === "1" || h[5] === 1){
        jenisSKKM = 'Bakat dan Minat'
      }
      else if(h[5] === "2" || h[5] === 2){
        jenisSKKM = 'Organisasi dan Pengembangan Kepribadian'
      }
      else if(h[5] === "3" || h[5] === 3){
        jenisSKKM = 'Pengabdian Masyarakat'
      }
      data.push([index, h[1], h[2], h[3], h[4], jenisSKKM])
    })
    console.log(data)
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
          columns={tableColumns}
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