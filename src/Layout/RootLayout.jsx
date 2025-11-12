import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />

      {/*  Global Loading Spinner for Axios */}
      <div
        id="global-loader"
        className="hidden fixed inset-0 bg-black bg-opacity-40 z-[9999] justify-center items-center"
      >
        <span className="loading loading-spinner loading-lg text-white"></span>
      </div>

      {/*  Toast Notification */}
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 1500,
            style: {
              background: "#333",
              color: "#fff",
            },
            success: {
              style: { background: "green" },
            },
            error: {
              style: { background: "red" },
            },
          }}
        />
      </div>
    </div>
  );
};

export default RootLayout;
