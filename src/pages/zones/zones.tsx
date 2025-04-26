import { Button, Input, Modal, Table } from "antd";
import useDashboardHook, { zoneType } from "../dashboard/hook/dashboardhook";
import { useEffect, useState } from "react";
import DashboardLayout from "@/comps/Dashboardlayout";
import SummaryCard from "@/comps/summaryCard";
import { VscServerEnvironment } from "react-icons/vsc";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import useZoneHook from "./hooks/zonehook";
import { toast, Toaster } from "sonner";


const ZonesPage = () => {

  const { getAllZones, zones, searchZones } = useDashboardHook();
  const {updateZone, deleteZone, fetchSingleZone, setZone, zone} = useZoneHook()
  const [open, setOpen] = useState(false)
    
  const openEditModal = ()=>{
      setOpen(true)
  } 
  const [zoneValue, setZoneValue] = useState("")


//   eslint-disable-next-line
  const handleSearch =  async(e:any)=>{
    e.preventDefault()
    if(!zoneValue){
        toast.error("Nothing to search")
    }else{
        await searchZones(zoneValue)   
    }
  }


  useEffect(()=>{
    getAllZones()
  },[])

  const columns = [
    {
      title: "S/NO",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Zone Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Update",
      dataIndex: "update",
      key: "update",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
    },
  ];

  return (
    <DashboardLayout>
        <Toaster richColors position="top-right" />
        <div className="mb-5 flex justify-between items-end gap-3">
            <SummaryCard
                icon={<VscServerEnvironment size={20} />}
                title="Zones"
                className="text-slate-400 bg-glass"
                // eslint-disable-next-line
                total={zones?.length as any}
                desc="total Zones"
            />

            <form action="" className="flex items-center gap-2" onSubmit={handleSearch}>
                <Input type="search" placeholder="Search Zone..." className="w-[300px]" onChange={(e)=>{setZoneValue(e.target.value)}}/>
                <input type="submit" value="Search"  className="text-white bg-primary px-4 py-1 rounded-md"/>
            </form>
        </div>
      <Table
        dataSource={
          zones &&
          zones.map((zone: zoneType, i) => ({
            key: i,
            no: i + 1,
            name: zone.zone_name,
            update: <Button 
                        className="bg-yellow-400" 
                        onClick={()=>{
                        openEditModal()
                        fetchSingleZone(zone.zone_id)
                    }}>
                        <BiEdit/><span>Edit</span>
                    </Button>,
            delete: <Button className="bg-red-400 text-white" 
                onClick={async()=>{
                        await deleteZone(zone.zone_id)
                        getAllZones()
                    }}
                    >
                    <BiTrashAlt /> <span>Delete</span>
                </Button>,
          }))
        }
        columns={columns}

        />
        <Modal open={open} onCancel={()=>setOpen(false)} footer={null}>
        <h1 className='text-2xl text-slate-400'>Update Post </h1>
        {
        //  eslint-disable-next-line
        <form action="" className='mt-10' onSubmit={async(e: any)=>{
            e.preventDefault()
            //  eslint-disable-next-line
            await updateZone(zone?.zone_id as any, zone?.zone_name as any)
            getAllZones()
        }}>
            
            <Input type='text' value={zone?.zone_name}  onChange={(e)=>{
                setZone({...zone, zone_name: e.target.value} as zoneType)
                }}/>
                <input type="submit" value={"Update Post"} className='bg-yellow-400 py-1 px-4 rounded-md my-3 cursor-pointer'  />
        </form>
        }
      </Modal>
    </DashboardLayout>
  );
};

export default ZonesPage;
