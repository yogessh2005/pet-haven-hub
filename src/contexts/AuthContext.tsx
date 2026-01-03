import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '@/types';
import { STORAGE_KEYS } from '@/data/demoData';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = '71762333054@cit.edu.in';
const ADMIN_PASSWORD = 'CIT@2023';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check for admin credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser: User = {
        id: 'admin-1',
        email: ADMIN_EMAIL,
        name: 'Admin',
        isAdmin: true
      };
      setUser(adminUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(adminUser));
      setIsLoading(false);
      toast({
        title: 'Welcome Admin!',
        description: 'You have successfully logged in as administrator.',
      });
      return true;
    }
    
    // Check stored users
    const users: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const storedPasswords: Record<string, string> = JSON.parse(localStorage.getItem('petshop_passwords') || '{}');
    
    const foundUser = users.find(u => u.email === email);
    if (foundUser && storedPasswords[email] === password) {
      setUser(foundUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(foundUser));
      setIsLoading(false);
      toast({
        title: 'Welcome back!',
        description: `Hello ${foundUser.name}, you have successfully logged in.`,
      });
      return true;
    }
    
    setIsLoading(false);
    toast({
      title: 'Login failed',
      description: 'Invalid email or password. Please try again or sign up.',
      variant: 'destructive'
    });
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      setIsLoading(false);
      toast({
        title: 'Signup failed',
        description: 'An account with this email already exists.',
        variant: 'destructive'
      });
      return false;
    }
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      isAdmin: false
    };
    
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    // Store password (in real app, this would be hashed on server)
    const storedPasswords: Record<string, string> = JSON.parse(localStorage.getItem('petshop_passwords') || '{}');
    storedPasswords[email] = password;
    localStorage.setItem('petshop_passwords', JSON.stringify(storedPasswords));
    
    setUser(newUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    setIsLoading(false);
    
    toast({
      title: 'Welcome to PetPals!',
      description: 'Your account has been created successfully.',
    });
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const googleUser: User = {
      id: `google-${Date.now()}`,
      email: `user${Date.now()}@gmail.com`,
      name: 'Google User',
      isAdmin: false
    };
    
    const users: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    users.push(googleUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    setUser(googleUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(googleUser));
    setIsLoading(false);
    
    toast({
      title: 'Welcome!',
      description: 'You have successfully logged in with Google.',
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
