import React from "react";
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  Flex,
} from "@chakra-ui/core";
import theme from "./theme";

import Nav from "./components/Nav";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <ColorModeProvider>
        <Flex direction="column">
          <Nav />
          <Landing />
        </Flex>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default App;
