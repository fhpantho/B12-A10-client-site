import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { motion } from "framer-motion";
import { Authcontext } from "../context/Authcontext";

import Aos from "aos";
import "aos/dist/aos.css";



const Myhabit = () => {
  const { user } = useContext(Authcontext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      Aos.init({ duration: 700, easing: "fade-up" });
    }, []);

  useEffect(() => {
    const fetchHabits = async () => {
      if (!user?.email) return;
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/habbits", {
          params: { userEmail: user.email },
        });
        setHabits(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg
          className="animate-spin h-10 w-10 text-purple-500"
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
      <div className="text-center mt-10 text-gray-500">
        You have not added any habits yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {habits.map((habit) => (
        <motion.div
        data-aos="fade-up"
          key={habit._id}
          className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={habit.image || "https://via.placeholder.com/400x200"}
            alt={habit.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex flex-col gap-2">
            <h2 className="text-xl font-bold">{habit.title}</h2>
            <p className="text-gray-600 text-sm line-clamp-3">{habit.description}</p>
            <p className="text-gray-500 text-sm">Category: {habit.category}</p>
            <p className="text-gray-500 text-sm">Reminder: {habit.reminderTime}</p>
            <button
              className="mt-2 py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:brightness-110 transition-all"
              onClick={() => alert(`View details for "${habit.title}"`)}
            >
              View Details
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Myhabit;
