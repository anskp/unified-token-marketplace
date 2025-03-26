
import { jwtDecode } from "jwt-decode";

export type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type Session = {
  user: User;
  expires: string;
};

// Simple function to check if we have a session
export const getSession = (): Session | null => {
  const token = localStorage.getItem("auth-token");
  if (!token) return null;
  
  try {
    const decoded = jwtDecode<{
      user: User;
      exp: number;
    }>(token);
    
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("auth-token");
      return null;
    }
    
    return {
      user: decoded.user,
      expires: new Date(decoded.exp * 1000).toISOString(),
    };
  } catch (error) {
    console.error("Failed to decode token:", error);
    localStorage.removeItem("auth-token");
    return null;
  }
};

export const signIn = (token: string) => {
  localStorage.setItem("auth-token", token);
  // Redirect to home page or dashboard
  window.location.href = "/";
};

export const signOut = () => {
  localStorage.removeItem("auth-token");
  // Redirect to login page
  window.location.href = "/login";
};
