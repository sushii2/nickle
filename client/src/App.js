import React from 'react'
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core"
import theme from './theme';

import Nav from './components/Nav';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <CSSReset />
    <ColorModeProvider>
      <Nav />
    </ColorModeProvider>
  </ThemeProvider>
  )
}

export default App;
