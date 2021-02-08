import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { createMuiTheme  } from '@material-ui/core';
const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#7e5dc0',
        main: '#5e35b1',
        dark: '#41257b',
        contrastText: '#fff',
      },
      secondary: {
        light: '#5393ff',
        main: '#2979ff',
        dark: '#1c54b2',
        contrastText: '#fff',
      },
    }
  });
export default theme;