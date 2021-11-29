import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading
} from "@chakra-ui/react";

const AdminDashboard: React.FC = () => {
  return (
    <Flex py={2} px={16} flexDirection="column">
      <Heading my={4}>Admin Dashboard</Heading>
    </Flex>
  )
}

export default AdminDashboard;