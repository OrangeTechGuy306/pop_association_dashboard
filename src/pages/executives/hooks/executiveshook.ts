// import { authID, host } from "@/utils/host"
// import axios from "axios"
// import { toast } from "sonner"


// const useMemberHook = () => {

    
// // eslint-disable-next-line
//     const createNewMember = async(passport: any, mobile:string, zone: string, id: string, dob: string, status: string, fullname:string, post: string)=>{
//         try {
//             if(passport.trim() === "" || mobile.trim() === "" || zone.trim() === "" || id.trim() === "" || dob.trim() === "" || status.trim() === "" || fullname.trim() === "" || post.trim() === ""){
//                 return {status:false, msg:"Please fill all the required fields!"}
//             }else{

//                 const formData = new FormData()
//                 formData.append("passport", passport)
//                 formData.append("fullname", fullname)
//                 formData.append("mobile", mobile)
//                 formData.append("zone", zone)
//                 formData.append("id", id)
//                 formData.append("status", status)
//                 formData.append("post", post)
//                 formData.append("dob", dob)

//                 const {data} = await axios.post(`${host}/new/member`, formData,
                    
//                     {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                         Authorization: `Bearer ${authID}`,
//                     }
//                 } )

//                 if(data.status === true){
//                     toast.success(data.msg)
//                 }else{
//                     toast.error(data.msg)
//                 }
//             }
            
//             // eslint-disable-next-line
//         } catch (error: any) {
//             toast.error(error.message)
//         }
//     }




//   return{
//     createNewMember
//     }
// }

// export default useMemberHook