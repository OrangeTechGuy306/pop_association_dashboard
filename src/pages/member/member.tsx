import DashboardLayout from "@/comps/Dashboardlayout";
import SummaryCard from "@/comps/summaryCard";
import { Avatar, Button, Input, Modal, Select, Table } from "antd";
import { FaEye, FaUsers } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlinePhotoCameraFront } from "react-icons/md";
import useMemberHook, { memberProps } from "./hooks/memberhook";
import useDashboardHook from "../dashboard/hook/dashboardhook";
import { Toaster } from "sonner";
import { fileUrl } from "@/utils/host";
import { BiTrash } from "react-icons/bi";

const MemberPage = () => {
  
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [update, setUpdate] = useState(false);

  const {
    createNewMember,
    members,
    getAllMembers,
    fetchSingleMember,
    member_profile,
    userUpdateInfo,
    setUserUpdateInfo,
    updateMemberInfo,
    TotalDead,
    TotalMembers,
    TotalLeave,
    TotalSuspended,
    suspended,
    leave,
    dead,
    allMember,
    filterMemberInfo,
    filter_member,
    searchMemberInfo,
    deleteMember,
    loading
  } = useMemberHook();

  const [fullname, setFullname] = useState("");
  const [passport, setPassport] = useState();
  const [dob, setDOB] = useState("");
  const [id, setID] = useState("");
  const [post, setPost] = useState("");
  const [mobile, setMobile] = useState("");
  const [status, setStatus] = useState("");
  const [zone, setZone] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [bossName, setbossName] = useState("");

  const { posts, getAllPosts, getAllZones, zones } = useDashboardHook();

  const viewModal = () => {
    setView(true);
  };
  const updateFormModal = () => {
    setUpdate(!update);
  };

  const openModal = () => {
    setOpen(true);
  };

  // eslint-disable-next-line
  const uploadPassport = (e: any) => {
    setPassport(e.target.files[0]);
  };
  // eslint-disable-next-line
  const newMember = async (e: any) => {
    e.preventDefault();
    await createNewMember(
      passport,
      mobile,
      zone,
      id,
      dob,
      status,
      fullname,
      post,
      bossName
    );
    getAllMembers();
  };

  const columns = [
    {
      title: "S/NO",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Passport",
      dataIndex: "passport",
      key: "passport",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Zone",
      dataIndex: "zone",
      key: "zone",
    },
    {
      title: "Post",
      dataIndex: "post",
      key: "post",
    },
    {
      title: "ID Card NO.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
    },
  ];

  const memberStatus = [
    {
      label: "Suspended",
      value: "Suspended",
    },
    {
      label: "Active",
      value: "Active",
    },
    {
      label: "Leave",
      value: "Leave",
    },
    {
      label: "Dead",
      value: "Dead",
    },
  ];

  const filterData = [
    {
      label: "Date",
      value: "date",
    },
    {
      label: "full Name",
      value: "fullname",
    },
    {
      label: "Mobile NO.",
      value: "mobile",
    },
    {
      label: "Post",
      value: "post",
    },
    {
      label: "Zone",
      value: "zone",
    },
    {
      label: "Date of Birth",
      value: "dob",
    },
    {
      label: "Member Status",
      value: "status",
    },
    {
      label: "ID Card NO.",
      value: "id_card_no",
    },
  ];

  // eslint-disable-next-line
  const filter = (e: any) => {
    e.preventDefault();
    filterMemberInfo(filterValue);
  };
  // eslint-disable-next-line
  const search = (e: any) => {
    e.preventDefault();
    searchMemberInfo(searchValue);
  };

  useEffect(() => {
    getAllPosts();
    getAllZones();
    getAllMembers();
    TotalDead();
    TotalMembers();
    TotalLeave();
    TotalSuspended();
  }, []);

  return (
    <DashboardLayout>
      <Toaster richColors position="top-right" />
      <div className="h-[86vh] overflow-y-scroll ">

        
        {loading ?

          <div className='min-h-[80vh] flex justify-center items-center'>
            <h1>Please Wait...</h1>
          </div> :
          <>
            <div className="mb-5">
              <h1 className="font-bold text-3xl text-slate-400">Members</h1>
            </div>
            <div className="flex items-center gap-3">
              <SummaryCard
                title="Members"
                desc="All Members"
                total={Intl.NumberFormat().format(allMember)}
                icon={<FaUsers size={20} className="text-slate-400" />}
                className=""
              />
              <SummaryCard
                title="Suspended"
                desc="Members"
                total={Intl.NumberFormat().format(suspended)}
                icon={<FaUsers size={20} className="text-slate-400" />}
              />
              <SummaryCard
                title="Members"
                desc="Leave"
                total={Intl.NumberFormat().format(leave)}
                icon={<FaUsers size={20} className="text-slate-400" />}
              />
              <SummaryCard
                title="Members"
                desc="Dead"
                total={Intl.NumberFormat().format(dead)}
                icon={<FaUsers size={20} className="text-slate-400" />}
              />
            </div>
            <div className="my-5 flex justify-between items-center  ">
              <div className="flex items-center gap-5 flex-wrap">
                <form
                  action=""
                  className="flex items-center gap-2"
                  onSubmit={filter}
                >
                  <Select
                    className="w-[200px]"
                    placeholder={"Filter By: "}
                    options={filterData}
                    onChange={(value) => {
                      setFilterValue(value);
                    }}
                  />
                  <button
                    type="submit"
                    className="py-1 px-4 rounded-md bg-primary text-white"
                  >
                    filter
                  </button>
                </form>
                <form
                  action=""
                  className="flex items-center gap-2"
                  onSubmit={search}
                >
                  <Input
                    type="search"
                    placeholder="Search Member..."
                    className="w-[300px]"
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                  />
                  <input
                    type="submit"
                    className="py-1 px-4 rounded-md bg-primary text-white"
                    value={"Search"}
                  />
                </form>
              </div>
              {/* NEW MEMBER FORM */}
              <div>
                <Button
                  className="bg-primary text-white flex items-center"
                  onClick={openModal}
                >
                  <IoMdPersonAdd /> <span>New Member</span>{" "}
                </Button>
               
              </div>
            </div>
            <div className="my-10">
              {
                //eslint-disable-next-line
                (filter_member as any) != "" ? (
                  <Table
                    dataSource={filter_member?.map((d: memberProps, i) => ({
                      key: i,
                      no: i + 1,
                      name: d.fullname,
                      passport: <Avatar src={`${fileUrl}/${d.passport}`} />,
                      mobile: d.mobile,
                      zone: d.zone,
                      post: d.post,
                      id: d.id_card_no,
                      dob: d.dob,
                      view: (
                        <>
                          <button
                            className="bg-primary text-white px-4 py-2 rounded-md"
                            onClick={() => {
                              viewModal();
                              fetchSingleMember(d.pop_member_id);
                            }}
                          >
                            <FaEye />
                          </button>
                          <button
                            className="bg-red-400 text-white px-4 py-2 rounded-md"
                            onClick={() => {
                              // viewModal();
                              deleteMember(d.pop_member_id);
                            }}
                          >
                            <FaEye />
                          </button>
                        </>
                      ),
                      status: (
                        <button className="bg-green-100 px-2 rounded-md">
                          {d.status}
                        </button>
                      ),
                    }))}
                    columns={columns}
                  />
                ) : (

                  <Table
                    dataSource={members?.map((d: memberProps, i) => ({
                      key: i + 1,
                      no: i + 1,
                      name: d.fullname,
                      passport: <Avatar src={`${fileUrl}/${d.passport}`} />,
                      mobile: d.mobile,
                      zone: d.zone,
                      post: d.post,
                      id: d.id_card_no,
                      dob: d.dob,
                      view: (
                        <>
                          <button
                            className="bg-emerald-400 text-white px-4 py-2 rounded-md mx-2"
                            onClick={() => {
                              viewModal();
                              fetchSingleMember(d.pop_member_id);
                            }}
                          >
                            <FaEye />
                          </button>
                          <button
                            className="bg-red-400 text-white px-4 py-2 rounded-md"
                            onClick={() => {
                              // viewModal();
                              deleteMember(d.pop_member_id);
                            }}
                          >
                            <BiTrash />
                          </button>
                        </>
                      ),
                      status:
                        d.status === "Active" ? (
                          <button className="bg-green-200 text-emerald-500 px-2 rounded-md">
                            {d.status}
                          </button>
                        ) : (
                          <button className="bg-yellow-200 text-orange-500 px-2 rounded-md">
                            {d.status}
                          </button>
                        ),
                    }))}
                    columns={columns}
                  />
                )
              }
              {/* USER INFORMATION AND PROFILE UPDATE FORM */}
              <Modal open={view} onCancel={() => setView(false)} footer={null}>
                <h1 className="bg-primary text-white rounded-md px-5 py-2 mt-5">
                  Member Information
                </h1>
                <div className="flex justify-between items-center">
                  <div className="my-5 flex items-center gap-5">
                    <Avatar
                      src={`${fileUrl}/${member_profile?.passport}`}
                      size={100}
                    />
                    <div className="my-5">
                      <h1 className="text-slate-400 text-xl">
                        {member_profile?.fullname}
                      </h1>
                      <small>{member_profile?.mobile}</small> <br />
                      <button className="bg-primary py-1 px-2 rounded-md text-white text-sm">
                        {member_profile?.status}
                      </button>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      updateFormModal();
                    }}
                    className={
                      update ? "bg-red-400 text-white" : "bg-emerald-400 text-white"
                    }
                  >
                    {update ? "Close" : "Update Profile"}
                  </Button>
                </div>
                <div className="flex gap-5 flex-wrap">
                  <div className="">
                    <h1 className="font-bold text-primary">Mobile NO.</h1>
                    <small className="text-md">{member_profile?.mobile}</small>
                  </div>
                  <div className="">
                    <h1 className="font-bold text-primary">Zone</h1>
                    <small className="text-md">{member_profile?.zone}</small>
                  </div>
                  <div className="">
                    <h1 className="font-bold text-primary">Post</h1>
                    <small className="text-md">{member_profile?.post}</small>
                  </div>
                  <div className="">
                    <h1 className="font-bold text-primary">DOB</h1>
                    <small className="text-md">{member_profile?.dob}</small>
                  </div>
                  <div className="">
                    <h1 className="font-bold text-primary">Status</h1>
                    <small className="text-md">{member_profile?.status}</small>
                  </div>
                </div>
                {update ? (
                  <form
                    action=""
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateMemberInfo();
                      getAllMembers();
                    }}
                  >
                    <div className="my-5">
                      <h1 className="text-xl text-slate-300">
                        Update Member Information
                      </h1>
                    </div>

                    <div className="my-3">
                      <label htmlFor="">Full Name</label>
                      <Input
                        type="text"
                        placeholder="Member Fullname"
                        className=""
                        value={userUpdateInfo?.fullname}
                        // eslint-disable-next-line
                        onChange={(e: any) =>
                          setUserUpdateInfo({
                            ...userUpdateInfo,
                            fullname: e.target.value,
                          } as memberProps)
                        }
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="">Phone Number</label>
                      <Input
                        type="number"
                        placeholder="Member Mobile NO."
                        className=""
                        value={userUpdateInfo?.mobile}
                        // eslint-disable-next-line
                        onChange={(e: any) =>
                          setUserUpdateInfo({
                            ...userUpdateInfo,
                            mobile: e.target.value,
                          } as memberProps)
                        }
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="">ID Card NO.</label>
                      <Input
                        type="text"
                        placeholder="Member ID Card NO."
                        className=""
                        value={userUpdateInfo?.id_card_no}
                        // eslint-disable-next-line
                        onChange={(e: any) =>
                          setUserUpdateInfo({
                            ...userUpdateInfo,
                            id_card_no: e.target.value,
                          } as memberProps)
                        }
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="">Member Boss Name</label>
                      <Input
                        type="text"
                        placeholder="Member Boss Name"
                        className=""
                        value={userUpdateInfo?.boss_name}
                        // eslint-disable-next-line
                        onChange={(e: any) =>
                          setUserUpdateInfo({
                            ...userUpdateInfo,
                            boss_name: e.target.value,
                          } as memberProps)
                        }
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="">Date OF Birth (DOB)</label>
                      <Input
                        type="date"
                        placeholder="Member ID Card NO."
                        className=""
                        value={userUpdateInfo?.dob}
                        // eslint-disable-next-line
                        onChange={(e: any) =>
                          setUserUpdateInfo({
                            ...userUpdateInfo,
                            dob: e.target.value,
                          } as memberProps)
                        }
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="">Zone</label> <br />
                      <Select
                        className="w-[100%]"
                        placeholder={"Click to Filter By: Categories"}
                        options={zones.map((z) => ({
                          label: z.zone_name,
                          value: z.zone_name,
                        }))}
                        defaultValue={userUpdateInfo?.zone}
                        // eslint-disable-next-line
                        onChange={(e: any) =>
                          setUserUpdateInfo({
                            ...userUpdateInfo,
                            zone: e,
                          } as memberProps)
                        }
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="">Member Post</label> <br />
                      <Select
                        className="w-[100%]"
                        placeholder={"Click to Filter By: Categories"}
                        options={posts?.map((z) => ({
                          label: z.post_name,
                          value: z.post_name,
                        }))}
                        defaultValue={userUpdateInfo?.post}
                        // eslint-disable-next-line
                        onChange={(e: any) =>
                          setUserUpdateInfo({
                            ...userUpdateInfo,
                            post: e,
                          } as memberProps)
                        }
                      />
                    </div>
                    <div className="my-3">
                      <input
                        type="submit"
                        value={"Add New Member to Database"}
                        className="bg-primary text-white py-2 px-4 rounded-xl cursor-pointer"
                      />
                    </div>
                  </form>
                ) : null}
              </Modal>
            </div>
          </>

        }

            {/* ADDING NEW MEMBER MODAL */}
         <Modal open={open} onCancel={() => setOpen(false)} footer={null}>
                  <form action="" onSubmit={newMember}>
                    <div className="my-5">
                      <h1 className="text-xl text-slate-300">
                        Add New Member to the Database{" "}
                      </h1>
                    </div>
                    {passport ? (
                      <div className="my-3 flex flex-col">
                        <label
                          htmlFor="passport"
                          className=" w-[150px] h-[150px] bg-slate-200 rounded-xl flex flex-col gap-2 items-center justify-center cursor-pointer overflow-hidden"
                        >
                          <img src={URL.createObjectURL(passport)} alt="" />
                        </label>
                        <input
                          type="file"
                          className="hidden"
                          id="passport"
                          onChange={uploadPassport}
                        />
                      </div>
                    ) : (
                      <div className="my-3 flex flex-col">
                        <label
                          htmlFor="passport"
                          className=" w-[150px] h-[150px] bg-slate-200 rounded-xl flex flex-col gap-2 items-center justify-center cursor-pointer"
                        >
                          <MdOutlinePhotoCameraFront
                            size={50}
                            className="text-slate-400"
                          />
                          <span className=" text-slate-400">Upload Passport</span>
                        </label>
                        <input
                          type="file"
                          className="hidden"
                          id="passport"
                          onChange={uploadPassport}
                        />
                      </div>
                    )}
                    <div className="my-3">
                      <label htmlFor="">Full Name</label>
                      <Input
                        type="text"
                        placeholder="Member Fullname"
                        className=""
                        onChange={(e) => setFullname(e.target.value)}
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="">Phone Number</label>
                      <Input
                        type="number"
                        placeholder="Member Mobile NO."
                        className=""
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="">ID Card NO.</label>
                      <Input
                        type="text"
                        placeholder="Member ID Card NO."
                        className=""
                        onChange={(e) => setID(e.target.value)}
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="">Member Boss Name</label>
                      <Input
                        type="text"
                        placeholder="Boss Name"
                        className=""
                        onChange={(e) => setbossName(e.target.value)}
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="">Date OF Birth (DOB)</label>
                      <Input
                        type="date"
                        className=""
                        onChange={(e) => setDOB(e.target.value)}
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="">Zone</label> <br />
                      <Select
                        className="w-[100%]"
                        placeholder={"Assign Zone"}
                        options={zones?.map((z, i) => ({
                          key: i + 1,
                          label: z.zone_name,
                          value: z.zone_name,
                        }))}
                        // defaultValue={""}
                        onChange={(value) => setZone(value)}
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="">Member Status</label> <br />
                      <Select
                        className="w-[100%]"
                        placeholder={"Choose the status member"}
                        options={memberStatus}
                        // defaultValue={"Active"}
                        onChange={(value) => setStatus(value)}
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="">Assign Post</label> <br />
                      <Select
                        className="w-[100%]"
                        placeholder={"Assign a post to member"}
                        options={posts?.map((p, i) => ({
                          key: i + 1,
                          label: p.post_name,
                          value: p.post_name,
                        }))}
                        defaultValue={"member"}
                        onChange={(value) => setPost(value)}
                      />
                    </div>
                    <div className="my-3">
                      <input
                        type="submit"
                        disabled={loading}
                        value={loading ? "Please wait..." :"Add new Member"}
                        className="bg-primary text-white py-2 px-4 rounded-xl cursor-pointer"
                      />
                    </div>
                  </form>
          </Modal>

      </div>


    </DashboardLayout>
  );
};

export default MemberPage;
