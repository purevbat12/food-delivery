import Container from "./Container";
import { Suspense } from "react";
export default function page(){
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Container />
        </Suspense>
    );
}