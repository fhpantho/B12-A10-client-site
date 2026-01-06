import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Authcontext } from "../context/Authcontext";

const AddHabbit = () => {
  const { user } = useContext(Authcontext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Morning");
  const [reminderTime, setReminderTime] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const currentDate = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const habitData = {
      title,
      description,
      category,
      reminderTime,
      image,
      userEmail: user?.email,
      userName: user?.displayName,
      createdAt: new Date(),
    };

    try {
      await axios.post("https://habit-tracker-server-eight.vercel.app/habbits", habitData);
      toast.success("Habit added successfully!");
      setTitle("");
      setDescription("");
      setCategory("Morning");
      setReminderTime("");
      setImage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add habit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 dark:bg-base-200 shadow-lg rounded-lg transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4 text-center text-base-content dark:text-base-content">
        Add Habit
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Habit Title */}
        <label className="font-semibold text-base-content dark:text-base-content">
          Habit Title
        </label>
        <input
          type="text"
          placeholder="Enter habit title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full rounded-lg bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content"
          required
        />

        {/* Description */}
        <label className="font-semibold text-base-content dark:text-base-content">
          Description
        </label>
        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full rounded-lg bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content"
          required
        />

        {/* Category */}
        <label className="font-semibold text-base-content dark:text-base-content">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full rounded-lg bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content"
        >
          <option>Morning</option>
          <option>Work</option>
          <option>Fitness</option>
          <option>Evening</option>
          <option>Study</option>
        </select>

        {/* Reminder Time */}
        <label className="font-semibold text-base-content dark:text-base-content">
          Reminder Time
        </label>
        <input
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="input input-bordered w-full rounded-lg bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content"
          required
        />

        {/* Image URL */}
        <label className="font-semibold text-base-content dark:text-base-content">
          Image URL (optional)
        </label>
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="input input-bordered w-full rounded-lg bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content"
        />

        {/* User Email */}
        <label className="font-semibold text-base-content dark:text-base-content">
          User Email
        </label>
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full rounded-lg bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content"
        />

        {/* User Name */}
        <label className="font-semibold text-base-content dark:text-base-content">
          User Name
        </label>
        <input
          type="text"
          value={user?.displayName || ""}
          readOnly
          className="input input-bordered w-full rounded-lg bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content"
        />

        {/* Created Date */}
        <label className="font-semibold text-base-content dark:text-base-content">
          Created Date
        </label>
        <input
          type="text"
          value={currentDate}
          readOnly
          className="input input-bordered w-full rounded-lg bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn w-full bg-gradient-to-r from-orange-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:brightness-110 transition flex justify-center items-center gap-2"
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
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
          )}
          {loading ? "Saving..." : "Add Habit"}
        </button>
      </form>
    </div>
  );
};

export default AddHabbit;
