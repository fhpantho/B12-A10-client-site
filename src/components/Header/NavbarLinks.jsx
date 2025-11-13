import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "Add Habit", path: "/addhabit" },
  { name: "My Habit", path: "/myhabit" },
  { name: "All Habit", path: "/publichabit" },
];

const NavbarLinks = () => {
  return (
    <>
      {links.map((link) => (
        <li key={link.path}>
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-full font-medium text-white transition-all duration-300
              ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg scale-105"
                  : "bg-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-400 hover:scale-105"
              }`
            }
          >
            {link.name}
          </NavLink>
        </li>
      ))}</>
  );
};

export default NavbarLinks;
