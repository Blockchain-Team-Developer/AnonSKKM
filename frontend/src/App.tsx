import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import "@fontsource/inter";
import { 
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  Grid 
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import FormSKKM from "./views/FormSKKM";

function App(props:any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
      <ChakraProvider theme={theme}>
      <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="gray.800"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          AnonSKKM
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Text>Home</Text>
        <Text>SKKM</Text>
        <Text>About Us</Text>
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Flex>
          <Layout>
              <ConnectButton handleOpenModal={onOpen} />
              <AccountModal isOpen={isOpen} onClose={onClose} />
            </Layout>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </Box>
    </Flex>
    <FormSKKM/>
    </ChakraProvider>
  );
}

export default App;