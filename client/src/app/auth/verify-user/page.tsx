import Container from "./components/Container";
import { Suspense } from "react";
export default function page(){
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Container />
        </Suspense>
    );
}