import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Authcontext } from "../context/Authcontext";

const UpdateHabit = () => {
  const { user } = useContext(Authcontext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [habitData, setHabitData] = useState({
    title: "",
    description: "",
    category: "Morning",
    reminderTime: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const res = await axios.get(
          `https://habit-tracker-server-eight.vercel.app/habbits/${id}`
        );
        setHabitData({
          title: res.data.title || "",
          description: res.data.description || "",
          category: res.data.category || "Morning",
          reminderTime: res.data.reminderTime || "",
          image: res.data.image || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load habit");
      }
    };
    fetchHabit();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabitData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.patch(
        `https://habit-tracker-server-eight.vercel.app/habbits/${id}`,
        {
          ...habitData,
          userEmail: user.email,
        }
      );

      toast.success("Habit updated successfully!");
      navigate("/dashboard/myhabit");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg bg-base-100 dark:bg-base-200 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4 text-center text-base-content dark:text-base-content">
        Update Habit
      </h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <label className="font-semibold text-base-content dark:text-base-content">
          Habit Title
        </label>
        <input
          type="text"
          name="title"
          value={habitData.title}
          onChange={handleChange}
          className="input input-bordered w-full rounded-lg bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content"
          required
        />

        <label className="font-semibold text-base-content dark:text-base-content">
          Description
        </label>
        <textarea
          name="description"
          value={habitData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full rounded-lg bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content"
          required
        />

        <label className="font-semibold text-base-content dark:text-base-content">
          Category
        </label>
        <select
          name="category"
          value={habitData.category}
          onChange={handleChange}
          className="select select-bordered w-full rounded-lg bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content"
        >
          <option>Morning</option>
          <option>Work</option>
          <option>Fitness</option>
          <option>Evening</option>
          <option>Study</option>
        </select>

        <label className="font-semibold text-base-content dark:text-base-content">
          Reminder Time
        </label>
        <input
          type="time"
          name="reminderTime"
          value={habitData.reminderTime}
          onChange={handleChange}
          className="input input-bordered w-full rounded-lg bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content"
          required
        />

        <label className="font-semibold text-base-content dark:text-base-content">
          Image URL (optional)
        </label>
        <input
          type="text"
          name="image"
          value={habitData.image}
          onChange={handleChange}
          className="input input-bordered w-full rounded-lg bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content"
        />

        <label className="font-semibold text-base-content dark:text-base-content">
          User Email
        </label>
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full rounded-lg bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content"
        />

        <label className="font-semibold text-base-content dark:text-base-content">
          User Name
        </label>
        <input
          type="text"
          value={user?.displayName || ""}
          readOnly
          className="input input-bordered w-full rounded-lg bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn w-full bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-semibold flex justify-center items-center gap-2"
        >
          {loading ? "Updating..." : "Update Habit"}
        </button>
      </form>
    </div>
  );
};

export default UpdateHabit;
