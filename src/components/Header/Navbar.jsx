import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Authcontext } from "../../context/Authcontext";
import { toast } from "react-hot-toast";
import NavbarLinks from "./NavbarLinks";
import ThemeToggle from "../ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(Authcontext);

  const [scrolled, setScrolled] = useState(false);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logOutUser = () => {
    logout()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div
      className={`navbar bg-base-100 dark:bg-base-200 border-b border-base-content/10 transition-colors duration-300 px-4 fixed top-0 left-0 w-full z-50 ${
        scrolled
          ? "shadow-lg backdrop-blur-md bg-white/90 dark:bg-base-200/90"
          : ""
      }`}
    >
      {/* LEFT */}
      <div className="navbar-start gap-2">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
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
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow gap-2 z-[1]"
          >
            <NavbarLinks />
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <div className="hidden sm:flex w-10 h-10 rounded-full bg-white items-center justify-center text-purple-600 font-bold shadow">
            HT
          </div>

          <span className="font-bold tracking-wide text-lg transition hover:scale-105">
            HABIT{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              TRACKER
            </span>
          </span>
        </NavLink>
      </div>

      {/* CENTER (Desktop Only) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-3">
          <NavbarLinks />
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end flex items-center gap-3">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Auth Section */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="cursor-pointer">
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </label>

            <ul
              tabIndex={0}
              className="dropdown-content mt-3 w-56 rounded-xl bg-base-100 dark:bg-base-200 border border-base-content/10 p-4 text-base-content shadow-lg"
            >
              <li className="mb-2">
                <Link
                  to="/dashboard/profile"
                  className="flex items-center gap-2 hover:bg-base-200 dark:hover:bg-base-300 rounded-lg p-2 transition-colors"
                >
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src={user.photoURL} />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-base-content/70 truncate">
                      {user.email}
                    </p>
                  </div>
                </Link>
              </li>

              <li className="border-t border-base-content/10 my-1"></li>

              <li>
                <Link
                  to="/dashboard"
                  className="hover:bg-base-200 dark:hover:bg-base-300 rounded-lg p-2 my-1"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/profile"
                  className="hover:bg-base-200 dark:hover:bg-base-300 rounded-lg p-2 my-1"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-habit"
                  className="hover:bg-base-200 dark:hover:bg-base-300 rounded-lg p-2 my-1"
                >
                  My Habbit
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/add-habit"
                  className="hover:bg-base-200 dark:hover:bg-base-300 rounded-lg p-2 my-1"
                >
                  Add Habbit
                </Link>
              </li>

              <li className="border-t border-base-content/10 my-1"></li>

              <li>
                <button
                  onClick={logOutUser}
                  className="w-full py-2 rounded-lg bg-base-200 hover:bg-base-300 transition font-semibold text-center mt-2"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex rounded-full overflow-hidden shadow">
            <NavLink
              to="/login"
              className="btn rounded-none border-none px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:brightness-110"
            >
              Log-in
            </NavLink>

            <NavLink
              to="/singup"
              className="btn rounded-none border-none px-6 bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:brightness-110"
            >
              Sign-up
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
