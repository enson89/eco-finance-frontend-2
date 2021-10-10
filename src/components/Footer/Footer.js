/*eslint-disable*/
import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function Footer(props) {
  // const linkTeal = useColorModeValue("teal.400", "red.200");=
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Text
        color="gray.400"
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
      >
        &copy; {1900 + new Date().getYear()},{" "}
        <Text as="span">{"Created by "}</Text>
        <Link
          // color={linkTeal}
          color="teal.400"
          target="_blank"
        >
          {"NUS FintechSG Batch 12 Group 5"}
        </Link>
      </Text>
    </Flex>
  );
}
