import React, { useContext } from "react";
import { Authcontext } from "../context/Authcontext";

const Profile = () => {
  const { user } = useContext(Authcontext);

  return (
    <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-base-200 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
          My Profile
        </h1>

        {user && (
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-500 shadow-lg"
            />

            <div className="space-y-4 text-center md:text-left">
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </h2>
                <p className="text-2xl font-bold">{user.displayName}</p>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Email
                </h2>
                <p className="text-xl">{user.email}</p>
              </div>

              <div className="pt-4">
                <span className="px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 font-medium text-sm">
                  Last Login: {user.metadata?.lastSignInTime}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
