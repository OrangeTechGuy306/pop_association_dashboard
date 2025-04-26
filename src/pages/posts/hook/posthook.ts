import { postType } from "@/pages/dashboard/hook/dashboardhook"
import { authID, host } from "@/utils/host"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"



const usePostHook = () => {


    const [post, setPost] = useState<postType>()

    const updatePost = async(id: number, postName: string)=>{
        const {data} = await axios.put(`${host}/update/post/${id}`, {postName}, {
            headers : {
                Authorization: `Bearer ${authID}`
            }
        })
        if(data.status === true){
            toast.success(data.msg)
        }else{
            toast.error(data.msg)
        }
    }

    const deletePost= async(id: number)=>{
        const {data} = await axios.delete(`${host}/delete/post/${id}`, {
            headers : {
                Authorization: `Bearer ${authID}`
            }
        })
        if(data.status === true){
            toast.success(data.msg)
        }else{
            toast.error(data.msg)
        }
    }

    const fetchSinglePost = async(id: number)=>{
        const {data} = await axios.get(`${host}/post/${id}`, {
            headers : {
                Authorization: `Bearer ${authID}`
            }
        })
        if(data.status === true){
            setPost(data.msg[0])
        }else{
            return
        }
    }

    
  return {updatePost, deletePost, fetchSinglePost, post, setPost}
}

export default usePostHook