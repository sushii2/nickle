import React from "react";
import { Box, Heading, useColorMode, Flex } from "@chakra-ui/core";
import LazyHero from "react-lazy-hero";
import TextLoop from "react-text-loop";

const Landing = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "black" };
  const textColor = { light: "black", dark: "white" };
  return (
    <>
      <LazyHero
        imageSrc="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2047&q=80"
        minHeight="75vh"
        opacity={0.4}
        parallaxOffset={50}
        transitionDuration={600}
      >
        <Box maxW="md" maxHeight="75%">
          <Heading as="h1" size="2xl" color={textColor[colorMode]}>
            <TextLoop>
              <span>Create</span>
              <span>Share</span>
              <span>Review</span>
            </TextLoop>
            <span> a project car now.</span>
          </Heading>
        </Box>
      </LazyHero>
      <Flex
        as="div"
        align="center"
        justify="center"
        padding="50%"
        bg={bgColor[colorMode]}
        color={textColor[colorMode]}
      >
        <Box
        display={{ sm: "block", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >

      </Box>
      </Flex>
    </>
  );
};

export default Landing;
