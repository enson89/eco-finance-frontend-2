// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Input,
  Image,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import BackgroundCard1 from "assets/img/BackgroundCard1.png";
import metaicon from "assets/img/metamask_logo.png";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import IconBox from "components/Icons/IconBox";
import { Separator } from "components/Separator/Separator";
import { FaWallet } from "react-icons/fa";
import React, { useState } from "react";
import Web3 from "web3";
import simpleContractAbi from "contract/SimpleContract.json";

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

function Wallet() {
  const borderColor = useColorModeValue("#dee2e6", "gray.500");

  const [currentAccount, setCurrentAccount] = useState("");
  const [currentCount, setCount] = useState(0);

  const contractAddress = useFormInput("");

  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
      const accounts = await web3.eth.getAccounts();
      setCurrentAccount(accounts[0]);
      const network = await web3.eth.net.getNetworkType();
      console.log(network);
      const contract = new web3.eth.Contract(
        simpleContractAbi,
        contractAddress.value
      );
      contract.methods.balanceOf(accounts[0]).call(function (error, balance) {
        console.log(balance);
        contract.methods.decimals().call(function (error, decimals) {
          balance = balance/(10**decimals);
          setCount(balance);
        });
      });
    }
  };

  const detectMetaMask = () => {
    if (typeof window.ethereum !== "undefined") {
      return true;
    } else {
      return false;
    }
  };

  // Chakra color mode
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const textColor = useColorModeValue("gray.700", "white");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Grid templateColumns={{ sm: "1fr", lg: "1fr" }} templateRows="1fr">
        <Box>
          <Card p="16px" mt="24px" mb="26px">
            <CardHeader>
              <Flex
                justify="space-between"
                align="center"
                minHeight="60px"
                w="100%"
              >
                <Text fontSize="lg" color={textColor} fontWeight="bold">
                  Metamask Account
                </Text>
                <Button
                  bg={bgButton}
                  color="white"
                  fontSize="xs"
                  variant="no-hover"
                  onClick={connect}
                >
                  Connect
                </Button>
              </Flex>
            </CardHeader>
            <CardBody>
              <Flex
                direction={{ sm: "column", md: "row" }}
                align="center"
                w="100%"
                justify="center"
                py="1rem"
              >
                <Input
                  borderRadius="15px"
                  fontSize="sm"
                  type="text"
                  placeholder="Contract Address"
                  size="lg"
                  {...contractAddress}
                />
              </Flex>
            </CardBody>
          </Card>
          <Grid
            templateColumns={{
              sm: "1fr",
              md: "1fr 1fr",
              xl: "1fr 1fr",
            }}
            templateRows={{ sm: "1fr auto", md: "1fr auto", xl: "1fr" }}
            gap="26px"
          >
            <Card
              backgroundImage={BackgroundCard1}
              backgroundRepeat="no-repeat"
              background="cover"
              bgPosition="10%"
              minHeight="250px"
              p="16px"
              h={{ sm: "20px", xl: "100%" }}
              gridArea={{ md: "1 / 1", xl: "1 / 1 " }}
            >
              <CardBody h="100%" w="100%">
                <Flex
                  direction="column"
                  color="white"
                  h="100%"
                  p="0px 10px 20px 10px"
                  w="100%"
                >
                  <Flex justify="space-between" align="center">
                    <Text fontSize="md" fontWeight="bold">
                      EcoFinance
                    </Text>
                    <Image src={metaicon} w="48px" h="auto" color="gray.400" />
                  </Flex>
                  <Spacer />
                  <Flex direction="column">
                    <Box>
                      <Text fontSize="xl" letterSpacing="2px" fontWeight="bold">
                        {currentAccount}
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
            <Card p="16px" display="flex" align="center" justify="center">
              <CardBody>
                <Flex direction="column" align="center" w="100%" py="14px">
                  <IconBox as="box" h={"60px"} w={"60px"} bg={iconTeal}>
                    <Icon h={"24px"} w={"24px"} color="white" as={FaWallet} />
                  </IconBox>
                  <Flex
                    direction="column"
                    m="14px"
                    justify="center"
                    textAlign="center"
                    align="center"
                    w="100%"
                  >
                    <Text fontSize="md" color={textColor} fontWeight="bold">
                      Token
                    </Text>
                    <Text
                      mb="24px"
                      fontSize="xs"
                      color="gray.400"
                      fontWeight="semibold"
                    >
                      Balance
                    </Text>
                    <Separator />
                  </Flex>
                  <Text fontSize="lg" color={textColor} fontWeight="bold">
                    {currentCount}
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          </Grid>
        </Box>
      </Grid>
    </Flex>
  );
}

export default Wallet;
