import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { Authcontext } from "../../context/Authcontext";
import { toast } from "react-hot-toast";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const { signInWithGoogle, signInUser } = useContext(Authcontext);
  const [loading, setLoading] = useState(false);

  // Auto hide errors after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Google login
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        console.log(res.user);
        toast.success("Logged in with Google successfully!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google login failed");
      });
  };

  // Email & password login
  const handleSignInWithEmail = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    const errors = [];
    if (!email) errors.push("Email is required");
    if (!password) errors.push("Password is required");
    if (password && !/[A-Z]/.test(password)) errors.push("1 uppercase letter required");
    if (password && !/[a-z]/.test(password)) errors.push("1 lowercase letter required");
    if (password && password.length < 6) errors.push("Password must be at least 6 characters");

    if (errors.length > 0) {
      setError(errors.join(". "));
      return;
    }

    setError("");
    setLoading(true);

    signInUser(email, password)
      .then((res) => {
        console.log(res.user);
        toast.success("Logged in successfully!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 px-4">
      <div className="max-w-4xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div className="text-white text-center lg:text-left">
          <h1 className="text-5xl font-bold mb-2">
            Welcome <span className="text-yellow-300">Back</span>
          </h1>
          <h2 className="text-4xl font-semibold mb-4">Login Now!</h2>
          <p className="text-lg">
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="text-blue-300 underline hover:text-yellow-300 transition-colors"
            >
              Sign Up Now!
            </NavLink>
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="bg-white/90 dark:bg-gray-800 dark:text-gray-200 backdrop-blur-md shadow-2xl rounded-xl p-8 w-full">
          <form onSubmit={handleSignInWithEmail} className="flex flex-col gap-4">
            <label className="label font-semibold">Email</label>
            <input
              type="email"
              name="email"
              aria-label="Email address"
              placeholder="Email"
              className="input input-bordered w-full rounded-lg"
            />

            <label className="label font-semibold">Password</label>
            <input
              type="password"
              name="password"
              aria-label="Password"
              placeholder="Password"
              className="input input-bordered w-full rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-400 hover:to-orange-300 text-white font-semibold shadow-md transition-all duration-200 flex justify-center items-center gap-2"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* OR Divider */}
            <div className="text-center text-gray-500 my-2">— OR —</div>
          </form>

          {/* Google Login */}
          <button
            onClick={handleGoogleSignIn}
            className="btn w-full flex items-center justify-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100 hover:scale-105 transition-transform duration-200 mt-2"
          >
            <svg
              aria-label="Google logo"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="M0 0h512v512H0z" fill="#fff" />
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                <path fill="#4285f4" d="m386 400 53-179H260v74h102q-7 37-38 57" />
                <path fill="#fbbc02" d="M90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                <path fill="#ea4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
              </g>
            </svg>
            Login with Google
          </button>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm mt-3 w-full text-center transition-opacity duration-300">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
