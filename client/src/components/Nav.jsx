import React from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Link,
  useColorMode,
  IconButton,
} from "@chakra-ui/core";

const MenuItems = ({ routeTo, children }) => (
  <Link>
    <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
      {children}
    </Text>
  </Link>
);

const Nav = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "white", dark: "black" };
  const textColor = { light: "black", dark: "white" };
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg={bgColor[colorMode]}
      color={textColor[colorMode]}
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Nickle
        </Heading>
      </Flex>

      <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="grey"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>Home</MenuItems>
        <MenuItems>About</MenuItems>
        <IconButton
          variant="ghost"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? "moon" : "sun"}
        >
          Change Color Mode
        </IconButton>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button bg="transparent" border="1px" mr={3}>
          Sign In
        </Button>
        <Button bg="transparent" border="1px">
          Register
        </Button>
      </Box>
    </Flex>
  );
};

export default Nav;
