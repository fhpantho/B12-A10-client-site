import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link, NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500 text-white py-10 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        

       <NavLink to ="/">
         <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold text-xl shadow-md">
            HT
          </div>
          <h2 className="text-2xl font-bold tracking-wide">
            Habit <span className="text-orange-300">Tracker</span>
          </h2>
        </div>
       </NavLink>


        <div className="text-sm leading-relaxed">
          <p>Email: <a href="mailto:support@habittracker.com" className="underline hover:text-orange-200">support@habittracker.com</a></p>
          <p>Phone: <a href="tel:+8801234567890" className="underline hover:text-orange-200">+880 1234-567890</a></p>
          <p>Address: Khulna, Bangladesh</p>
        </div>


        <div className="flex flex-col items-start md:items-end gap-3">
          <Link to="/terms" className="text-sm underline hover:text-orange-200">
            Terms & Conditions
          </Link>

          <div className="flex gap-4 mt-2 text-lg">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-orange-200">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-orange-200">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-orange-200">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-orange-200">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>


      <div className="mt-8 border-t border-white/30 pt-4 text-center text-sm text-white/80">
        © {new Date().getFullYear()} Habit Tracker — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
