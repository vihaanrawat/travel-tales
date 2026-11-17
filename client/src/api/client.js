import axios from "axios"

export const http = axios.create({
    baseURL : import.meta.env.VITE_API_URL || "/api",
    withCredentials:true,
})

export async function api(path, {method="GET" , body}= {}) {
    try {
        const {data} = await http.request({
            url:path,
            method,
            data:body
        })
    } catch (error) {
        
    }
}