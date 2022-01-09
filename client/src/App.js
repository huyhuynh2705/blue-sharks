import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import './style.css';
import { getUserInformationFromStorage } from './helper/index';

const App = () => {
  const isAuthenticated = getUserInformationFromStorage();

  function RequireLoggedIn({ children, redirectTo }) {
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

  function RequireLoggedOut({ children, redirectTo }) {
    return !isAuthenticated ? children : <Navigate to={redirectTo} />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <RequireLoggedOut redirectTo="/">
              <Login />
            </RequireLoggedOut>
          }
        />
        <Route
          path="/signup"
          element={
            <RequireLoggedOut redirectTo="/">
              <SignUp />
            </RequireLoggedOut>
          }
        />
        <Route
          path="/"
          element={
            <RequireLoggedIn redirectTo="/login">
              <Home />
            </RequireLoggedIn>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
