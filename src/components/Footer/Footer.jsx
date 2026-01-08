import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link, NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500 dark:from-base-900 dark:to-base-800 text-white dark:text-gray-300 py-10 mt-10 transition-colors duration-300">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Logo */}
        <NavLink to="/">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xl shadow-md">
              HT
            </div>
            <h2 className="text-2xl font-bold tracking-wide dark:text-white">
              Habit <span className="text-orange-300 dark:text-orange-400">Tracker</span>
            </h2>
          </div>
        </NavLink>

        {/* Contact Info */}
        <div className="text-sm leading-relaxed dark:text-gray-300">
          <p>
            Email:{" "}
            <a
              href="mailto:support@habittracker.com"
              className="underline hover:text-orange-200"
            >
              support@habittracker.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a
              href="tel:+8801234567890"
              className="underline hover:text-orange-200"
            >
              +880 1234-567890
            </a>
          </p>
          <p>Address: Khulna, Bangladesh</p>
        </div>

        {/* Links & Social */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <Link
            to="/terms"
            className="text-sm underline hover:text-orange-200 dark:text-gray-300"
          >
            Terms & Conditions
          </Link>
          <Link
            to="/privacy"
            className="text-sm underline hover:text-orange-200 dark:text-gray-300 mt-1"
          >
            Privacy Policy
          </Link>
          <Link
            to="/contact"
            className="text-sm underline hover:text-orange-200 dark:text-gray-300 mt-1"
          >
            Contact
          </Link>

          <div className="flex gap-4 mt-2 text-lg">
            <a
              href="https://www.facebook.com/f.h.pantho"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-200"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/FHPantho"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-200"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-200"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/in/fhpantho"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-200"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-white/30 dark:border-gray-500 pt-4 text-center text-sm text-white/80 dark:text-gray-400 transition-colors duration-300">
        © {new Date().getFullYear()} Habit Tracker — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
