
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found | Minimal";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-6 py-32">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-8xl font-light mb-6 animate-fade-down">404</h1>
          <h2 className="text-2xl font-medium mb-4 animate-fade-up [animation-delay:200ms]">
            Page not found
          </h2>
          <p className="text-gray-600 mb-8 animate-fade-up [animation-delay:400ms]">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Link
            to="/"
            className="inline-block bg-black text-white px-8 py-3.5 rounded-full animate-fade-up [animation-delay:600ms] transition-all hover:bg-opacity-90"
          >
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
