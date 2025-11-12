import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Authcontext } from '../../context/Authcontext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(Authcontext);

  const logOutUser = () => {
    logout()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate('/');
      })
      .catch(err => toast.error(err.message));
  };

  const link = (
    <>
      <li><NavLink to="/">HOME</NavLink></li>
      <li><NavLink to="/">ADD HABIT</NavLink></li>
      <li><NavLink to="/">MY HABIT</NavLink></li>
      <li><NavLink to="/publichabit">ALL HABIT</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
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
          <div className="flex gap-5 items-center">
            <Link to="/">{user.photoURL && (
              <img
                src={user.photoURL}
                alt="User"
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
                referrerPolicy="no-referrer"
              />
            )}</Link>
            <button className="btn" onClick={logOutUser}>
              Log out
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="btn">
            Log-in
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
