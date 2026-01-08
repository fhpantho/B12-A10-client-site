import React from "react";
import Slider from "react-slick";
import { Typewriter } from "react-simple-typewriter";
import { NavLink } from "react-router";
import { motion } from "framer-motion";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    arrows: true,
  };

  const slides = [
    {
      image: "https://i.ibb.co/xSjq4MrQ/or-just-do-it-with-someone-1680909068.webp",
      words: ["Build Healthy Habits", "Stay Motivated Every Day"],
      description: "Track your daily habits and achieve your goals.",
      link: "/dashboard/my-habit",
      button: "Track Your Habit",
    },
    {
      image: "https://i.ibb.co/7NT19gmj/build-new-habits-one-at-a-time-1680909068.webp",
      words: ["Stay Consistent", "Build Powerful Streaks"],
      description: "Consistency is the real superpower.",
      link: "/dashboard/add-habit",
      button: "Add Your Habit",
    },

    {
      image: "https://i.ibb.co/RTG4Yczv/images.jpg",
      words: ["Track Progress", "Upgrade Your Lifestyle"],
      description: "Analyze habits and become your best self.",
      link: "/publichabit",
      button: "Explore Habits",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[60vh] md:h-[65vh] w-full">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg"
              >
                <Typewriter
                  words={slide.words}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-base md:text-xl text-white/90 mb-6 max-w-2xl"
              >
                {slide.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <NavLink
                  to={slide.link}
                  className="inline-block px-7 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition"
                >
                  {slide.button}
                </NavLink>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Scroll Hint */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center"
        >
          <span className="w-1.5 h-1.5 bg-white rounded-full mt-2"></span>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
