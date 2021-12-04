import { ReactNode } from "react";
import { Flex, Heading } from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
};

export default function HomeLayout({ children }: Props) {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h='calc(100vh - 10rem)'
    >
      <Heading>Please Connect Your Wallet First</Heading>
    </Flex>
  );
}