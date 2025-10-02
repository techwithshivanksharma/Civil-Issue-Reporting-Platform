import React, { useState } from "react";
import { MenuIcon, XIcon, UserCircleIcon } from "@heroicons/react/outline";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Report Issues", path: "/report" },
    { name: "View Issues", path: "/issues" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex  justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              C I R P
              <p className="text-xs">Civil Issues Reporting Platform</p>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-500 transition-colors"
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/*User Icon*/}
            <UserCircleIcon className="h-6 w-6 text-gray-700 hover:text-blue-500 cursor-pointer" />
          </div>

          {/* Mobile Menu Button */}
          {/* !menuOpen -> flips the value from true to false and vice versa */}

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-blue-500 focus:outline-none"
            >
              {menuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/*Mobile Menu*/}

      {menuOpen && (
        <div className="md:hidden bg-white px-2 pt-2 pb-3 space-y-1 shadow-md z-50">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block px-3 py-2 rounded-md text-blue-600 font-semibold"
                  : "block px-3 py-2 rounded-md text-gray-700 hover:text-blue-500"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
