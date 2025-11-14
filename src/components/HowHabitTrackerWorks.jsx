import React from "react";
import { FaEdit, FaCheckCircle, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

const HowHabitTrackerWorks = () => {
  const steps = [
    {
      icon: <FaEdit className="text-4xl text-purple-600" />,
      title: "Create Your Habit",
      desc: "Add a new habit with reminders, categories, and images.",
    },
    {
      icon: <FaCheckCircle className="text-4xl text-orange-500" />,
      title: "Track Daily Progress",
      desc: "Mark habits as complete every day and build streaks.",
    },
    {
      icon: <FaChartLine className="text-4xl text-green-600" />,
      title: "See Your Improvements",
      desc: "Visualize your streaks and progress over time.",
    },
  ];

  return (
    <div className="bg-white py-16 px-6">
      <h2 className="text-4xl font-extrabold text-center text-purple-600 mb-12">
        How Habit Tracker Works
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.25 }}
            className="bg-gradient-to-br from-purple-50 to-orange-50 p-6 rounded-xl shadow-lg border border-purple-200 text-center"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowHabitTrackerWorks;
