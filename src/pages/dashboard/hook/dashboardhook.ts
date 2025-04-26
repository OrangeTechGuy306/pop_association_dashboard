import { authID, host } from "@/utils/host"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"

export interface postType{
    post_name: string,
    post_id: number
}
export interface zoneType{
    zone_name: string;
    zone_id: number;
}

const useDashboardHook = () => {

    const [posts, setPost] = useState<postType[]>()
    const [zones, setZones] = useState<zoneType[]>([])


    const newPost = async(post: string)=>{
        try {
            if(!post){
                toast.error("Please enter a post")
            }else{
                const {data} = await axios.post(`${host}/new/post`,{post}, {
                    headers: {
                        Authorization: `Bearer ${authID}`
                    }
                })
                if(data.status === true){
                    toast.success(data.msg)
                }else{
                    toast.error(data.msg)
                }
            }
            // eslint-disable-next-line
        } catch (error: any) {
            toast.warning(error.message)
        }
        
    }

    const newZone = async(zone: string)=>{
        try {
            if(!zone){
                toast.error("Please enter a Zone")
            }else{
                const {data} = await axios.post(`${host}/new/zone`,{zone}, {
                    headers: {
                        Authorization: `Bearer ${authID}`
                    }
                })
                if(data.status === true){
                    toast.success(data.msg)
                }else{
                    toast.error(data.msg)
                }
            }
            // eslint-disable-next-line
        } catch (error: any) {
            toast.warning(error.message)
        }
        
    }

    const getAllPosts = async()=>{
        try {
                const {data} = await axios.get(`${host}/posts`,{
                    headers: {
                        Authorization: `Bearer ${authID}`
                    }
                })
                if(data.status === true){
                    setPost(data.msg)
                }else{
                    setPost([])
                }
 
            // eslint-disable-next-line
        } catch (error: any) {
            toast.warning(error.message)
        }
        
    }
    const getAllZones = async()=>{
        try {
                const {data} = await axios.get(`${host}/zones`,{
                    headers: {
                        Authorization: `Bearer ${authID}`
                    }
                })
                if(data.status === true){
                    setZones(data.msg)
                }else{
                    setZones([])
                }
 
            // eslint-disable-next-line
        } catch (error: any) {
            toast.warning(error.message)
        }
        
    }

    const searchZones = async(search: string)=>{
        const {data} = await axios.get(`${host}/search/zone?search=${search}`, {
            headers : {
                Authorization: `Bearer ${authID}`
            }
        })
        if(data.status === true){
            setZones(data.msg)
        }else{
            return
        }
    }

    const searchPosts = async(search: string)=>{
        const {data} = await axios.get(`${host}/search/post?search=${search}`, {
            headers : {
                Authorization: `Bearer ${authID}`
            }
        })
        if(data.status === true){
            setPost(data.msg)
        }else{
            return
        }
    }

  return {newPost, getAllPosts, posts, newZone, getAllZones, zones, setZones, searchZones, searchPosts}
}

export default useDashboardHook