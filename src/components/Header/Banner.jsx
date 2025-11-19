import React from "react";
import Slider from "react-slick";
import { Typewriter } from "react-simple-typewriter";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
    pauseOnHover: true,
    arrows: true,
  };

  const slides = [
    {
      image: "https://i.ibb.co/xSjq4MrQ/or-just-do-it-with-someone-1680909068.webp",
      words: ["Build Healthy Habits", "Stay Motivated Every Day"],
      description: "Track your daily habits and achieve your goals.",
      buttonText: <NavLink to = "/myhabit">Track Your Habit</NavLink>,
      buttonColor: "text-purple-600",
    },
    {
      image: "https://i.ibb.co/7NT19gmj/build-new-habits-one-at-a-time-1680909068.webp",
      words: ["Stay Consistent", "Build Streaks & Achieve Goals"],
      description: "Consistency is the key to success.",
      buttonText: <NavLink to = "/addhabit">Add Your Habit</NavLink>,
      buttonColor: "text-green-600",
    },
    {
      image: "https://i.ibb.co/RTG4Yczv/images.jpg",
      words: ["Track Your Progress", "Improve Your Lifestyle"],
      description: "Analyze your habits over time and become your best self.",
      buttonText: <NavLink to = "/publichabit">View All Habit</NavLink>,
      buttonColor: "text-pink-600",
    },
  ];

  return (
    <div className="max-full overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[70vh] lg:h-[90vh] w-full">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                <Typewriter
                  words={slide.words}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </h2>
              <p className="text-lg lg:text-xl text-white mb-6 drop-shadow-md">
                {slide.description}
              </p>
              <button
                className={`px-6 py-2 rounded-full bg-white/90 ${slide.buttonColor} font-semibold shadow-lg hover:bg-white transition duration-200`}
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
