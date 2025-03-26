
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/lib/auth";
import { LogOut } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { session } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleLogout = () => {
    signOut();
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12",
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-subtle"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-medium tracking-tight transition-opacity hover:opacity-80"
        >
          Minimal
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {["Products", "Features", "Design", "About"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-sm transition-all hover:opacity-60"
            >
              {item}
            </Link>
          ))}
          
          {session ? (
            <button
              onClick={handleLogout}
              className="text-sm flex items-center gap-1.5 transition-all hover:opacity-60"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-sm bg-black text-white px-5 py-2.5 rounded-full transition-all hover:bg-opacity-90"
            >
              Sign In
            </Link>
          )}
        </nav>

        <button
          className="flex md:hidden flex-col space-y-1.5 w-6 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={cn(
            "block h-0.5 bg-black transition-all duration-300 ease-out", 
            menuOpen && "rotate-45 translate-y-2"
          )}></span>
          <span className={cn(
            "block h-0.5 bg-black transition-all duration-300 ease-out", 
            menuOpen && "opacity-0"
          )}></span>
          <span className={cn(
            "block h-0.5 bg-black transition-all duration-300 ease-out", 
            menuOpen && "-rotate-45 -translate-y-2"
          )}></span>
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white pt-24 px-6 md:hidden transition-transform duration-500 ease-in-out",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-6">
          {["Products", "Features", "Design", "About"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-2xl font-medium transition-opacity hover:opacity-60"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          
          {session ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-2xl font-medium flex items-center gap-2 transition-opacity hover:opacity-60"
            >
              <LogOut size={20} />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-xl bg-black text-white px-6 py-3 rounded-full mt-4 inline-block text-center transition-all hover:bg-opacity-80"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
