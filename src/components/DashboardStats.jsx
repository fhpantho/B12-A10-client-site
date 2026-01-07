import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../context/Authcontext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const DashboardStats = () => {
  const { user } = useContext(Authcontext);
  const [stats, setStats] = useState({
    totalHabits: 0,
    completedToday: 0,
    maxStreak: 0,
    completionData: [],
  });

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/dashboard-stats?userEmail=${user.email}`)
        .then((res) => res.json())
        .then((data) => setStats(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="bg-base-100 dark:bg-base-200 rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-lg border border-base-content/10 hover:shadow-md transition-shadow bg-base-100 dark:bg-base-300">
          <h3 className="text-lg font-semibold mb-2">Total Habits</h3>
          <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
            {stats.totalHabits}
          </p>
        </div>
        <div className="p-6 rounded-lg border border-base-content/10 hover:shadow-md transition-shadow bg-base-100 dark:bg-base-300">
          <h3 className="text-lg font-semibold mb-2">Completed Today</h3>
          <p className="text-4xl font-bold text-pink-500 dark:text-pink-400">
            {stats.completedToday}
          </p>
        </div>
        <div className="p-6 rounded-lg border border-base-content/10 hover:shadow-md transition-shadow bg-base-100 dark:bg-base-300">
          <h3 className="text-lg font-semibold mb-2">Longest Streak</h3>
          <p className="text-4xl font-bold text-orange-400">
            {stats.maxStreak}{" "}
            <span className="text-sm text-base-content/60">Days</span>
          </p>
        </div>
      </div>

      <div className="bg-base-100 dark:bg-base-300 p-6 rounded-xl border border-base-content/10">
        <h3 className="text-xl font-semibold mb-6">
          Completion History (Last 7 Days)
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.completionData}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                }}
                cursor={{ fill: "rgba(255,255,255,0.1)" }}
              />
              <Bar
                dataKey="count"
                fill="url(#colorCount)"
                radius={[4, 4, 0, 0]}
                barSize={40}
              >
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
