import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router";

const categories = ["All", "Morning", "Work", "Fitness", "Study", "Evening"];

const PublicHabitList = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 600, easing: "ease-in-out" });
  }, []);

  const fetchHabits = useCallback(async () => {
    try {
      setIsFetching(true);

      const response = await axios.get(
        "https://habit-tracker-server-eight.vercel.app/habbits",
        {
          params: {
            search: search || undefined,
            category: activeCategory !== "All" ? activeCategory : undefined,
          },
        }
      );

      setHabits(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
      setLoading(false);
    }
  }, [search, activeCategory]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchHabits();
    }, 300);

    return () => clearTimeout(delay);
  }, [fetchHabits]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg
          className="animate-spin h-10 w-10 text-primary"
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
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="py-10 px-6 transition-colors duration-300 bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content">
      <h2 className="text-3xl font-bold text-center text-primary dark:text-secondary mb-8">
        Public Habits
      </h2>

      {/* Search + Filter */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <input
          type="text"
          placeholder="Search habits..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-base-300 dark:border-base-400 rounded-lg shadow-sm focus:ring-2 focus:ring-primary outline-none transition-colors duration-300 bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content"
        />

        {/* Category Filter */}
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 border border-base-300 dark:border-base-400 rounded-lg shadow-sm focus:ring-2 focus:ring-primary outline-none transition-colors duration-300 bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content"
        >
          {categories.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Loader */}
      {isFetching && (
        <div className="flex justify-center py-4">
          <svg
            className="animate-spin h-8 w-8 text-primary"
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
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
        </div>
      )}

      {/* No Results */}
      {habits.length === 0 && !isFetching && (
        <div className="text-center text-base-content/70 dark:text-base-content/50 text-lg mt-6">
          No habits found.
        </div>
      )}

      {/* Habit Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {habits.map((habit) => (
          <motion.div
            data-aos="fade-up"
            key={habit._id}
            whileHover={{ scale: 1.03 }}
            className="bg-base-200 dark:bg-base-300 shadow-lg rounded-xl overflow-hidden border border-base-300 dark:border-base-400 hover:shadow-2xl transition-colors duration-300"
          >
            <img
              src={habit.image || "https://via.placeholder.com/400x200"}
              alt={habit.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5 flex flex-col gap-2">
              <h2 className="text-xl font-bold text-base-content dark:text-base-content">
                {habit.title}
              </h2>
              <p className="text-base-content/70 dark:text-base-content/50 text-sm line-clamp-3">
                {habit.description}
              </p>
              <p className="text-base-content/70 dark:text-base-content/50 text-sm">
                <span className="font-semibold text-primary dark:text-secondary">
                  Creator:
                </span>{" "}
                {habit.userName || "Unknown"}
              </p>

              <h1 className="text-sm bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary px-3 py-1 rounded-full mb-4">
                {habit.category}
              </h1>

              {habit.reminderTime && (
                <p className="text-base-content/70 dark:text-base-content/50 text-sm">
                  Reminder: {habit.reminderTime}
                </p>
              )}

              <button
                onClick={() => navigate(`/habbitdetails/${habit._id}`)}
                className="cursor-pointer mt-3 py-2 px-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow-md hover:brightness-110 transition"
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
