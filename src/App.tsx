
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PathSelection from "./pages/PathSelection";
import LivingPlanSelection from "./pages/LivingPlanSelection";
import Payment from "./pages/Payment";
import Matching from "./pages/Matching";
import Properties from "./pages/Properties";
import ListProperty from "./pages/ListProperty";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProfileCreation from "./pages/ProfileCreation";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import React from 'react';
import { useAuth } from "./hooks/useAuth";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Simplified auth check component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      
      {/* Roommate flow routes - simplified to avoid navigation issues */}
      <Route path="/living-plan-selection" element={<LivingPlanSelection />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/path-selection" element={<PathSelection />} />
      <Route path="/profile-creation" element={<ProfileCreation />} />
      <Route path="/matching" element={<Matching />} />
      
      <Route path="/properties" element={<ProtectedRoute><Properties /></ProtectedRoute>} />
      <Route path="/list-property" element={<ProtectedRoute><ListProperty /></ProtectedRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider delayDuration={0}>
              <AppRoutes />
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </React.StrictMode>
    </BrowserRouter>
  );
};

export default App;
