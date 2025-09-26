"use client"
import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
interface contextType {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}
const AuthContext = createContext<contextType | null>(null);
type propsType = {
  children: ReactNode;
}
export function AuthProvider({ children }: propsType){
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