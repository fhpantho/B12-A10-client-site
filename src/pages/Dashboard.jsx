import React, { useContext } from "react";
import { Link, Outlet } from "react-router";
import { Authcontext } from "../context/Authcontext";

const Dashboard = () => {
  const { user } = useContext(Authcontext);

  return (
    <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="md:w-1/4">
        {user && (
          <div className="bg-base-100 dark:bg-base-200 rounded-xl shadow-lg p-6 flex flex-col items-center text-center sticky top-24">
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 mb-4"
            />
            <h2 className="text-xl font-bold text-base-content">
              {user.displayName}
            </h2>
            <p className="text-sm text-base-content/70 mb-6">{user.email}</p>

            <div className="w-full flex flex-col gap-2">
              <Link
                to="/dashboard/profile"
                className="btn btn-ghost justify-start gap-3 w-full hover:bg-purple-100 dark:hover:bg-purple-900/20 text-base-content"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </Link>
              <Link
                to="/dashboard/addhabit"
                className="btn btn-ghost justify-start gap-3 w-full hover:bg-pink-100 dark:hover:bg-pink-900/20 text-base-content"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-pink-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Habbit
              </Link>
              <Link
                to="/dashboard/myhabit"
                className="btn btn-ghost justify-start gap-3 w-full hover:bg-orange-100 dark:hover:bg-orange-900/20 text-base-content"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-orange-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                My Habbit
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="md:w-3/4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
