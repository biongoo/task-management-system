import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Theme from './theme/Theme';
import MainLayout from './components/Layout/Main/MainLayout';
import AuthLayout from './components/Layout/Auth/AuthLayout';
import Dashboard from './pages/Dashboard';
import Test1 from './pages/Test1';
import Test2 from './pages/Test2';
import Login from './pages/Login';
import Register from './pages/Register';
import Forgot from './pages/Forgot';
import NotFound from './pages/404.js';
import './App.css';

function App() {
  return (
    <Theme>
      <Routes>
        <Route path="/dashboard/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="test1" element={<Test1 />} />
          <Route path="test2" element={<Test2 />} />
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />

          <Route path="signup/">
            <Route index element={<Register step={1} />} />
            <Route
              path="secondstep/:email/:token/"
              element={<Register step={2} />}
            />
            <Route path="thirdstep/" element={<Register step={4} />} />
          </Route>

          <Route path="forgot/">
            <Route index element={<Forgot step={1} />} />
            <Route
              path="secondstep/:email/:token/"
              element={<Forgot step={2} />}
            />
            <Route path="thirdstep/" element={<Forgot step={4} />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Theme>
  );
}

export default App;
