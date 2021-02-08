import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { createMuiTheme  } from '@material-ui/core';
import { createConnection } from 'typeorm';
import theme from '../theme';
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
