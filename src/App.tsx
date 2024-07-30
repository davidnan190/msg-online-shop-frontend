import './App.scss'

import { Outlet } from 'react-router-dom';
import React from 'react';

const App: React.FC = () => {
  return (
    <div className={'app'}>
      <Outlet />
    </div>
  );
};

export default App;
