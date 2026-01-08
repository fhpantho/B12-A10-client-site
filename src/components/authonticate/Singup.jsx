import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Authcontext } from "../../context/Authcontext";
import { updateProfile } from "firebase/auth";
import { toast } from "react-hot-toast";

const Singup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { singInWithgoogle, creatUser } = useContext(Authcontext);

  const handleGoogleSingIn = () => {
    singInWithgoogle().then((res) => {
      console.log(res.user);
      toast.success("Login with google succesfully");
      setError("");
      navigate("/");
    });
  };

  const resisterUser = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    if (email.length === 0) {
      setError("Please input your Email");
      return;
    }
    if (password.length === 0) {
      setError("Password cannot be Empty");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");

    creatUser(email, password)
      .then((userCredential) => {
        toast.success("Sing up Succesfully");
        const user = userCredential.user;

        updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        });

        user.name = name;
        user.photoURL = photoURL;

        navigate("/");
      })
      .catch((err) => {
        toast.error(`failed to sing up ${err.message}`);
      });
  };

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 dark:from-base-300 dark:via-base-200 dark:to-base-300 transition-colors duration-300">
      <div className="hero-content flex-col lg:flex-row gap-16 p-6">
        {/* Left Section */}
        <div className="text-center lg:text-left text-white dark:text-base-content">
          <h1 className="text-5xl font-bold mb-2">
            Hello <span className="text-yellow-300">Champ</span>
          </h1>

          <h2 className="text-4xl font-semibold mb-4">
            Sing up Now! and get ready for the journey
          </h2>

          <p className="text-lg">
            Allready have an Account?{" "}
            <NavLink
              className="text-blue-300 underline hover:text-yellow-300 transition-colors"
              to="/login"
            >
              Login Now!
            </NavLink>
          </p>
        </div>

        {/* Right Section */}

        <div className="card bg-base-100 dark:bg-base-200 text-base-content w-full sm:max-w-[400px] max-w-[300px] shadow-2xl rounded-xl transition-colors duration-300 mt-5">
          <div className="card-body flex flex-col gap-4">
            <form onSubmit={resisterUser} className="flex flex-col gap-4">
              <label className="label font-semibold">Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
              />

              <label className="label font-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
              />

              <label className="label font-semibold">PhotoURL</label>
              <input
                type="text"
                name="photoURL"
                className="input input-bordered w-full"
              />

              <label className="label font-semibold">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <button className="cursor-pointer w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-400 hover:to-orange-300 text-white font-semibold shadow-md transition-all duration-200">
                Sing Up
              </button>

              <div className="text-center text-base-content/60">— OR —</div>
            </form>

            {/* Google Signup */}
            <button
              onClick={handleGoogleSingIn}
              className="cursor-pointer btn w-full flex items-center justify-center gap-2 bg-base-100 dark:bg-base-300 text-base-content border border-base-300 hover:bg-base-200 transition-colors duration-200"
            >
              <svg
                aria-label="Google logo"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>

            {/* Error Message */}
            <p className="text-red-500 text-sm mt-1 text-center">
              {error || " "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singup;
