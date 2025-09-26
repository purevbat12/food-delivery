"use client"
import { createContext, useContext, useState, useEffect, useRef, Dispatch, SetStateAction, ReactNode } from "react";
interface contextType {
  emailToken: string | null;
  setEmailToken: Dispatch<SetStateAction<string | null>>;
}
const EmailContext = createContext<contextType| null>(null);
type propsType = {
    children: ReactNode;
}
export function EmailVerify({ children }: propsType){
    const [emailToken, setEmailToken] = useState<string | null>(null);
    const channelRef = useRef<BroadcastChannel | null>(null);
    useEffect(() => {
        const channel = new BroadcastChannel("emailTokenChannel");
        channel.onmessage = (event) => {
            setEmailToken(event.data);
        };
        channelRef.current = channel;
        setEmailToken(localStorage.getItem("emailToken"));
        return () => channel.close();
    }, []);
    useEffect(() => {
        if (!channelRef.current) return;
        if(emailToken){
            localStorage.setItem("emailToken", emailToken);
            channelRef.current.postMessage(emailToken);
        }
        else{
            localStorage.removeItem("emailToken");
            channelRef.current.postMessage(null);
        }
    }, [emailToken]);
    return (
        <EmailContext.Provider value={{ emailToken, setEmailToken }}>
            {children}
        </EmailContext.Provider>
    );
}
export function useEmailVerify(){
    const context = useContext(EmailContext);
    if(!context){
        throw new Error("useEmailVerify must be used inside EmailVerify");
    }
    return context;
}