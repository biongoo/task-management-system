import React from 'react';
import Theme from './theme/Theme';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MainLayout from './components/Layout/Main/MainLayout';
import AuthLayout from './components/Layout/Auth/AuthLayout';
import Dashboard from './pages/Dashboard';
import Test1 from './pages/Test1';
import Test2 from './pages/Test2';
import Login from './pages/Login';
import './App.css';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Theme>
      <Routes>
        {isLoggedIn && (
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="test1" element={<Test1 />} />
            <Route path="test2" element={<Test2 />} />
          </Route>
        )}
        {!isLoggedIn && (
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
          </Route>
        )}
      </Routes>
    </Theme>
  );
}

export default App;
