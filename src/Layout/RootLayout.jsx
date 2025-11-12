import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 1000,
            style: {
              background: "#333",
              color: "#fff",
            },
            success: {
              style: {
                background: "green",
              },
            },
            error: {
              style: {
                background: "red",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default RootLayout;
