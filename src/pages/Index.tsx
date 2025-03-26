
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Smooth scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Set page title
    document.title = "Minimal | A Celebration of Simplicity";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <ProductShowcase />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
