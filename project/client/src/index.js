import React, { useState, useMemo, useCallback, useContext } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Index from "./pages/Index";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Loans from "./pages/Loans";
import Contact from "./pages/Contact";
import Users from "./admin-pages/Users";
import Books from "./admin-pages/Books";
import { ThemeContext } from "./context/ThemeContext";
import { AuthContext } from "./context/AuthContext";
import NavigationBar from "./components/Navbar";
import UserProfile from "./pages/UserProfile";

export default function App() {
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [role, setRole] = useState(false);
  const [userId, setUserId] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // default theme value
  const [theme, setTheme] = useState("primary");
  // useMemo for memoized values
  const providerTheme = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  const login = useCallback((password, email, role, userId) => {
    setPassword(password);
    setEmail(email);
    setRole(role);
    setUserId(userId);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setPassword(null);
    setEmail(null);
    setRole(null);
    setUserId(null);
    setIsLoggedIn(false);
  }, []);

  let routes;
  // Sets navigation routes for admin users
  if (isLoggedIn && role === "ADMIN") {
    routes = (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Home />} />
          <Route path="loans" element={<Loans />} />
          <Route path="contact" element={<Contact />} />
          <Route path="users" element={<Users />} />
          <Route path="books" element={<Books />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    );
    // Sets navigation routes for regular users
  } else if (isLoggedIn && role === "USER") {
    routes = (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Home />} />
          <Route path="loans" element={<Loans />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        password: password,
        email: email,
        role: role,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <ThemeContext.Provider value={providerTheme}>
        <Router>
          <NavigationBar />
          <main>{routes}</main>
        </Router>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
