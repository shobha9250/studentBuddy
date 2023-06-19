/*This file include all the routes*/

import React, { useEffect } from 'react';
import { useContext, useReducer, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LOGIN } from './store/Types';
import Reducer from './store/Reducer';
import Store from './store/Store';
import HomePage from './pages/HomePage'

const Routess = () => {
  const initialState = useContext(Store);
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    if (Cookies.get('token')) {
      const user_id = Cookies.get('user_id');
      const user_name = Cookies.get('user_name');
      dispatch({
        type: LOGIN,
        user_id: `${user_id}`,
        user_name: `${user_name}`,
      });
      return;
    } else {
      console.log('token is not there...');
    }
  }, []);
  return (
    <Store.Provider value={[state, dispatch]}>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
      </Routes>
    </Store.Provider>
  );
};
export default Routess;