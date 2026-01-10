import { Link, NavLink } from "react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { useTheme } from "../providers/ThemeProvider";
import api from "../utils/api";
import toast from "react-hot-toast";
import {
  FaRocket,
  FaTachometerAlt,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await api.get("/users/profile");
      return response.data;
    },
    enabled: !!user,
  });

  const getDashboardLink = () => {
    if (!profile) return "/dashboard";
    if (profile.role === "admin") return "/dashboard/admin";
    if (profile.role === "clubManager") return "/dashboard/manager";
    return "/dashboard/member";
  };

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/clubs", label: "Clubs" },
    { to: "/events", label: "Events" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-base-100 shadow-lg sticky top-0 z-50 border-b-2 border-base-300"
    >
      <div className="navbar container mx-auto px-4">
        {/* Logo - Left */}
        <div className="navbar-start">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg"
            >
              <FaRocket className="text-white text-xl" />
            </motion.div>
            <span className="text-2xl font-black text-base-content">
              Club<span className="text-primary">Sphere</span>
            </span>
          </Link>
        </div>

        {/* Nav Links - Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `font-semibold px-4 rounded-lg transition-all ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-base-content hover:bg-base-200"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end gap-2">
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? (
                <FaSun className="text-xl text-yellow-400" />
              ) : (
                <FaMoon className="text-xl text-primary" />
              )}
            </motion.div>
          </motion.button>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-primary"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt={user?.displayName || "User"}
                    src={
                      user?.photoURL ||
                      "https://ui-avatars.com/api/?name=" + user?.displayName
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-56 p-2 shadow-xl border-2 border-base-300"
              >
                <li className="menu-title px-4 py-2">
                  <div>
                    <span className="font-bold text-sm text-base-content">
                      {user?.displayName}
                    </span>
                    <br />
                    <span className="text-xs opacity-60">{user?.email}</span>
                  </div>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <Link
                    to={getDashboardLink()}
                    className="flex items-center gap-2"
                  >
                    <FaTachometerAlt />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-error"
                  >
                    <FaSignOutAlt />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn btn-ghost font-semibold">
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary font-semibold text-white"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {isMenuOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border-2 border-base-300"
              >
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `font-semibold ${
                          isActive ? "bg-primary text-white" : ""
                        }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
