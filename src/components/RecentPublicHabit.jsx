import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router';

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
        <div className="animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-orange-600">
        Recent Public Habits
      </h1>

      {/* If no habits */}
      {habbits.length === 0 && (
        <p className="text-center text-gray-600 text-lg">
          There is no habit
        </p>
      )}

      {/* Habit Cards */}
      {habbits.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10">
          {habbits.map((item, index) => (
            <motion.div
              key={item._id}
              data-aos="fade-up"
              whileHover={{ scale: 1.03 }}
              
              className="shadow-lg rounded-xl p-5 bg-white hover:shadow-2xl transition duration-300"
            >
              
              {/* Habit Image */}
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-40 w-full object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="h-40 w-full bg-orange-100 rounded-lg mb-4 flex items-center justify-center text-orange-500 font-semibold">
                  No Image
                </div>
              )}

              {/* Habit Title */}
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                {item.title}
              </h2>

              {/* Short Description */}
              <p className="text-gray-600 mb-3">
                {item.description.slice(0, 60)}...
              </p>

              {/* Creator */}
              <p className="text-sm text-gray-500 mb-3">
                <span className="font-semibold text-orange-600">Creator: </span>
                {item.userName || "Unknown"}
              </p>

              {/* Category */}
              <p className="text-sm bg-orange-100 text-orange-700 inline-block px-3 py-1 rounded-full mb-4">
                {item.category}
              </p>

              {/* View Details */}
              <button
                onClick={() => navigate(`/habbitdetails/${item._id}`)}
                className="cursor-pointer mt-3 py-2 px-4 bg-gradient-to-r from-orange-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:brightness-110 transition w-full"
              >
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      )}
      <div className="text-center flex items-center justify-center my-20">
        <NavLink to ="/publichabit" className="btn px-4 py-2 rounded-full font-medium text-white transition-all duration-300 bg-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-400 hover:scale-105">Browse All Habit</NavLink>
      </div>
      
    </div>
  );
};

export default RecentPublicHabits;
