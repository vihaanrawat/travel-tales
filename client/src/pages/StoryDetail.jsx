import { useEffect,useState } from "react";
import {useParams} from "react-router"
import {api} from "../api/client.js"

export default function StoryDetail(){
    const {id} = useParams();
    const[story,setStory] = useState(null);
    const[err,setError] = useState("");

    useEffect(()=>{
        let ignore = false;
        setStory(null);
        setError("")
        api(`/stories/${id}`).then((result)=>{
            if(!ignore) setStory(result);
        }).catch((err)=>{
            if(!ignore) setError(err);
        })

        return () =>{
            ignore = true
        }

    },[id])

}