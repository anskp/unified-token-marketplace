
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User, getSession, generateToken, findUserByEmail, validatePassword, createUser } from "@/lib/auth";

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => void;
  loginWithTwitter: () => void;
  loginWithApple: () => void;
  register: (userData: {
    email: string;
    password: string;
    name?: string;
  }) => Promise<void>;
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

  // Email/password login
  const loginWithEmail = async (email: string, password: string) => {
    try {
      // In a real app with backend, this would be an API call
      // For now, we simulate database auth
      const user = await findUserByEmail(email);
      
      if (!user || !user.password) {
        throw new Error("Invalid credentials");
      }
      
      const isValidPassword = await validatePassword(password, user.password);
      
      if (!isValidPassword) {
        throw new Error("Invalid credentials");
      }
      
      // Generate token
      const token = generateToken({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role
      });
      
      localStorage.setItem("auth-token", token);
      const newSession = getSession();
      setSession(newSession);
      
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Register new user
  const register = async (userData: { email: string; password: string; name?: string }) => {
    try {
      // Create user in database
      const newUser = await createUser({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        role: 'investor' // Default role
      });
      
      // Generate token
      const token = generateToken({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      });
      
      localStorage.setItem("auth-token", token);
      const newSession = getSession();
      setSession(newSession);
      
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

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
      loginWithEmail,
      loginWithGoogle,
      loginWithTwitter,
      loginWithApple,
      register
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
