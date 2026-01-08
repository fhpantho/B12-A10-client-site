import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  return (
    <div>
        <header>
            <Navbar></Navbar>
        </header>
        <br />
        <br />
        <main>
            <Outlet></Outlet>
            
        </main>
        <Toaster
  position="top-center"
  toastOptions={{ duration: 1000 }}
/>

        <footer>
            <Footer></Footer>
        </footer>

      {/*  Global Loading Spinner for Axios */}
      {/* <div
        id="global-loader"
        className="hidden fixed inset-0 bg-black bg-opacity-40 z-[9999] justify-center items-center"
      >
        <span className="loading loading-spinner loading-lg text-white"></span>
      </div> */}

      
    </div>
  );
};

export default RootLayout;
