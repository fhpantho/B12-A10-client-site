import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { Authcontext } from "../../context/Authcontext";
import { toast } from "react-hot-toast";

const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const { singInWithgoogle, singinUser } = useContext(Authcontext);

  const handleGoogleSingIn = () => {
    singInWithgoogle()
      .then((res) => {
        console.log(res.user);
        toast.success("Login with google succesfully");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google login failed");
      });
  };

  const handleSingInWithEmailAndPassword = (e) => {
    e.preventDefault();

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

    singinUser(email, password)
      .then((res) => {
        console.log(res.user);
        toast.success("User log in succesfully");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
        setError(err.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 dark:from-base-300 dark:via-base-200 dark:to-base-300 transition-colors duration-300">
      <div className="hero-content flex-col lg:flex-row gap-16 p-6">
        {/* Left Section */}
        <div className="text-center lg:text-left text-white dark:text-base-content">
          <h1 className="text-5xl font-bold mb-2">
            Wellcome <span className="text-yellow-300">Back</span>
          </h1>
          <h2 className="text-4xl font-semibold mb-4">Login Now!</h2>
          <p className="text-lg">
            Dont have an Account?{" "}
            <NavLink
              className="text-blue-300 underline hover:text-yellow-300 transition-colors"
              to="/singup"
            >
              Sing Up Now!
            </NavLink>
          </p>
        </div>

        {/* Right Section */}
        <div className="card bg-base-100 dark:bg-base-200 text-base-content w-full max-w-sm shadow-2xl rounded-xl transition-colors duration-300">
          <div className="card-body">
            <form
              onSubmit={handleSingInWithEmailAndPassword}
              className="flex flex-col gap-4"
            >
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="label font-semibold">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              <button className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold">
                Login
              </button>

              {/* Demo Account Button */}
              <button
                type="button"
                onClick={() => {
                  setEmail("admin@gmail.com");
                  setPassword("Aa!123456");
                }}
                className="w-full py-2 rounded-lg bg-base-200 hover:bg-base-300 font-semibold"
              >
                Continue with Demo Account
              </button>

              <div className="text-center my-2">— OR —</div>
            </form>

            {/* Google Login */}
            <button onClick={handleGoogleSingIn} className="btn w-full mt-2">
              Login with Google
            </button>

            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
