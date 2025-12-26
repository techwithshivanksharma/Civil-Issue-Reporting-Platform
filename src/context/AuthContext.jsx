import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); // list of registered users
  const [loading, setLoading] = useState(true);

  // Load saved users + logged-in user
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) setUsers(JSON.parse(savedUsers));

    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));

    setLoading(false);
  }, []);

  // REGISTER
  const register = (name, email, username, password, role = "user") => {
    // check if username or email already exists
    if (users.some((u) => u.username === username)) {
      return { success: false, message: "Username already exists" };
    }

    if (users.some((u) => u.email === email)) {
      return { success: false, message: "Email already registered" };
    }

    const newUser = {
      id: Date.now().toString(), //Unique UserId
      name,
      email,
      username,
      password,
      role,
    };

    const updatedList = [...users, newUser];

    console.log(updatedList);

    setUsers(updatedList);
    localStorage.setItem("users", JSON.stringify(updatedList));

    return { success: true };
  };

  // LOGIN
  const login = (usernameOrEmail, password) => {
    const found = users.find(
      (u) =>
        (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
        u.password === password
    );

    if (found) {
      setUser(found);
      localStorage.setItem("user", JSON.stringify(found));
      return true;
    }

    // Hardcoded Admin
    if (usernameOrEmail === "admin" && password === "1234") {
      const adminUser = {
        id: "admin-001",
        name: "Administrator",
        email: "admin@site.com",
        username: "admin",
        role: "admin",
      };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
      return true;
    }

    return false;
  };

  //Reset Password function
  const resetPassword = (email, newPassword) => {
    const idx = users.findIndex((u) => u.email === email);
    if (idx === -1) {
      return { success: false, message: "Email not found" };
    }
    const updatedUsers = [...users];
    updatedUsers[idx] = { ...updatedUsers[idx], password: newPassword };
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    //If currently logged in user is same, update it too

    if (user && user.email === email) {
      const updatedCurrentUser = {
        ...users,
        password: newPassword,
      };
      setUser(updatedCurrentUser);
      localStorage.setItem("user", JSON.stringify(updatedCurrentUser));
    }
    return { success: true };
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, users, loading, register, login, logout, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
