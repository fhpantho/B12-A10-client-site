import HowHabitTrackerWorks from "../components/HowHabitTrackerWorks";
import Testimonials from "../components/Testimonials";
import { NavLink } from "react-router";

export default function About() {
  return (
    <main className="bg-base-200 transition-colors duration-300">
      <div className="container mx-auto px-6 py-16 max-w-5xl">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-base-content mb-4">
            About Habit Tracker
          </h1>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto leading-relaxed">
            Habit Tracker helps you build and maintain good habits by keeping your
            day-to-day progress simple, visible, and motivating. We focus on
            lightweight tracking, positive reinforcement, and community sharing.
          </p>
        </div>

        {/* How it works */}
        <section className="mb-14">
          <div className="bg-base-100 rounded-2xl shadow-xl p-8 md:p-10">
            <h2 className="text-2xl font-bold text-base-content mb-6 text-center">
              How it works
            </h2>
            <HowHabitTrackerWorks />
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-14">
          <div className="bg-base-100 rounded-2xl shadow-xl p-8 md:p-10">
            <h2 className="text-2xl font-bold text-base-content mb-6 text-center">
              What people say
            </h2>
            <Testimonials />
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <NavLink
            to="/singup"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl
                       bg-gradient-to-r from-purple-600 to-pink-500
                       text-white font-semibold text-lg shadow-lg
                       hover:scale-105 transition-transform duration-300"
          >
            Create an account
          </NavLink>
        </div>

      </div>
    </main>
  );
}
