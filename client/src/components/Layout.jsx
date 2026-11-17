import { Link, Outlet } from "react-router";

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