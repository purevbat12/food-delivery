"use client"
import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext<any>(null);
export function AuthProvider({ children }: any){
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth(){
  const context = useContext(AuthContext);
  if(!context){
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}