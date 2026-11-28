import { useState } from "react";
import {Link, Navigate} from "react-router"
import { UseAuth } from "../context/useAuth";

export default function Register(){
    const {user,register} = UseAuth()
    const[name,setName] = useState("")
    

}