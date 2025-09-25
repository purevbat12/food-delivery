"use client"
import { createContext, useContext, useState, useEffect, useRef } from "react";
const EmailContext = createContext<any>(null);
export function EmailVerify({ children }: any){
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