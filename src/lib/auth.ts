
import { jwtDecode } from "jwt-decode";
import { prisma } from "./prisma";
import * as bcrypt from 'bcryptjs';

export type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
  kycStatus?: string | null;
  wallet?: string | null;
};

export type Session = {
  user: User;
  expires: string;
};

// Get session from token
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

// Sign in and create token
export const signIn = (token: string) => {
  localStorage.setItem("auth-token", token);
  // Redirect to home page or dashboard
  window.location.href = "/dashboard";
};

// Sign out
export const signOut = () => {
  localStorage.removeItem("auth-token");
  // Redirect to login page
  window.location.href = "/login";
};

// Database auth methods
export const createUser = async (userData: {
  email: string;
  password?: string;
  name?: string;
  image?: string;
  role?: string;
}) => {
  // Hash password if provided
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
  
  // Create user in database
  return prisma.user.create({
    data: userData
  });
};

// Find user by email
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email }
  });
};

// Validate password
export const validatePassword = async (plainPassword: string, hashedPassword: string) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

// Generate JWT token for user
export const generateToken = (user: User) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30); // 30 days expiration
  
  // This would normally be server-side code with a proper JWT library
  // But for frontend demo purposes, we'll create a similar structure
  return btoa(JSON.stringify({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      kycStatus: user.kycStatus,
      wallet: user.wallet
    },
    exp: Math.floor(expirationDate.getTime() / 1000)
  }));
};
