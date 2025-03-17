
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  email: string;
  fullName?: string;
  photoURL?: string;
  phone?: string;
  isNewUser?: boolean;
}

interface UserProfile {
  fullName?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, profile: UserProfile) => Promise<void>;
  registerWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This is a mock implementation - in a real app, you'd call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      if (email && password) {
        const mockUser = {
          id: '123456',
          email,
          fullName: 'Demo User',
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        return;
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // This is a mock implementation - in a real app, you'd integrate with Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful Google login
      const mockUser = {
        id: 'google-123456',
        email: 'user@gmail.com',
        fullName: 'Google User',
        photoURL: 'https://via.placeholder.com/150',
        isNewUser: false, // For existing users
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      navigate('/dashboard');
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, profile: UserProfile) => {
    setIsLoading(true);
    try {
      // This is a mock implementation - in a real app, you'd call an API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful registration
      const mockUser = {
        id: `reg-${Date.now()}`,
        email,
        fullName: profile.fullName,
        phone: profile.phone,
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerWithGoogle = async () => {
    setIsLoading(true);
    try {
      // This is a mock implementation - in a real app, you'd integrate with Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful Google registration
      const mockUser = {
        id: `google-${Date.now()}`,
        email: 'new-user@gmail.com',
        fullName: 'New Google User',
        photoURL: 'https://via.placeholder.com/150',
        isNewUser: true, // Flag to indicate this is a new user
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // New users should go to profile creation instead of dashboard
      navigate('/profile-creation');
    } catch (error) {
      console.error("Google registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // This is a mock implementation - in a real app, you'd call an API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      
      navigate('/');
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "Could not log out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      // This is a mock implementation - in a real app, you'd call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
        });
      } else {
        throw new Error('User not authenticated');
      }
    } catch (error) {
      console.error("Update profile error:", error);
      toast({
        title: "Update failed",
        description: "Could not update your profile. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      loginWithGoogle,
      register,
      registerWithGoogle,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
