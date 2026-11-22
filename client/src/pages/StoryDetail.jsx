import { useEffect,useState } from "react";
import {useParams} from "react-router"
import {api} from "../api/client.js"

export default function StoryDetail(){
    const {id} = useParams();
    const[story,setStory] = useState(null);
    const[err,setError] = useState("");
    
}