
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User, getSession } from "@/lib/auth";

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
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

  return (
    <AuthContext.Provider value={{ session, isLoading, setSession }}>
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
