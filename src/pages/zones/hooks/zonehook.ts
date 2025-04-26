
import { zoneType } from "@/pages/dashboard/hook/dashboardhook"
import { authID, host } from "@/utils/host"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"


const useZoneHook = () => {

    const [zone, setZone] = useState<zoneType>()

    const updateZone = async(id: number, zoneName: string)=>{
        const {data} = await axios.put(`${host}/update/zone/${id}`, {zoneName}, {
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

    const deleteZone = async(id: number)=>{
        const {data} = await axios.delete(`${host}/delete/zone/${id}`, {
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


    const fetchSingleZone = async(id: number)=>{
        const {data} = await axios.get(`${host}/zone/${id}`, {
            headers : {
                Authorization: `Bearer ${authID}`
            }
        })
        if(data.status === true){
            setZone(data.msg[0])
        }else{
            return
        }
    }


    

  return {updateZone, deleteZone, fetchSingleZone, setZone, zone}
}

export default useZoneHook