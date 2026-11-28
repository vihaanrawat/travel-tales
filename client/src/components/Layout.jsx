import { Link, Outlet } from "react-router";
import { UseAuth } from "../context/useAuth";

export default function Layout(){
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