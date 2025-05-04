import {Link, useNavigate} from "react-router-dom"
import React, { useEffect, useState } from "react"
import {Avatar, Button, Input, Modal} from "antd"
import { RiSearch2Line } from "react-icons/ri";
import useAdminAuth from "@/utils/adminAuth";
import useAdmin, { adminInfoType } from "@/pages/admins/module/adminmodule";
import { FaEye } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUsersLine } from "react-icons/fa6";
// import { RiCalendarEventFill } from "react-icons/ri";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { VscServerEnvironment } from "react-icons/vsc";
import { FaAward } from "react-icons/fa";



const DashboardLayout = ({children}  : {children: React.ReactNode}) => {

  const {isAdmin} = useAdminAuth()
  const {fetchAdminInfo} = useAdmin()
  const [admin, setAdmin] = useState<adminInfoType>()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const openAdminModal = ()=>{
    setOpen(true)
  }

  const getAdmin = async()=>{
    const res =  await fetchAdminInfo()
    if(res.status === true){
      setAdmin(res.msg)
    }else{
      setAdmin({
        avatar: "",
        createdAt: "",
        email_mobile: "",
        pop_admin_id: 0,
        pop_admin_type:"",
        pop_admin_username: "",
        updatedAt: "" 
      })
    }
  }

  const signout = ()=>{
    localStorage.removeItem("apg___")
    navigate("/auth/signin")
  }

  useEffect(()=>{
    isAdmin()
    getAdmin()
  },[])

  
  return (
    <section className='' style={{display: "grid", gridTemplateColumns: "15% 85%"}}>
        <aside className="flex flex-col gap-5 text-slate-400 p-5 bg-glass h-[100vh] sidebar">
            <div className="flex flex-col items-center">
              <img src="/assets/pop_logo.png" width={50} /> 
              <h1 className="px-5 py-2 rounded-xl text-primary flex items-center gap-2 font-bold">
                  APGAOS
              </h1>
            </div>
            <Link to={'/'} className="px-5 py-2 rounded-xl flex items-center gap-2">
                <BiSolidDashboard /> <span>Dashboard</span>
            </Link>
            <Link to={'/members'} className="px-5 py-2 rounded-xl flex items-center gap-2">
              <FaUsersLine /> <span>Members</span>
            </Link>
            {/* <Link to={'/events'} className="px-5 py-2 rounded-xl flex items-center gap-2"> 
                <RiCalendarEventFill /> <span>Events</span> 
            </Link> */}
            <Link to={'/zones'} className="px-5 py-2 rounded-xl flex items-center gap-2"> 
                <VscServerEnvironment /> <span>Zones</span> 
            </Link>
            <Link to={'/posts'} className="px-5 py-2 text-sm rounded-xl flex items-center gap-2"> 
                <FaAward /> <span>Executive Posts</span> 
            </Link>
            <Link to={'/admin'} className="px-5 py-2 rounded-xl flex items-center gap-2">
              <MdOutlineAdminPanelSettings /> <span>Admins</span> 
            </Link>
        </aside>
        <article className="">
          <nav className="flex justify-between items-center flex-wrap bg-glass py-2 px-5">
            <form action="" className="flex items-center gap-3 bg-glass py-1 px-4 rounded-md">
              <Input type="search" placeholder="Search Member" className="w-[300px] h-[40px] bg-transparent outline-none border-none"/>
              <RiSearch2Line/>
            </form>
            <div className="flex gap-2 items-center">
                <Avatar src={`http://localhost:5000/${admin?.avatar}`} /> 
                <div>
                    <button className="bg-primary px-3 py-1 rounded-md" onClick={openAdminModal}> 
                      <FaEye className="text-white" /> 
                    </button>
                    <Modal open={open} onCancel={()=>setOpen(false)} footer={null}>
                        <h1 className="bg-primary text-white rounded-md px-5 py-2 mt-5">
                          My Information
                        </h1>
                        <div className="flex justify-between items-center">
                          <div className="my-5 flex items-center gap-5">
                            <Avatar src={`http://localhost:5000/${admin?.avatar}`} size={100} />
                            <div className="my-5">
                              <h1 className="text-slate-400 text-xl">{admin?.pop_admin_username}</h1>
                              <small>{admin?.email_mobile}</small> <br />
                              <button className="bg-green-100 py-1 px-2 rounded-md text-primary text-sm">
                                {admin?.pop_admin_type}
                              </button>
                            </div>
                          </div>
                      
                        </div>
                        <div className="flex gap-5 flex-wrap">
                          <Button className="text-white bg-red-500" onClick={signout}><MdLogout /> Logout</Button>
                        </div>
                    </Modal>
                
                </div>
            </div>
          </nav>
          <div className="p-5">
            {children}
          </div>
        </article>
    </section>
  )
}

export default DashboardLayout