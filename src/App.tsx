
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PathSelection from "./pages/PathSelection";
import LivingPlanSelection from "./pages/LivingPlanSelection";
import Matching from "./pages/Matching";
import Properties from "./pages/Properties";
import ListProperty from "./pages/ListProperty";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import ProfileCreation from "./pages/ProfileCreation";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          
          {/* User Account */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Roommate Finding Flow */}
          <Route path="/living-plan-selection" element={<LivingPlanSelection />} />
          <Route path="/path-selection" element={<PathSelection />} />
          <Route path="/profile-creation" element={<ProfileCreation />} />
          <Route path="/matching" element={<Matching />} />
          
          {/* Property Management */}
          <Route path="/properties" element={<Properties />} />
          <Route path="/list-property" element={<ListProperty />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
