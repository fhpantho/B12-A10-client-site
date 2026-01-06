import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";
import { Authcontext } from "../context/Authcontext";
import toast from "react-hot-toast";
import { NavLink } from "react-router";

const Myhabit = () => {
  const { user } = useContext(Authcontext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);

  useEffect(() => {
    const fetchHabits = async () => {
      if (!user?.email) return;
      try {
        setLoading(true);
        const response = await axios.get("https://habit-tracker-server-eight.vercel.app/habbits", {
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

  if (!habits.length) {
    return (
      <div className="text-center mt-10 text-base-content/70 dark:text-base-content/50 text-lg">
        You have not added any habits yet.
      </div>
    );
  }

  const handleDelete = async (id) => {
    if (!user?.email) return toast.error("You must be logged in!");

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://habit-tracker-server-eight.vercel.app/habbits/${id}`, {
          data: { userEmail: user.email },
        });

        toast.success("Habit deleted successfully!");
        setHabits((prev) => prev.filter((h) => h._id.toString() !== id.toString()));
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Delete failed");
      }
    }
  };

  const handleComplete = async (habit) => {
    if (!user?.email) return toast.error("You must be logged in!");

    try {
      const res = await axios.patch(
        `https://habit-tracker-server-eight.vercel.app/habbits/${habit._id}/complete`,
        { userEmail: user.email }
      );

      toast.success("Marked as completed!");
      setHabits((prev) =>
        prev.map((h) =>
          h._id === habit._id
            ? { ...h, completionHistory: res.data.completionHistory }
            : h
        )
      );
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to complete";
      toast.error(msg);
    }
  };

  return (
    <motion.div
      data-aos="fade-up"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 transition-colors duration-300 bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content"
    >
      <h1 className="text-3xl font-bold mb-6 text-primary dark:text-secondary">My Habits</h1>

      <div className="overflow-x-auto shadow-lg rounded-xl border border-base-300 dark:border-base-400">
        <table className="w-full text-left">
          <thead className="bg-base-200 dark:bg-base-300">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Current Streak</th>
              <th className="p-4">Created Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {habits.map((habit) => {
              const today = new Date().toISOString().split("T")[0];
              const completedToday = habit.completionHistory?.includes(today);

              return (
                <tr
                  key={habit._id}
                  className="border-t hover:bg-base-200/50 dark:hover:bg-base-300/50 transition"
                >
                  <td className="p-4 font-semibold">{habit.title}</td>
                  <td className="p-4">{habit.category}</td>
                  <td className="p-4 text-center">
                    {habit.completionHistory?.length || 0}
                  </td>
                  <td className="p-4">
                    {habit.createdAt
                      ? new Date(habit.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4 flex gap-3 items-center">
                    <NavLink to={`/updatehabit/${habit._id}`}>
                      <button className="px-3 py-1 rounded bg-primary text-white hover:bg-primary-focus transition">
                        Update
                      </button>
                    </NavLink>

                    <button
                      className="px-3 py-1 rounded bg-error text-white hover:bg-error-focus transition"
                      onClick={() => handleDelete(habit._id)}
                    >
                      Delete
                    </button>

                    <button
                      disabled={completedToday}
                      onClick={() => !completedToday && handleComplete(habit)}
                      className={`px-3 py-1 rounded text-white transition ${
                        completedToday
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-success hover:bg-success-focus"
                      }`}
                    >
                      {completedToday ? "Completed Today" : "Complete"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Myhabit;
