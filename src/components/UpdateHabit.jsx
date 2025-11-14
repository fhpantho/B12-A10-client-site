import React, { useState, useEffect, useContext } from "react";
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
        const res = await axios.get(`http://localhost:3000/habbits/${id}`);
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
      await axios.patch(`http://localhost:3000/habbits/${id}`, {
        ...habitData,
        userEmail: user.email,
      });

      toast.success("Habit updated successfully!");
      navigate("/myhabit");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Habit</h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <label className="font-semibold">Habit Title</label>
        <input
          type="text"
          name="title"
          value={habitData.title}
          onChange={handleChange}
          className="input input-bordered w-full rounded-lg"
          required
        />

        <label className="font-semibold">Description</label>
        <textarea
          name="description"
          value={habitData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full rounded-lg"
          required
        />

        <label className="font-semibold">Category</label>
        <select
          name="category"
          value={habitData.category}
          onChange={handleChange}
          className="select select-bordered w-full rounded-lg"
        >
          <option>Morning</option>
          <option>Work</option>
          <option>Fitness</option>
          <option>Evening</option>
          <option>Study</option>
        </select>

        <label className="font-semibold">Reminder Time</label>
        <input
          type="time"
          name="reminderTime"
          value={habitData.reminderTime}
          onChange={handleChange}
          className="input input-bordered w-full rounded-lg"
          required
        />

        <label className="font-semibold">Image URL (optional)</label>
        <input
          type="text"
          name="image"
          value={habitData.image}
          onChange={handleChange}
          className="input input-bordered w-full rounded-lg"
        />

        <label className="font-semibold">User Email</label>
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full rounded-lg bg-gray-100"
        />

        <label className="font-semibold">User Name</label>
        <input
          type="text"
          value={user?.displayName || ""}
          readOnly
          className="input input-bordered w-full rounded-lg bg-gray-100"
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
