
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the center of the element
      const x = clientX - rect.left - rect.width / 2;
      const y = clientY - rect.top - rect.height / 2;
      
      // Apply subtle parallax effect
      const children = heroRef.current.querySelectorAll('.parallax');
      children.forEach((child: Element, index) => {
        const depth = index * 0.01 + 0.03;
        const translateX = x * depth;
        const translateY = y * depth;
        (child as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-transparent z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-100/30 filter blur-3xl parallax"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-purple-100/20 filter blur-3xl parallax"></div>
      
      <div className="max-w-4xl mx-auto text-center z-10 relative">
        <p className="inline-block bg-black/5 backdrop-blur-xs px-4 py-1.5 rounded-full text-sm mb-6 animate-fade-down">
          Introducing a new paradigm in design
        </p>
        
        <h1 className="animate-fade-up [animation-delay:200ms]">
          Simplicity is <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">
            the ultimate sophistication
          </span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-up [animation-delay:400ms]">
          Crafted with precision and attention to detail. 
          A minimalist approach to maximum functionality.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-up [animation-delay:600ms]">
          <Link
            to="/products"
            className="bg-black text-white px-8 py-3.5 rounded-full text-base font-medium transition-all duration-300 hover:shadow-elevation-2 hover:translate-y-[-2px] active:translate-y-[0px]"
          >
            Explore Products
          </Link>
          <Link
            to="/about"
            className="bg-white border border-gray-200 px-8 py-3.5 rounded-full text-base font-medium transition-all duration-300 hover:bg-gray-50 hover:shadow-elevation-1"
          >
            Learn More
          </Link>
        </div>
      </div>
      
      <div className="mt-16 md:mt-20 relative w-full max-w-4xl mx-auto z-10 animate-fade-up [animation-delay:800ms]">
        <div className="glass-card rounded-2xl shadow-elevation-3 overflow-hidden">
          <div className="aspect-video bg-gray-100 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-400">Product Showcase</p>
            </div>
          </div>
        </div>
        
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center shadow-elevation-1 backdrop-blur-sm parallax">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner">
            <span className="text-sm font-medium">Play</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce [animation-iteration-count:3]">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 5v14"></path>
          <path d="m19 12-7 7-7-7"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
