"use client"
import Container from "./components/Container";
export default function page(){
    return (
        <div className="flex justify-between items-center px-[100px]">
            <Container/>
            <div className="h-[100vh] flex justify-center items-center">
                <img className="h-[90vh]" src="/images/authImage.png"></img>
            </div>
        </div>
    );
}