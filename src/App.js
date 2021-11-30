import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Theme from './theme/Theme';
import MainLayout from './components/Layout/Main/MainLayout';
import AuthLayout from './components/Layout/Auth/AuthLayout';
import Dashboard from './pages/Dashboard';
import Test1 from './pages/Test1';
import Test2 from './pages/Test2';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/404.js';
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
            <Route index element={<SignIn />} />
            <Route path="signup/">
              <Route index element={<SignUp step={1} />} />
              <Route
                path="secondstep/:email/:token/"
                element={<SignUp step={2} />}
              />
              <Route path="thirdstep/" element={<SignUp step={4} />} />
            </Route>
          </Route>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Theme>
  );
}

export default App;
