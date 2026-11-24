import { useEffect, useState } from "react";
import { api } from "../api/client.js"
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let ignore = false; //it prevents an outdated api response from updating state after component gets unmounted

        api("/auth/me").then((u) => {
            if (!ignore) setUser(u)
        }).catch(() => {
            if (!ignore) setUser(null)
        }).finally(() => {
            if (!ignore) setLoading(false)
        })

        return()=>{
            ignore = true;
        }

    }, [])

    async function login(email,password) {
        
    }
}    