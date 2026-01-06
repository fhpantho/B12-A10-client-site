import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { Authcontext } from "../../context/Authcontext";
import { updateProfile } from "firebase/auth";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, createUser } = useContext(Authcontext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-hide error
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleGoogleSignUp = () => {
    signInWithGoogle()
      .then((res) => {
        console.log(res.user);
        toast.success("Signed up with Google successfully!");
        setError("");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google signup failed");
      });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const photoURL = e.target.photoURL.value.trim();
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

    createUser(email, password)
      .then((userCredential) => {
        toast.success("Signed up successfully!");
        const user = userCredential.user;

        updateProfile(user, { displayName: name, photoURL: photoURL });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        toast.error(`Signup failed: ${err.message}`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 px-4">
      <div className="max-w-4xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div className="text-white text-center lg:text-left">
          <h1 className="text-5xl font-bold mb-2">
            Hello <span className="text-yellow-300">Champ</span>
          </h1>
          <h2 className="text-4xl font-semibold mb-4">
            Sign up now and start your journey!
          </h2>
          <p className="text-lg">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-blue-300 underline hover:text-yellow-300 transition-colors"
            >
              Login Now!
            </NavLink>
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="bg-white/90 dark:bg-gray-800 dark:text-gray-200 backdrop-blur-md shadow-2xl rounded-xl p-8 w-full">
          <form onSubmit={registerUser} className="flex flex-col gap-4">
            <label className="label font-semibold">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input input-bordered w-full rounded-lg"
            />

            <label className="label font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full rounded-lg"
            />

            <label className="label font-semibold">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="Profile Image URL (optional)"
              className="input input-bordered w-full rounded-lg"
            />

            <label className="label font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-400 hover:to-orange-300 text-white font-semibold shadow-md flex justify-center items-center gap-2 transition-all duration-200"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <div className="text-center text-gray-500 my-2">— OR —</div>
          </form>

          {/* Google SignUp */}
          <button
            onClick={handleGoogleSignUp}
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
            Sign up with Google
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

export default SignUp;
