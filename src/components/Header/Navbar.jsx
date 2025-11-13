import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Authcontext } from "../../context/Authcontext";
import { toast } from "react-hot-toast";
import NavbarLinks from "./NavbarLinks";

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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-3"
          >
            <NavbarLinks></NavbarLinks>
          </ul>
        </div>
        <NavLink to='/'>
        <div className="flex gap-2 items-center">
          <div className="sm:flex  w-10 h-10 bg-white rounded-full hidden items-center justify-center text-purple-600 font-bold text-xl shadow-md">
            HT
          </div>
        <div
  className=" font-bold tracking-wide relative inline-block transition-all duration-300 hover:scale-105"
>
  HABIT{" "}
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
    TRACKER
  </span>
</div>
</div>
</NavLink>

      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3 w-full"><NavbarLinks></NavbarLinks></ul>
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
  className="dropdown-content bg-gradient-to-b from-purple-600 via-purple-500 to-pink-500 rounded-xl shadow-lg mt-2 p-4 w-56 text-white"
>
  {/* User Info */}
  <li className="mb-2">
    <div className="flex flex-col gap-0.5">
      <span className="font-semibold text-sm">Name:</span>
      <span className="text-sm text-white/90">{user.displayName}</span>
    </div>
  </li>

  <li className="mb-2">
    <div className="flex flex-col gap-0.5">
      <span className="font-semibold text-sm">Email:</span>
      <span className="text-sm text-white/90">{user.email}</span>
    </div>
  </li>

  {/* Divider */}
  <li className="my-2 border-t border-white/30"></li>

  {/* Logout Button */}
  <li>
    <button
      onClick={logOutUser} // ✅ Keep the logout function
      className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-400 hover:to-orange-300 transition-all duration-200 font-semibold shadow-md"
    >
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
