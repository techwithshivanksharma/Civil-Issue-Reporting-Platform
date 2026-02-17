// src/components/Navbar.jsx
import React, { useState, useContext } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ProfileCard from "./ProfileCard";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/" },
    { name: "Report Issues", path: "/report" },
    { name: "View Issues", path: "/issues" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 dark:text-gray-100 shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 dark:text-white"
            >
              C I R P
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Civil Issues Reporting Platform
              </p>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center ">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 dark:text-blue-300 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Avatar OR Login */}
            {user ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // ← prevents bubbling
                    setOpenProfile(!openProfile);
                  }}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold hover:bg-blue-700"
                >
                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : (user.username || "U").charAt(0).toUpperCase()}
                </button>

                {openProfile && (
                  <ProfileCard close={() => setOpenProfile(false)} />
                )}
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                >
                  <UserCircleIcon className="h-5 w-5" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 dark:text-gray-100"
            >
              {menuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-3 pt-2 pb-3 space-y-1 shadow z-50">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block px-3 py-2 text-blue-600 dark:text-blue-300 font-semibold"
                  : "block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500"
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="flex items-center gap-2 mt-2">
            {user ? (
              <>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full bg-red-500 text-white px-3 py-2 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-blue-500 text-white px-3 py-2 rounded-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
