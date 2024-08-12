import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Employee from "./pages/Employee";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Home from "./pages/home";

function App() {
  const [username, setUsername] = useState(sessionStorage.getItem("username") || "");
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    return "system";
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginStatus = sessionStorage.getItem("isLoggedIn");
    return savedLoginStatus === "true";
  });

  useEffect(() => {
    const applyTheme = () => {
      if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    applyTheme();
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", applyTheme);
      return () => mediaQuery.removeEventListener("change", applyTheme);
    }
  }, [theme]);

  const setThemePreference = (newTheme) => {
    setTheme(newTheme);
  };

  const login = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("username", "admin");
    setUsername('admin');
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("username");
    setUsername('');
  };

  return (
    <Router>
      <Navbar
        setThemePreference={setThemePreference}
        currentTheme={theme}
        isLoggedIn={isLoggedIn}
        logout={logout}
        username={username}
      />
      <main className="container mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Employee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile username={username} setUsername={setUsername}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={<Login login={login} />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;