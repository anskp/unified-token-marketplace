
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User, getSession } from "@/lib/auth";

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  loginWithGoogle: () => void;
  loginWithTwitter: () => void;
  loginWithApple: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const session = getSession();
      setSession(session);
      setIsLoading(false);
    };

    loadSession();
  }, []);

  // Social login methods
  const loginWithGoogle = () => {
    // In a real app, this would redirect to Google OAuth flow
    // For demo purposes, we'll simulate a successful login
    console.log("Logging in with Google");
    
    // Create a mock user for the demo
    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTIzIiwibmFtZSI6Ikdvb2dsZSBVc2VyIiwiZW1haWwiOiJnb29nbGV1c2VyQGdtYWlsLmNvbSIsImltYWdlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeXh5WV81X0dpOGNHQTRtZ0lLNTdVTjVEUzNQYXNyZkNsdFdoSXM9czk2LWMifSwiZXhwIjoxOTE2MjM5MDIyfQ.A8bUz3dUJKzrL_n2YnLnj9Cyl2HKvUYQ4E8OeUD1auE";
    localStorage.setItem("auth-token", mockToken);
    const newSession = getSession();
    setSession(newSession);
  };

  const loginWithTwitter = () => {
    console.log("Logging in with Twitter");
    
    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTI0IiwibmFtZSI6IlR3aXR0ZXIgVXNlciIsImVtYWlsIjoidHdpdHRlcnVzZXJAZ21haWwuY29tIiwiaW1hZ2UiOiJodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvMTIzNDU2Nzg5L2RlZmF1bHQuanBnIn0sImV4cCI6MTkxNjIzOTAyMn0.UMYQ1vKslKYq5wvwDPRH4MxTpBCqULGLJxJYqBcRPRE";
    localStorage.setItem("auth-token", mockToken);
    const newSession = getSession();
    setSession(newSession);
  };

  const loginWithApple = () => {
    console.log("Logging in with Apple");
    
    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTI1IiwibmFtZSI6IkFwcGxlIFVzZXIiLCJlbWFpbCI6ImFwcGxldXNlckBpY2xvdWQuY29tIiwiaW1hZ2UiOm51bGx9LCJleHAiOjE5MTYyMzkwMjJ9.gFGXnk5AuHFvshCkA9J_6XZ4Rggy7xrmXVJ4WCgVpvM";
    localStorage.setItem("auth-token", mockToken);
    const newSession = getSession();
    setSession(newSession);
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      isLoading, 
      setSession,
      loginWithGoogle,
      loginWithTwitter,
      loginWithApple
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
