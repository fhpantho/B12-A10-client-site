import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";

const categories = ["All", "Morning", "Work", "Fitness", "Study", "Evening"];

const PublicHabitList = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Animation Init
  useEffect(() => {
    Aos.init({ duration: 600, easing: "ease-in-out" });
  }, []);

  // Fetch habits from backend with search + category
  const fetchHabits = async () => {
    try {
      setLoading(true);

      const response = await axios.get("http://localhost:3000/habbits", {
        params: {
          search: search || undefined,
          category: activeCategory !== "All" ? activeCategory : undefined,
        },
      });

      setHabits(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page loads + when search/category changes
  useEffect(() => {
    fetchHabits();
  }, [search, activeCategory]);

  // Loading Screen
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg
          className="animate-spin h-10 w-10 text-orange-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">
        Public Habits
      </h2>

      {/* Search + Filter Section */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <input
          type="text"
          placeholder="Search habits..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 outline-none"
        />

        {/* Category Filter */}
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 outline-none"
        >
          {categories.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* No Results */}
      {habits.length === 0 && (
        <div className="text-center text-gray-500 text-lg">No habits found.</div>
      )}

      {/* Habit Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {habits.map((habit) => (
          <motion.div
            data-aos="fade-up"
            key={habit._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition"
          >
            {/* Habit Image */}
            <img
              src={habit.image || "https://via.placeholder.com/400x200"}
              alt={habit.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5 flex flex-col gap-2">
              <h2 className="text-xl font-bold text-gray-800">{habit.title}</h2>

              <p className="text-gray-600 text-sm line-clamp-3">
                {habit.description}
              </p>

              <p className="text-gray-500 text-sm">
                <span className="font-semibold text-orange-600">Creator:</span>{" "}
                {habit.userName || "Unknown"}
              </p>

              <h1 className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full mb-4 ">
                {habit.category}
              </h1>

              {habit.reminderTime && (
                <p className="text-gray-500 text-sm">
                  Reminder: {habit.reminderTime}
                </p>
              )}

              <button
                className="mt-3 py-2 px-4 bg-gradient-to-r cursor-pointer from-orange-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:brightness-110 transition"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PublicHabitList;
