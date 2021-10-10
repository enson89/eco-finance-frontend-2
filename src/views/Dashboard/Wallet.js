// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  Input,
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
import simpleContractAbi from "contract/SimpleContract.json";
import React, { useState } from "react";
import { FaWallet } from "react-icons/fa";
import Web3 from "web3";

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
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentCount, setCount] = useState(0);
  const contractAddress = useFormInput("");

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== currentAccount) {
      console.log("connected");
      setCurrentAccount(accounts[0]);
    }
    console.log("WalletAddress in HandleAccountChanged =" + currentAccount);
  };

  const handleConnect = async () => {
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("User rejected connection request");
        } else {
          console.error(err);
        }
      });
  };

  const handleRetrieve = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
    const network = await web3.eth.net.getNetworkType();
    console.log(network);
    const contract = new web3.eth.Contract(
      simpleContractAbi,
      contractAddress.value
    );
    try {
      contract.methods
        .balanceOf(currentAccount)
        .call(function (error, balance) {
          if (error) {
            console.log(error);
          } else {
            console.log(balance);
            contract.methods.decimals().call(function (error, decimals) {
              if (error) {
                console.log(error);
              } else {
                balance = balance / 10 ** decimals;
                setCount(balance);
              }
            });
          }
        });
    } catch (e) {
      console.log(e);
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
                  onClick={handleConnect}
                >
                  Connect
                </Button>
              </Flex>
            </CardHeader>
            <CardBody>
              <Flex
                justify="space-between"
                align="center"
                minHeight="60px"
                w="100%"
              >
                <Input
                  borderRadius="15px"
                  fontSize="sm"
                  type="text"
                  placeholder="Contract Address"
                  size="lg"
                  mr="20px"
                  {...contractAddress}
                />
                <Button
                  bg={bgButton}
                  color="white"
                  fontSize="xs"
                  variant="no-hover"
                  onClick={handleRetrieve}
                >
                  Retrieve
                </Button>
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
                    <IconBox me="10px" w="25px" h="25px">
                      <Image
                        src={metaicon}
                        w="100%"
                        h="100%"
                        color="gray.400"
                      />
                    </IconBox>
                  </Flex>
                  <Spacer />
                  <Flex direction="column">
                    <Box>
                      <Text
                        color="gray.400"
                        fontSize="md"
                        fontWeight="semibold"
                      >
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
