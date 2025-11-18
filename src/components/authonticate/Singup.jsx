import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Authcontext } from "../../context/Authcontext";
import { updateProfile } from "firebase/auth";
import { toast } from "react-hot-toast";

const Singup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { singInWithgoogle, creatUser } = useContext(Authcontext);

  const handleGoogleSingIn = () => {
    singInWithgoogle().then((res) => {
      console.log(res.user);
      toast.success("Login with google succesfully");
      setError("");
      navigate('/');
    });
  };

  const resisterUser = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    if(email.length === 0)
    {
      setError("Please input your Email");
      return;
    }
    if(password.length === 0)
    {
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
        navigate('/');
      })
      .catch((err) => {
        toast.error(`failed to sing up ${err.message}`);
      });
  };

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500">
      <div className="hero-content flex-col lg:flex-row gap-16 p-6">
        {/* Left Section */}
        <div className="text-center lg:text-left text-white">
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

        {/* Right Section - Signup Form */}
        <div className="card bg-white/90 backdrop-blur-md w-full sm:max-w-[400px] max-w-[300px] shadow-2xl rounded-xl">
          <div className="card-body flex flex-col gap-4">
            <form onSubmit={resisterUser} className="flex flex-col gap-4">
              <label className="label font-semibold">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered w-full rounded-lg"
              />

              <label className="label font-semibold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full rounded-lg"
              />

              <label className="label font-semibold">PhotoURL</label>
              <input
                type="text"
                name="photoURL"
                placeholder="PhotoURL"
                className="input input-bordered w-full rounded-lg"
              />

              <label className="label font-semibold">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered w-full rounded-lg"
              />

              <button className="cursor-pointer w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-400 hover:to-orange-300 text-white font-semibold shadow-md transition-all duration-200">
                Sing Up
              </button>

              <div className="text-center text-gray-500 ">— OR —</div>
            </form>

            {/* Google Signup */}
            <button
              onClick={handleGoogleSingIn}
              className="cursor-pointer btn w-full flex items-center justify-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
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
            <p className="text-red-500 text-sm  mt-1  ">
              {error || " "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singup;
