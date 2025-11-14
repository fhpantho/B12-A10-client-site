import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Authcontext } from "../context/Authcontext";
import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";

const Myhabit = () => {
  const { user } = useContext(Authcontext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // AOS Init
  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);

  // Fetch User Habits
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

  // Loading Spinner
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

  // No Habits
  if (!habits.length) {
    return (
      <div className="text-center mt-10 text-gray-500 text-lg">
        You have not added any habits yet.
      </div>
    );
  }

  // Handler: Delete Habit
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this habit?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/habbits/${id}`);
      setHabits(habits.filter((h) => h._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Handler: Mark Complete
  const handleComplete = async (habit) => {
    try {
      const updated = {
        ...habit,
        currentStreak: (habit.currentStreak || 0) + 1,
      };

      await axios.put(`http://localhost:3000/habbits/${habit._id}`, updated);

      setHabits((prev) =>
        prev.map((h) => (h._id === habit._id ? updated : h))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      data-aos="fade-up"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold mb-6 text-purple-600">My Habits</h1>

      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-purple-50">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Current Streak</th>
              <th className="p-4">Created Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {habits.map((habit) => (
              <tr
                key={habit._id}
                className="border-t hover:bg-purple-50/40 transition"
              >
                <td className="p-4 font-semibold">{habit.title}</td>

                <td className="p-4">{habit.category}</td>

                <td className="p-4 text-center">{habit.currentStreak || 0}</td>

                <td className="p-4">
                  {habit.createdAt
                    ? new Date(habit.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="p-4 flex gap-3">
                  <button
                    className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => alert("Update Feature Coming Soon")}
                  >
                    Update
                  </button>

                  <button
                    className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                    onClick={() => handleDelete(habit._id)}
                  >
                    Delete
                  </button>

                  <button
                    className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                    onClick={() => handleComplete(habit)}
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Myhabit;
