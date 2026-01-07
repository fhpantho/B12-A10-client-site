import React from "react";

const DashboardStats = () => {
  return (
    <div className="bg-base-100 dark:bg-base-200 rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Cards */}
        <div className="p-6 rounded-lg border border-base-content/10 hover:shadow-md transition-shadow bg-base-100">
          <h3 className="text-lg font-semibold mb-2">Total Habits</h3>
          <p className="text-3xl font-bold text-purple-600">0</p>
        </div>
        <div className="p-6 rounded-lg border border-base-content/10 hover:shadow-md transition-shadow bg-base-100">
          <h3 className="text-lg font-semibold mb-2">Completed Today</h3>
          <p className="text-3xl font-bold text-pink-500">0</p>
        </div>
        <div className="p-6 rounded-lg border border-base-content/10 hover:shadow-md transition-shadow bg-base-100">
          <h3 className="text-lg font-semibold mb-2">Streak</h3>
          <p className="text-3xl font-bold text-orange-400">0 Days</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
