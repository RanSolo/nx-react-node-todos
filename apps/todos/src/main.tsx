import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
  unstable_createMuiStrictModeTheme
} from '@material-ui/core';
import App from './app/app';

const theme = unstable_createMuiStrictModeTheme();
ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
