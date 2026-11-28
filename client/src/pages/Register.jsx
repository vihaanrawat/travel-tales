import { useState } from "react";
import { Link, Navigate } from "react-router"
import { UseAuth } from "../context/useAuth";

export default function Register() {
    const { user, register } = UseAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)

    if (user) return <Navigate to="/" replace />

    async function handleSubmit(e) {
        e.preventDefault() // prevents browser default form submission
        setError("")

        if (password.length < 8) {
            setError("Password must be at least 8 characters")
            return
        }
        setSubmitting(true)
        try {
            await register(name, email, password)
        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <section>
            <h1>Create your account</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    autoComplete="name"
                    required
                    maxLength={50}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="email"></label>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p role="alert">{error}</p>}

                <button type="submit" disabled={submitting}>
                    {submitting ? "Creating Account...": "Sign up"}
                </button>
            </form>
            <p>
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </section>
    )
}