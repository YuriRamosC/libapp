import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from '@material-ui/core/styles';
import { useTheme, createMuiTheme } from '@material-ui/core/styles';
import { createConnection } from 'typeorm';
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33ab9f',
      main: '#009688',
      dark: '#00695f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#a2cf6e',
      main: '#8bc34a',
      dark: '#618833',
      contrastText: '#fff',
    },
    action: {active: '#2196f3'},
    error: {main:'#ff5722'},
  }
});

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
