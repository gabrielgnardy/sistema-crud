import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from 'components/Register';
import Login from 'components/Login';
import Reset from 'components/Reset';
import TaskList from 'components/TaskList';
import Header from 'components/Header';
import { AuthProvider } from 'context/AuthContext';
import ProtectedRoute from 'ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<div>Página não encontrada</div>} />
        <Route
          path="/tasks"
          element={
            <AuthProvider>
              <ProtectedRoute>
                <Header />
                <TaskList />
              </ProtectedRoute>
            </AuthProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

