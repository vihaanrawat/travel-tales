import { useEffect,useState } from "react";
import {api} from "../api/client.js"
import { AuthContext } from "./AuthContext";

export default function AuthProvider({children}){
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        
    })
}    