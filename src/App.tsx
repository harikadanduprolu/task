import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Profile } from './pages/Profile';
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { Teams } from './pages/Teams';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="teams" element={<Teams />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}