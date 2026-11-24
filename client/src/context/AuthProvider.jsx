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
        const u = await api("/auth/login",{
            method:"POST",
            body:{email,password}
        })
        setUser(u)
    }

    async function register(name,email,password) {
        await api("/auth/register",{
            method:"POST",
            body:{name,email,password}
        })

        await login(email,password)
    }

    async function logout() {
        await api("/auth/logout",{
            method:"POST"
        })
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user,loading,login,register,logout}}>
            {children}
        </AuthContext.Provider>
    )

}    