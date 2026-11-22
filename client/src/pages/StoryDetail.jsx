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

    },[id]) // the effect runs when the component mounts and id changes

    if(error) return <p>{error}</p>
    if(!story) return <p>Loading...</p>

    return (
        <article>
            <h1>{story.title}</h1>
            <p>
                {story.destination}
                {story.country && `, ${story.country}`}
            </p>
        </article>
    )

}