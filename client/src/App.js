import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  Flex,
} from "@chakra-ui/core";
import theme from "./theme";

//Redux
import { Provider } from "react-redux";
import store from "./store";

import Nav from "./components/Nav";

import Landing from "./pages/Landing";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <CSSReset />
          <ColorModeProvider>
            <Flex direction="column">
              <Nav />
              <Route exact path="/" component={Landing} />
              <Switch>
                <Route exact path="/about" component={About} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </Flex>
          </ColorModeProvider>
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;
