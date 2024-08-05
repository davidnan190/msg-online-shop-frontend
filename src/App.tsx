import './App.scss';

import { CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={'app'}>
        <Outlet />
      </div>
    </ThemeProvider>
  );
};

export default App;
