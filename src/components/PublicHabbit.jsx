import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";

const PublicHabitList = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Aos.init({ duration: 600, easing: "ease-in-out" });
  }, []);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/habbits");
        setHabits(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHabits();
  }, []);

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

  if (!habits.length) {
    return (
      <div className="text-center mt-10 text-gray-500 text-lg">
        No public habits found.
      </div>
    );
  }

  return (
    <div className="py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">
        All Public Habits
      </h2>

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
              {/* Title */}
              <h2 className="text-xl font-bold text-gray-800">{habit.title}</h2>

              {/* Description */}
              <p className="text-gray-600 text-sm line-clamp-3">
                {habit.description}
              </p>

              {/* Creator */}
              <p className="text-gray-500 text-sm">
                <span className="font-semibold text-orange-600">Creator:</span>{" "}
                {habit.userName || "Unknown"}
              </p>

              {/* Category */}
              <p className="text-sm inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
                {habit.category}
              </p>

              {/* Reminder Time */}
              {habit.reminderTime && (
                <p className="text-gray-500 text-sm">
                  Reminder: {habit.reminderTime}
                </p>
              )}

              <button
                className="mt-3 py-2 px-4 bg-gradient-to-r from-orange-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:brightness-110 transition"
                onClick={() => alert(`View details for "${habit.title}"`)}
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
