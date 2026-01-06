import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />

      {/* Sun */}
      <svg className="swap-off h-6 w-6 fill-current" viewBox="0 0 24 24">
        <path d="M5 12a7 7 0 1014 0 7 7 0 00-14 0z" />
      </svg>

      {/* Moon */}
      <svg className="swap-on h-6 w-6 fill-current" viewBox="0 0 24 24">
        <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
      </svg>
    </label>
  );
};

export default ThemeToggle;
