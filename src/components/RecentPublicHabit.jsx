import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router";

const RecentPublicHabits = () => {
  const [habbits, setHabbits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://habit-tracker-server-eight.vercel.app/habbits?home=true")
      .then((res) => {
        setHabbits(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="py-10 transition-colors duration-300 bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary dark:text-secondary">
        Recent Public Habits
      </h1>

      {/* If no habits */}
      {habbits.length === 0 && (
        <p className="text-center text-base-content/70 dark:text-base-content/50 text-lg">
          There is no habit
        </p>
      )}

      {/* Habit Cards */}
      {habbits.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10">
          {habbits.map((item) => (
            <motion.div
              key={item._id}
              data-aos="fade-up"
              whileHover={{ scale: 1.03 }}
              className="shadow-lg rounded-xl p-5 bg-base-200 dark:bg-base-300 hover:shadow-2xl transition-colors duration-300 border border-base-300 dark:border-base-400"
            >
              {/* Habit Image */}
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-40 w-full object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="h-40 w-full bg-primary/20 dark:bg-primary/30 rounded-lg mb-4 flex items-center justify-center text-primary dark:text-primary font-semibold">
                  No Image
                </div>
              )}

              {/* Habit Title */}
              <h2 className="text-xl font-bold mb-2 text-base-content dark:text-base-content">
                {item.title}
              </h2>

              {/* Short Description */}
              <p className="text-base-content/70 dark:text-base-content/50 mb-3">
                {item.description.slice(0, 60)}...
              </p>

              {/* Creator */}
              <p className="text-sm mb-3 text-base-content/70 dark:text-base-content/50">
                <span className="font-semibold text-primary dark:text-secondary">
                  Creator:{" "}
                </span>
                {item.userName || "Unknown"}
              </p>

              {/* Category */}
              <p className="text-sm bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary inline-block px-3 py-1 rounded-full mb-4">
                {item.category}
              </p>

              {/* View Details */}
              <button
                onClick={() => navigate(`/habbitdetails/${item._id}`)}
                className="cursor-pointer mt-3 py-2 px-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow-md hover:brightness-110 transition w-full"
              >
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <div className="text-center flex items-center justify-center my-20">
        <NavLink
          to="/publichabit"
          className="btn px-4 py-2 rounded-full font-medium text-white transition-all duration-300 bg-primary hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:scale-105"
        >
          Browse All Habit
        </NavLink>
      </div>
    </div>
  );
};

export default RecentPublicHabits;
