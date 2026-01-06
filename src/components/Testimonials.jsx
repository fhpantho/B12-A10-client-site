import React from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const reviews = [
    {
      name: "Sara Khan",
      text: "Habit Tracker completely changed my routine. I never miss my morning workout now!",
      color: "from-orange-500 to-pink-500",
    },
    {
      name: "Rafiul Islam",
      text: "The streak system keeps me motivated every day. Super clean UI!",
      color: "from-purple-500 to-indigo-500",
    },
    {
      name: "Jannat Tasnim",
      text: "Tracking habits became fun instead of stressful. Highly recommended!",
      color: "from-green-500 to-teal-500",
    },
  ];

  return (
    <div className="py-16 px-6 transition-colors duration-300 bg-base-100 dark:bg-base-200">
      <h2 className="text-4xl font-extrabold text-center text-primary dark:text-secondary mb-12">
        What Our Users Say
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-xl shadow-lg transition-colors duration-300 text-base-content dark:text-base-content bg-gradient-to-br ${review.color}`}
          >
            <p className="text-sm italic mb-4">"{review.text}"</p>
            <h3 className="font-bold text-lg">— {review.name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
