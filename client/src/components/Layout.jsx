import { Link, Outlet } from "react-router";
import { UseAuth } from "../context/useAuth";

export default function Layout() {
    const { user, loading, logout } = UseAuth()
    return (
        <>
            <header>
                <Link to="/">Travel Tales</Link>
                <nav>
                    {!loading &&
                        (user ? (
                            <>
                                <span>{user.name}</span>
                                <button onClick={logout}>Log out</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Log in</Link>
                                <Link to="/register">Sign up</Link>
                            </>
                        ))}
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}