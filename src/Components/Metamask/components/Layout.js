import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";
import React from "react";

export const test = {
  children: ReactNode,
};

export default function Layout({ children }) {
  return (
    <Flex
      flexDirection="column"
      position="absolute"
      left="1000px"
      alignItems="center"
      justifyContent="center"
      h="8vh"
      bg="gray.800"
    >
      {children}
    </Flex>
  );
}