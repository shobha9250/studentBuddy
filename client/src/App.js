import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import LoadingIndicator from './components/LoadingIndicator';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes/>
        <LoadingIndicator />
      </BrowserRouter>
    </>
  );
};

export default App;