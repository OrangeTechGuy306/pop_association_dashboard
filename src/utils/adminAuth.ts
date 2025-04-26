// import axios from "axios"
// import { host } from "./server"

import { useNavigate } from "react-router-dom"


const useAdminAuth = () => {
    const navigate = useNavigate()
    const isAdmin = async()=>{
        // const data = await axios.post(`${host}/admin`, {})
        const adminAuth = localStorage.getItem("apg___")
        if(!adminAuth){
            navigate("/auth/signin")
        }else{
           return
        }
    }
  return{isAdmin}
}

export default useAdminAuth