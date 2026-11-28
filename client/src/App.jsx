import { Routes, Route } from "react-router"
import Layout from "./components/Layout.jsx"
import Home from "./pages/Home.jsx"
import StoryDetail from "./pages/StoryDetail.jsx"
import NotFound from "./pages/NotFound.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={<Home />} />
                <Route path="/stories/:id" element={<StoryDetail/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    )
}