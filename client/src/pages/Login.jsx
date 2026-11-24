import { useState } from "react";
import { Link,Navigate } from "react-router";
import { UseAuth } from "../context/useAuth";

export default function Login(){
    const {user,login} = UseAuth()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("");
    const [submitting,setSubmitting] = useState(false)

    if(user) return <Navigate to="/" replace/>

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setSubmitting(true)
        try {
            await login(email,password)
        } catch (err) {
            setError(err.message)
        }finally{
            setSubmitting(false)
        }
    }
}