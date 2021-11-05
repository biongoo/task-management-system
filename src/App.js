import React from 'react';
import Theme from './theme/Theme';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Main/MainLayout';
import Dashboard from './pages/Dashboard';
import Test1 from './pages/Test1';
import Test2 from './pages/Test2';
import './App.css';

function App() {
  return (
    <Theme>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="test1" element={<Test1 />} />
          <Route path="test2" element={<Test2 />} />
        </Route>
      </Routes>
    </Theme>
  );
}

export default App;
