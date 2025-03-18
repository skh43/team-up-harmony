
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
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

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Roommate finding flow route with sequential validation
const RoommateFlowRoute = ({ children, step }: { children: React.ReactNode, step: number }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if previous steps are completed
  const livingPlan = localStorage.getItem('livingPlan');
  const userPath = localStorage.getItem('userPath');
  
  if (step >= 2 && !livingPlan) {
    return <Navigate to="/living-plan-selection" replace />;
  }
  
  if (step >= 3 && !userPath) {
    return <Navigate to="/path-selection" replace />;
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
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      
      {/* Roommate Finding Flow - Sequential Protection */}
      <Route path="/living-plan-selection" element={<RoommateFlowRoute step={1}><LivingPlanSelection /></RoommateFlowRoute>} />
      <Route path="/payment" element={<RoommateFlowRoute step={1}><Payment /></RoommateFlowRoute>} />
      <Route path="/path-selection" element={<RoommateFlowRoute step={2}><PathSelection /></RoommateFlowRoute>} />
      <Route path="/profile-creation" element={<RoommateFlowRoute step={3}><ProfileCreation /></RoommateFlowRoute>} />
      <Route path="/matching" element={<RoommateFlowRoute step={4}><Matching /></RoommateFlowRoute>} />
      
      {/* Property Management - Just requires login */}
      <Route path="/properties" element={<ProtectedRoute><Properties /></ProtectedRoute>} />
      <Route path="/list-property" element={<ProtectedRoute><ListProperty /></ProtectedRoute>} />
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
