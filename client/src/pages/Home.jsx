import { use, useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../api/client.js";

export default function Home() {
    const [data, setData] = useState(null)
    const [error, setError] = useState("")

    useEffect(() => {
        let ignore = false; // initially request is allowed to update the state
        api("/stories?limit=12").then((result) => {
            if (!ignore) setData(result)
        }).catch((err) => {
            if (!ignore) setError(err.message)
        })

        return () => {
            ignore = true;
        }
    }, [])

    if(error) return <p>{error}</p>
    if(!data) return <p>Loading...</p>

    return (
        <section>
            
        </section>
    )
}