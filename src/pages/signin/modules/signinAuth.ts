import { host } from '@/utils/server'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const useSigninAuth = () => {

    const [authID, setAuth] = useState('')
    



    const authorizeAdmin = async(email:string, password:string)=>{
        try {
            if(!email || !password){
                return {status:false, msg:"All fields are required"}
            }else{
                const {data} = await axios.post(`${host}/admin`, {email, password})
                if(data.status === true){
                    localStorage.setItem("apg___", JSON.stringify(data.msg))
                    return {status: true, msg:"Admin Login Successful"}
                }else{
                    return {status:false, msg: data.msg}
                }
            }
            // eslint-disable-next-line
        } catch (error: any) {
            return {status:false, msg:error?.message}
        }
    }

    const navigate = useNavigate()
    

    const getAdmin = async()=>{
        // const data = await axios.post(`${host}/admin`, {})
        const adminAuth = localStorage.getItem("apg___")
        if(adminAuth){
            navigate("/")
        }else{
           return
        }
    }

    const getAuth = async()=>{
        const adminAuth = localStorage.getItem("apg___")
        if(adminAuth){
            setAuth(adminAuth)
        }
    }

    useEffect(()=>{
        getAuth()
      },[])


  return{authorizeAdmin, getAdmin, authID}
}

export default useSigninAuth