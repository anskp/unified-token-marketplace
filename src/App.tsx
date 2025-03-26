
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { AuthGuard, GuestGuard } from "@/components/AuthGuard";
import { initializeDatabase } from "@/lib/db-init";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Create a Query Client for React Query
const queryClient = new QueryClient();

// Initialize the database
if (process.env.NODE_ENV !== 'test') {
  initializeDatabase().catch(console.error);
}

// ScrollToTop component ensures page start at the top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Protected routes */}
            <Route 
              path="/" 
              element={
                <AuthGuard>
                  <Index />
                </AuthGuard>
              } 
            />
            
            {/* Guest routes */}
            <Route 
              path="/login" 
              element={
                <GuestGuard>
                  <Login />
                </GuestGuard>
              } 
            />
            <Route 
              path="/register" 
              element={
                <GuestGuard>
                  <Register />
                </GuestGuard>
              } 
            />
            
            {/* Public routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
