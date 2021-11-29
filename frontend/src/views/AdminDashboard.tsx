import React, { useState, useEffect } from "react";
import { useEthers, useEtherBalance, useContractFunction, useContractCall, useContractCalls } from "@usedapp/core";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import SKKMService from '../artifacts/contracts/SKKMService.sol/SKKMService.json';

import {
  Flex,
  Heading,
  Button
} from "@chakra-ui/react";

const AdminDashboard: React.FC = () => {

  const ISKKMService = new utils.Interface(SKKMService.abi)
  const SKKMServiceAddress = '0xF3f6075Ba946918Be0BA9C1b5C4B4921Fa4fb66B'
  const contract = new Contract(SKKMServiceAddress, ISKKMService)

  const [_listLength, setListLength] = useState(0);

  const { state, send } = useContractFunction(contract, 'owner', { transactionName: 'owner'})

  const fetchRequestList = () => {
    setListLength(parseInt(listLength[0]._hex))
  }

  for(let i = 0; i < _listLength; i++){
    
  }

  const hasil = useContractCalls([
    {
      abi: ISKKMService,
      address: SKKMServiceAddress,
      method: "SKKM_requests_list",
      args: [0],
    },
    {
      abi: ISKKMService,
      address: SKKMServiceAddress,
      method: "SKKM_requests_list",
      args: [1],
    }
  ]) ?? [];

  const listLength = useContractCall({
    abi: ISKKMService,
    address: SKKMServiceAddress,
    method: "getListLength",
    args: [],
  }) ?? [];

  return (
    <Flex py={2} px={16} flexDirection="column">
      <Heading my={4}>Admin Dashboard</Heading>
      <Button onClick={fetchRequestList}>Test</Button>
    </Flex>
  )
}

export default AdminDashboard;