import { Link, Outlet } from "react-router";
import { UseAuth } from "../context/useAuth";

export default function Layout(){
    const {user,loading,logout} = UseAuth()
    return(
        <>
        <header>
            <Link to="/">Travel Tales</Link>
        </header>
        <main>
            <Outlet/>
        </main>
        </>
    )
}