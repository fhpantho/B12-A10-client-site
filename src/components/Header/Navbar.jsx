import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Authcontext } from "../../context/Authcontext";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(Authcontext);

  const logOutUser = () => {
    logout()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  const link = (
    <>
      <li>
        <NavLink to="/">HOME</NavLink>
      </li>
      <li>
        <NavLink to="/addhabit">ADD HABIT</NavLink>
      </li>
      <li>
        <NavLink to="/myhabit">MY HABIT</NavLink>
      </li>
      <li>
        <NavLink to="/publichabit">ALL HABIT</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
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
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {link}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl">
          HABIT <span className="text-purple-500">TRACKER</span>
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{link}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-4 mr-3">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
              >
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box shadow mt-0 p-4 w-max"
              >
                <li>
                  <div className="flex flex-col items-start gap-1 text-sm">
                    <span className="font-semibold">Name:</span>
                    <span>{user.displayName}</span>
                  </div>
                </li>
                <li>
                  <div className="flex flex-col items-start gap-1 text-sm">
                    <span className="font-semibold">Email:</span>
                    <span>{user.email}</span>
                  </div>
                </li>
                <li>
                  <button className="btn btn-sm mt-2" onClick={logOutUser}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex rounded-full overflow-hidden shadow-md">
            {/* Login Button */}
            <NavLink
              to="/login"
              className="btn rounded-none border-none px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:brightness-110 relative transition-all duration-200 hover:scale-105"
            >
              Log-in
              <div className="absolute right-0 top-0 h-full w-[2px] bg-white/40 scale-y-75 rounded-full"></div>
            </NavLink>

            {/* Signup Button */}
            <NavLink
              to="/singup"
              className="btn rounded-none border-none px-6 bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:brightness-110 transition-all duration-200 hover:scale-105"
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
