import React from "react";
import { FaBrain, FaSmileBeam, FaBolt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const WhyHabits = () => {
  const benefits = [
    {
      title: "Better Focus",
      description:
        "Habits help your mind stay organized and improve concentration throughout the day.",
      icon: <FaBrain className="text-4xl text-orange-500" />,
    },
    {
      title: "Reduced Stress",
      description:
        "A structured routine lowers anxiety and helps you feel more in control.",
      icon: <FaSmileBeam className="text-4xl text-purple-500" />,
    },
    {
      title: "Boost Productivity",
      description:
        "Daily habits make tasks easier and help you achieve more with less effort.",
      icon: <FaBolt className="text-4xl text-yellow-500" />,
    },
    {
      title: "Time Management",
      description:
        "Good habits allow you to manage time efficiently and reduce procrastination.",
      icon: <FaClock className="text-4xl text-blue-500" />,
    },
  ];

  return (
    <div className="py-14 px-6 bg-gradient-to-b from-orange-50 to-purple-50 dark:from-base-200 dark:to-base-300 transition-colors duration-300">
      <h2 className="text-4xl font-extrabold text-center text-orange-600 dark:text-orange-400 mb-10">
        Why Build Habits?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {benefits.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.07 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-base-100 dark:bg-base-200 shadow-lg rounded-xl p-6 flex flex-col items-center text-center border border-base-200 dark:border-base-300 hover:shadow-2xl transition"
          >
            <div className="mb-4">{item.icon}</div>

            <h3 className="text-xl font-bold text-base-content dark:text-base-content mb-2">
              {item.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyHabits;
