import { useEffect } from "react";

export default function Redirect({ href }) {
    useEffect(() => {
        window.location.href = href;
    }, []);

    return <p>Redirecting...</p>;
}
