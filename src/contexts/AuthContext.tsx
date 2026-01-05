import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { User, AuthContextType } from "@/types";
import { STORAGE_KEYS } from "@/data/demoData";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = "71762333054@cit.edu.in";
const ADMIN_PASSWORD = "CIT@2023";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // 🔁 Restore Firebase session
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) mapFirebaseUser(firebaseUser);
      else setUser(null);
      setIsLoading(false);
    });
    return unsub;
  }, []);

  const mapFirebaseUser = (firebaseUser: FirebaseUser) => {
    if (!firebaseUser.email) return;

    const appUser: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName || "Google User",
      isAdmin: false,
    };

    setUser(appUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(appUser));
  };

  // ✅ EMAIL LOGIN (Admin + Local users)
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser: User = {
        id: "admin-1",
        email,
        name: "Admin",
        isAdmin: true,
      };
      setUser(adminUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(adminUser));
      toast({ title: "Welcome Admin!" });
      setIsLoading(false);
      return true;
    }

    const users: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    const passwords = JSON.parse(localStorage.getItem("petshop_passwords") || "{}");

    const found = users.find((u) => u.email === email);
    if (found && passwords[email] === password) {
      setUser(found);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(found));
      toast({ title: `Welcome back ${found.name}` });
      setIsLoading(false);
      return true;
    }

    toast({
      title: "Login failed",
      description: "Invalid email or password",
      variant: "destructive",
    });
    setIsLoading(false);
    return false;
  };

  // ✅ EMAIL SIGNUP (Local)
  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const users: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    if (users.find((u) => u.email === email)) {
      toast({
        title: "Signup failed",
        description: "Email already exists",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      isAdmin: false,
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    const passwords = JSON.parse(localStorage.getItem("petshop_passwords") || "{}");
    passwords[email] = password;
    localStorage.setItem("petshop_passwords", JSON.stringify(passwords));

    setUser(newUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));

    toast({ title: "Welcome to PetPals!" });
    setIsLoading(false);
    return true;
  };

  // ✅ REAL GOOGLE LOGIN / SIGNUP
  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      mapFirebaseUser(res.user);
      toast({ title: "Logged in with Google" });
      return true;
    } catch {
      await signInWithRedirect(auth, googleProvider);
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setUser(null);
    toast({ title: "Logged out successfully" });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
