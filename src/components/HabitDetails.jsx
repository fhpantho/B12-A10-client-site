import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";

const HabitDetails = () => {
  const { id } = useParams();
  const { user, loading: userLoading } = useContext(Authcontext);

  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch habit details
  useEffect(() => {
    const fetchHabit = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://habit-tracker-server-eight.vercel.app/habbits/${id}`
        );
        setHabit(res.data);
      } catch (err) {
        setError("Failed to fetch habit details");
      } finally {
        setLoading(false);
      }
    };
    fetchHabit();
  }, [id]);

  if (userLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10 text-base-content dark:text-base-content">
        Please login to view this habit.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error)
    return <p className="text-center text-red-500 dark:text-red-400">{error}</p>;
  if (!habit)
    return (
      <p className="text-center text-base-content dark:text-base-content">
        No Habit Found
      </p>
    );

  // Calculate progress (last 30 days)
  const calculateProgress = () => {
    const history = habit.completionHistory || [];
    const today = new Date();
    const last30 = [];

    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      last30.push(d.toISOString().slice(0, 10));
    }

    const completed = history.filter((d) => last30.includes(d));
    return Math.round((completed.length / 30) * 100);
  };

  // Calculate streak
  const calculateStreak = () => {
    const history = (habit.completionHistory || []).sort().reverse();
    let streak = 0;
    let current = new Date().toISOString().slice(0, 10);

    for (let d of history) {
      if (d === current) {
        streak++;
        const date = new Date(current);
        date.setDate(date.getDate() - 1);
        current = date.toISOString().slice(0, 10);
      } else break;
    }
    return streak;
  };

  // Already completed?
  const completedToday = habit.completionHistory?.includes(
    new Date().toISOString().slice(0, 10)
  );

  // Mark Complete
  const markComplete = async () => {
    if (!user?.email) {
      alert("User email not loaded yet!");
      return;
    }

    try {
      const res = await axios.patch(
        `https://habit-tracker-server-eight.vercel.app/habbits/${habit._id}/complete`,
        { userEmail: user.email }
      );

      if (res.status === 200) {
        const today = new Date().toISOString().slice(0, 10);
        setHabit({
          ...habit,
          completionHistory: [...(habit.completionHistory || []), today],
        });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to mark complete");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-base-100 dark:bg-base-200 rounded-lg shadow-lg transition-colors duration-300">
      {/* Habit Image */}
      <img
        src={habit.image || "https://via.placeholder.com/800x400"}
        alt={habit.title}
        className="w-full h-60 object-cover rounded-lg mb-5"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold mb-3 text-base-content dark:text-base-content">
        {habit.title}
      </h1>
      <p className="mb-5 text-base-content/80 dark:text-base-content/90">
        {habit.description}
      </p>

      {/* Category & Creator */}
      <p className="text-sm mb-2 text-base-content/70 dark:text-base-content/80">
        <span className="font-semibold">Category:</span> {habit.category}
      </p>
      <p className="text-sm mb-4 text-base-content/70 dark:text-base-content/80">
        <span className="font-semibold">Creator:</span> {habit.userName || "Unknown"}
      </p>

      {/* Progress */}
      <div className="mb-4">
        <p className="font-semibold mb-1 text-base-content dark:text-base-content">
          Progress (last 30 days): {calculateProgress()}%
        </p>
        <div className="w-full bg-base-300 dark:bg-base-400 rounded-full h-3">
          <div
            className="bg-orange-500 h-3 rounded-full"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>

      {/* Streak */}
      <p className="font-semibold mb-5 text-orange-500 dark:text-orange-400">
        🔥 Streak: {calculateStreak()} days
      </p>

      {/* Mark Complete */}
      {user.email === habit.userEmail ? (
        completedToday ? (
          <button
            disabled
            className="py-2 px-4 bg-base-300 dark:bg-base-400 text-base-content dark:text-base-content rounded-lg shadow cursor-not-allowed"
          >
            Completed for today
          </button>
        ) : (
          <button
            onClick={markComplete}
            className="py-2 px-4 bg-orange-500 dark:bg-orange-400 text-white rounded-lg shadow hover:bg-orange-600 dark:hover:bg-orange-300 transition cursor-pointer"
          >
            Mark Complete
          </button>
        )
      ) : (
        <p className="font-semibold text-base-content/70 dark:text-base-content/80">
          You can only watch this habit
        </p>
      )}
    </div>
  );
};

export default HabitDetails;
