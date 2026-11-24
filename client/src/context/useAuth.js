import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function UseAuth(){
    const ctx = useContext(AuthContext)
    if(!ctx) throw new Error("useAuth must be used inside <AuthProvider")
        return ctx
}
