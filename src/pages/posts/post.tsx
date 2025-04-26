import DashboardLayout from '@/comps/Dashboardlayout'
import useDashboardHook, { postType } from '../dashboard/hook/dashboardhook';
import { useEffect, useState } from 'react';
import SummaryCard from '@/comps/summaryCard';
import { VscServerEnvironment } from 'react-icons/vsc';
import { Button, Modal, Table } from 'antd';
import { Input } from 'antd';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import usePostHook from './hook/posthook';
import { toast, Toaster } from 'sonner';


const PostsPage = () => {
    const { getAllPosts, posts, searchPosts } = useDashboardHook();
    const [postValue, setPostValue] = useState("")
    const {updatePost, deletePost, fetchSinglePost, post, setPost} = usePostHook()

    const [open, setOpen] = useState(false)
    
    const openEditModal = ()=>{
        setOpen(true)
    } 

    const columns = [
        {
          title: "S/NO",
          dataIndex: "no",
          key: "no",
        },
        {
          title: "Post Name",
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

    //  eslint-disable-next-line
      const handleSearch = async(e: any)=>{
        e.preventDefault()
        if(!postValue){
            toast.error("Nothing to search")
        }else{
           await searchPosts(postValue)
        }
      }


    useEffect(()=>{
        getAllPosts()
    },[])


  return (

    <DashboardLayout>

        <Toaster  richColors position='top-right' />
        
        <div className="mb-5 flex justify-between items-end gap-3">
            <SummaryCard
                icon={<VscServerEnvironment size={20} />}
                title="Posts"
                className="text-slate-400 bg-glass"
                // eslint-disable-next-line
                total={posts?.length as any}
                desc="Total Post"
            />

            <form action="" className="flex items-center gap-2" onSubmit={handleSearch}>
                <Input type="search" placeholder="Search Zone..." className="w-[300px]" onChange={(e)=>{setPostValue(e.target.value)}}/>
                <input type="submit" value="Search"  className="text-white bg-primary px-4 py-1 rounded-md"/>
            </form>
        </div>


        <Table
        dataSource={
          posts &&
          posts.map((post: postType, i) => ({
            key: i,
            no: i + 1,
            name: post.post_name,
            update: <Button 
                    className="bg-yellow-400" 
                    onClick={()=>{
                        openEditModal()
                        fetchSinglePost(post.post_id)
                    }}>
                <BiEdit/><span>Edit</span>
            </Button>,
            delete: <Button className="bg-red-400 text-white"
                onClick={async()=>{
                        await deletePost(post.post_id)
                        getAllPosts()
                    }}>
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
        <form action="" className='mt-10' onSubmit={async (e: any)=>{
            e.preventDefault()
            //  eslint-disable-next-line
            await updatePost(post?.post_id as any, post?.post_name as any)
            getAllPosts()
        }}>
            
            <Input type='text' value={post?.post_name}  onChange={(e)=>{
                setPost({...post, post_name: e.target.value} as postType)
                }}/>
                <input type="submit" value={"Update Post"} className='bg-yellow-400 py-1 px-4 rounded-md my-3 cursor-pointer'  />
        </form>
        }
      </Modal>
    </DashboardLayout>
  )
}

export default PostsPage