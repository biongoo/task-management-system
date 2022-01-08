import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Theme from './theme/Theme';
import useInit from './hooks/use-init';

import Plan from './pages/Plan';
import Marks from './pages/Marks';
import Login from './pages/Login';
import Forgot from './pages/Forgot';
import NotFound from './pages/404.js';
import Settings from './pages/Settings';
import Teachers from './pages/Teachers';
import Subjects from './pages/Subjects';
import Register from './pages/Register';
import Homework from './pages/Homework';
import Dashboard from './pages/Dashboard';
import Materials from './pages/Materials';
import MainLayout from './components/Layout/Main/MainLayout';
import AuthLayout from './components/Layout/Auth/AuthLayout';

function App() {
  useInit();

  return (
    <Theme>
      <Routes>
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="homework" element={<Homework />} />
          <Route path="materials" element={<Materials />} />
          <Route path="marks" element={<Marks />} />
          <Route path="plan" element={<Plan />} />
          <Route path="settings" element={<Settings />} />
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
