import { Input } from "antd"
import useSigninAuth from "./modules/signinAuth"
import { useEffect, useState } from "react"
import { toast, Toaster } from "sonner"
import { useNavigate } from "react-router-dom"


const SiginPage = () => {

    const {authorizeAdmin, getAdmin} = useSigninAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    // eslint-disable-next-line
    const signin = async(e: any)=>{
        e.preventDefault()
        const res = await authorizeAdmin(email, password)
        if(res?.status === true){
            setLoading(true)
            toast.success(res.msg)
            setTimeout(()=>{
                navigate("/")
            }, 3000)
            setLoading(false)
        }else{
            toast.error(res?.msg)
        }
    }

    useEffect(()=>{
        getAdmin()
    }, [])

  return (
    <section className="flex justify-center items-center min-h-screen">
        <Toaster richColors position="top-right" /> 
        <form action="" className="bg-glass rounded-xl p-5" onSubmit={signin}>
            <div className="flex flex-col gap-1 my-5">
                <h1 className="text-primary text-xl">Admin Login</h1>
                <small className="text-red-500">Notice! Only Authorized user are allowed</small>
            </div>
            <div className="flex flex-col gap-1 my-3">
                <label htmlFor="">Admin Email</label>
                <Input type="email" required min={5} placeholder="Enter Authorized Email" className="w-[300px]" onChange={(e)=>{setEmail(e.target.value)}} /> 
            </div>
            <div className="flex flex-col gap-1 my-3">
                <label htmlFor="">Admin Password</label>
                <Input type="password" onChange={(e)=>{setPassword(e.target.value)}} required min={5} placeholder="Enter Authorized Password" className="w-[300px]" /> 
            </div>
            <div className="my-3">
                <input type="submit" value={loading ? "Please Wait..." : "Sign In"} className="bg-primary text-white px-5 py-2 rounded-md cursor-pointer" disabled={loading}/> 
            </div>
            <div className="my-3">
               <small>Proudly Design & Develop by OrangeTechGuy</small>
            </div>
        </form>
    </section>
  )
}

export default SiginPage