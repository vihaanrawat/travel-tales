import { useState } from "react";
import {Link, Navigate} from "react-router"
import { UseAuth } from "../context/useAuth";

export default function Register(){
    const {user,register} = UseAuth()
    const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const [error,setError] = useState("")
    const[submitting,setSubmitting] = useState(false)

    if(user) return <Navigate to="/" replace/>

    async function handleSubmit(e) {
        e.preventDefault() // prevents browser default form submission
        setError("")

        if(password.length<8){
            setError("Password must be at least 8 characters")
            return
        }
        setSubmitting(true)
        try {
            await register(name,email,password)
        } catch (err) {
            setError(err.message)
        }finally{
            setSubmitting(false)
        }
    }
    return(
        <section>
            <h1>Create your account</h1>
        </section>
    )
}