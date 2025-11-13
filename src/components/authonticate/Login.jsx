import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { Authcontext } from '../../context/Authcontext';
import { toast } from 'react-hot-toast';


const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const location = useLocation();

  const from = location.state?.from || '/';

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
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Password validation
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
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row gap-20">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            Wellcome <span className="text-purple-500">Back</span>
          </h1>
          <h1 className="text-4xl font-bold">Login Now!</h1>
          <h2>
            Dont have an Account{" "}
            <NavLink className="text-blue-500 underline" to="/singup">
              Sing Up Now!
            </NavLink>
          </h2>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSingInWithEmailAndPassword}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                />
                <button className="btn btn-neutral my-4">Login</button>
                <h1 className="text-center">
                  -------------------------OR-------------------------
                </h1>
              </fieldset>
            </form>

            <button
              onClick={handleGoogleSingIn}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
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
          </div>

          <h1 className="text-red-500 text-[12px]">{error}</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
