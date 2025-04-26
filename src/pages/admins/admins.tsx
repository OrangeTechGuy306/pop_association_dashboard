import DashboardLayout from "@/comps/Dashboardlayout";
import SummaryCard from "@/comps/summaryCard";
import { Avatar, Button, Input, Modal, Select, Table } from "antd";
import { FaEye, FaTrash, FaUsers } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlinePhotoCameraFront } from "react-icons/md";
import useAdmin, { adminInfoType } from "./module/adminmodule";
import { toast, Toaster } from "sonner";
import { fileUrl } from "@/utils/host";
// import useSigninAuth from "../signin/modules/signinAuth";

const AdminsPage = () => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [update, setUpdate] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [admin_type, setType] = useState("");
  const [conPass, setConPass] = useState("");
  const [image, setImage] = useState();
  const [admins, setAdmins] = useState<adminInfoType[]>();
  const [adminDetails, setAdminDetails] = useState<adminInfoType>();
  // const [updatedValues, setUpdatedValues] = useState({
  //   username: "",
  //   email: "",
  // });

  // const [adminType, setAdminType] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [filter, setFilter] = useState("");

  const {
    createAdmin,
    fetchAllAdmins,
    fetchAdminInfo,
    fetchSingleAdminInfo,
    updateAdminInfo,
    deleteAdmin,
    countAdmins,
    totalAdmins,
    countSuperAdmins,
    superAdmins,
    countAllAdmins,
    adminsTotal,
    masterTotal,
    filterController,
    countMasterAdmins,
    filterResult,
  } = useAdmin();

  const openDeleteModal = (id: number) => {
    setDeleteModal(true);
    return id;
  };

  //eslint-disable-next-line
  const newAdmin = async (e: any) => {
    e.preventDefault();
    await createAdmin(username, password, email, conPass, admin_type, image);
    getAuthAdmins();
    // setOpen(false)
  };

  //eslint-disable-next-line
  const updateAdmin = async (e: any, id: any) => {
    e.preventDefault();
    const res = await updateAdminInfo(
      adminDetails?.pop_admin_username,
      adminDetails?.email_mobile,
      adminDetails?.pop_admin_type,
      id
    );
    if (res?.status === true) {
      toast.success(res.msg);
    } else {
      toast.error(res?.msg);
    }
  };

  const removeAdmin = async (id: number) => {
    const res = await deleteAdmin(id);
    if (res?.status === true) {
      toast.success(res.msg);
      getAuthAdmins();
      setDeleteModal(false);
    } else {
      toast.error(res?.msg);
    }
  };

  const viewModal = () => {
    setView(true);
  };

  //eslint-disable-next-line
  const filterAdmin = async (e: any) => {
    e.preventDefault();
    await filterController(filter);
  };

  //eslint-disable-next-line
  // const onUpdateChange = (e: any) => {
  //   setUpdatedValues({ ...updatedValues, [e.target.name]: e.target.value });
  // };

  const getAuthAdmins = async () => {
    const res = await fetchAllAdmins();
    setAdmins(res.status === true ? res.msg : "");
  };

  const updateFormModal = () => {
    setUpdate(!update);
  };

  const openModal = () => {
    setOpen(true);
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
      title: "Username",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Admin Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const filterData = [
    { value: "date", label: "Date" },
    { value: "email", label: "Email" },
    { value: "type", label: "Admin Type" },
    { value: "username", label: "username" },
  ];

  // const changeAdminType = (adminType: string)=>{
  //   switch(adminType){
  //     case "super_admin":
  //       setAdminColorType("bg-green-500") ;
  //       break;
  //     case "master_admin":
  //        setAdminColorType("bg-yellow-500");
  //       break;
  //     default:
  //        setAdminColorType("bg-red-300");
  //       break;
  //   }
  // }

  useEffect(() => {
    getAuthAdmins();
    fetchAdminInfo();
    countAdmins();
    countSuperAdmins();
    countAllAdmins();
    countMasterAdmins();
  }, []);

  return (
    <DashboardLayout>
      <Toaster richColors position="top-right" />
      <div className="h-[86vh] overflow-y-scroll ">
        <div className="mb-5">
          <h1 className="font-bold text-3xl text-slate-400">Admin</h1>
        </div>
        <div className="flex items-center gap-3">
          <SummaryCard
            title="Active Admins"
            desc="Active Admins"
            total={Intl.NumberFormat().format(totalAdmins)}
            icon={<FaUsers size={20} className="text-slate-100" />}
            className="w-[200px] bg-primary text-white"
          />
          <SummaryCard
            title="Super Admins"
            desc="Admins"
            total={Intl.NumberFormat().format(superAdmins)}
            icon={<FaUsers size={20} className="text-slate-400" />}
          />
          <SummaryCard
            title="Admins"
            desc="All Admins"
            total={Intl.NumberFormat().format(adminsTotal)}
            icon={<FaUsers size={20} className="text-slate-400" />}
          />
          <SummaryCard
            title="Admins"
            desc="All Admins"
            total={Intl.NumberFormat().format(masterTotal)}
            icon={<FaUsers size={20} className="text-slate-400" />}
          />
        </div>
        <div className="my-5 flex justify-between items-center  ">
          <div className="flex items-center gap-5 flex-wrap">
            <form
              action=""
              className="flex items-center gap-2"
              onSubmit={filterAdmin}
            >
              <Select
                className="w-[200px]"
                placeholder={"Click to Filter By: Categories"}
                options={filterData}
                defaultValue={"Date"}
                onChange={(value) => setFilter(value)}
              />
              <button
                type="submit"
                className="py-1 px-4 rounded-md bg-primary text-white"
              >
                filter
              </button>
            </form>
            <form action="" className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Search Executives..."
                className="w-[300px]"
              />
              <input
                type="submit"
                className="py-1 px-4 rounded-md bg-primary text-white"
                value={"Search"}
              />
            </form>
          </div>
          <div>
            <Button
              className="bg-primary text-white flex items-center"
              onClick={openModal}
            >
              <IoMdPersonAdd /> <span>New Admin</span>{" "}
            </Button>
            <Modal open={open} onCancel={() => setOpen(false)} footer={null}>
              <form action="" onSubmit={newAdmin}>
                <div className="my-5">
                  <h1 className="text-xl text-slate-300">Create New Admin </h1>
                </div>
                {image ? (
                  <div className="my-3 flex flex-col">
                    <label
                      htmlFor="passport"
                      className=" w-[150px] overflow-hidden h-[150px] bg-slate-50 rounded-xl flex justify-center flex-col gap-2 items-center cursor-pointer"
                    >
                      <img src={URL.createObjectURL(image)} alt="" />
                    </label>
                    <input
                      type="file"
                      placeholder="Member Fullname"
                      className="hidden"
                      id="passport"
                      //eslint-disable-next-line
                      onChange={(e: any) => {
                        setImage(e.target.files[0]);
                      }}
                    />
                  </div>
                ) : (
                  <div className="my-3 flex flex-col justify-center">
                    <label
                      htmlFor="passport"
                      className=" w-[150px] overflow-hidden h-[150px] bg-slate-50 rounded-xl flex justify-center flex-col gap-2 items-center cursor-pointer"
                    >
                      <MdOutlinePhotoCameraFront
                        size={50}
                        className="text-slate-400"
                      />
                      <span className="text-slate-400">Upload Passport</span>
                    </label>
                    <input
                      type="file"
                      placeholder="Member Fullname"
                      className="hidden"
                      id="passport"
                      //eslint-disable-next-line
                      onChange={(e: any) => {
                        setImage(e.target.files[0]);
                      }}
                    />
                  </div>
                )}
                <div className="my-3">
                  <label htmlFor="">Username</label>
                  <Input
                    type="text"
                    placeholder="Admin Username"
                    className=""
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="">Email</label>
                  <Input
                    type="email"
                    placeholder="Admin Email"
                    className=""
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="">Password</label>
                  <Input
                    type="password"
                    placeholder="Admin Password"
                    className=""
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    className=""
                    onChange={(e) => setConPass(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="">Admin Type</label> <br />
                  <Select
                    className="w-[100%]"
                    placeholder={"Select the Admin Type"}
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "super_admin", label: "Super Admin" },
                      { value: "master_admin", label: "Master Admin" },
                    ]}
                    defaultValue={"Select Admin Type"}
                    onChange={(value) => setType(value)}
                  />
                </div>
                <div className="my-3">
                  <input
                    type="submit"
                    value={"Create New Admin"}
                    className="bg-primary text-white py-2 px-4 rounded-xl cursor-pointer"
                  />
                </div>
              </form>
            </Modal>
          </div>
        </div>
        {/* ADMINS TABLE */}
        <div className="my-10">
          {
            //eslint-disable-next-line
            (filterResult as any) != "" ? (
              <Table
                dataSource={filterResult?.map((d: adminInfoType, i) => ({
                  key: i + 1,
                  no: i + 1,
                  name: d.pop_admin_username,
                  passport: (
                    <Avatar src={`http://localhost:5000/${d.avatar}`} />
                  ),
                  email: d.email_mobile,
                  action: (
                    <>
                      <Button
                        className={`bg-red-500 text-white px-2 rounded-md`}
                        onClick={() => {
                          //eslint-disable-next-line
                          const res = openDeleteModal(d.pop_admin_id as any);
                          setDeleteId(res);
                        }}
                      >
                        <FaTrash />
                      </Button>
                      <Modal
                        open={deleteModal}
                        onCancel={() => {
                          setDeleteModal(false);
                        }}
                        footer={null}
                      >
                        <div className="flex flex-col gap-5">
                          <h1 className="text-xl mt-10">
                            Are you sure you want to Remove <br /> this Admin ?
                          </h1>
                          <small className="text-red-500">
                            Note: This action will remove the admin and will no
                            longer have access to this dashboard.
                          </small>
                          <Button
                            className="bg-red-500 text-white"
                            onClick={() => {
                              removeAdmin(deleteId);
                            }}
                          >
                            <FaTrash /> Click to Remove Admin
                          </Button>
                        </div>
                      </Modal>
                    </>
                  ),
                  view: (
                    <button
                      className="bg-primary text-white px-4 py-2 rounded-md"
                      onClick={async () => {
                        viewModal();
                        //eslint-disable-next-line
                        const res = await fetchSingleAdminInfo(
                          //eslint-disable-next-line
                          d?.pop_admin_id as any
                        );
                        if (res?.status === true) {
                          setAdminDetails(res.msg);
                        }
                      }}
                    >
                      <FaEye />
                    </button>
                  ),
                  type: (
                    <button
                      className={`bg-green-500 text-white px-2 rounded-md`}
                    >
                      {d.pop_admin_type}
                    </button>
                  ),
                }))}
                columns={columns}
              />
            ) : (
              <Table
                dataSource={admins?.map((d: adminInfoType, i) => ({
                  key: i + 1,
                  no: i + 1,
                  name: d.pop_admin_username,
                  passport: (
                    <Avatar src={`http://localhost:5000/${d.avatar}`} />
                  ),
                  email: d.email_mobile,
                  action: (
                    <>
                      <Button
                        className={`bg-red-500 text-white px-2 rounded-md`}
                        onClick={() => {
                          //eslint-disable-next-line
                          const res = openDeleteModal(d.pop_admin_id as any);
                          setDeleteId(res);
                        }}
                      >
                        <FaTrash />
                      </Button>
                      <Modal
                        open={deleteModal}
                        onCancel={() => {
                          setDeleteModal(false);
                        }}
                        footer={null}
                      >
                        <div className="flex flex-col gap-5">
                          <h1 className="text-xl mt-10">
                            Are you sure you want to Remove <br /> this Admin ?
                          </h1>
                          <small className="text-red-500">
                            Note: This action will remove the admin and will no
                            longer have access to this dashboard.
                          </small>
                          <Button
                            className="bg-red-500 text-white"
                            onClick={() => {
                              removeAdmin(deleteId);
                            }}
                          >
                            <FaTrash /> Click to Remove Admin
                          </Button>
                        </div>
                      </Modal>
                    </>
                  ),
                  view: (
                    <button
                      className="bg-primary text-white px-4 py-2 rounded-md"
                      onClick={async () => {
                        viewModal();
                        //eslint-disable-next-line
                        const res = await fetchSingleAdminInfo(
                          //eslint-disable-next-line
                          d?.pop_admin_id as any
                        );
                        if (res?.status === true) {
                          setAdminDetails(res.msg);
                        }
                      }}
                    >
                      <FaEye />
                    </button>
                  ),
                  type: (
                    <button
                      className={`bg-green-500 text-white px-2 rounded-md`}
                    >
                      {d.pop_admin_type}
                    </button>
                  ),
                }))}
                columns={columns}
              />
            )
          }
          <Modal open={view} onCancel={() => setView(false)} footer={null}>
            <h1 className="bg-primary text-white rounded-md px-5 py-2 mt-5">
              Admin Information
            </h1>
            <div className="flex justify-between items-center">
              <div className="my-5 flex items-center gap-5">
                <Avatar src={`${fileUrl}/${adminDetails?.avatar}`} size={100} />
                <div className="my-5">
                  <h1 className="text-slate-400 text-xl">
                    {adminDetails?.pop_admin_username}
                  </h1>
                  <small>{adminDetails?.email_mobile}</small> <br />
                  <button className="bg-green-100 py-1 px-2 rounded-md text-primary text-sm">
                    {adminDetails?.pop_admin_type}
                  </button>
                </div>
              </div>
              <Button onClick={updateFormModal} className="bg-yellow-300">
                {update ? "Close" : "Update Profile"}
              </Button>
            </div>

            {update ? (
              <form
                action=""
                onSubmit={(e) => updateAdmin(e, adminDetails?.pop_admin_id)}
              >
                <div className="my-5">
                  <h1 className="text-xl text-slate-300">
                    Update Admin Profile
                  </h1>
                </div>
                <div className="my-3">
                  <label htmlFor="">Username</label>
                  <Input
                    type="text"
                    placeholder="Admin Username"
                    name="username"
                    value={adminDetails?.pop_admin_username}
                    onChange={(e) => {
                      setAdminDetails({
                        ...adminDetails,
                        pop_admin_username: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="">Email</label>
                  <Input
                    type="email"
                    placeholder="Admin Email"
                    // name="email"
                    value={adminDetails?.email_mobile}
                    onChange={(e) => {
                      setAdminDetails({
                        ...adminDetails,
                        email_mobile: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="">Admin Type</label> <br />
                  <Select
                    className="w-[100%]"
                    placeholder={"Select the Admin Type"}
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "super_admin", label: "Super Admin" },
                      { value: "master_admin", label: "Master Admin" },
                    ]}
                    defaultValue={adminDetails?.pop_admin_type}
                    onChange={(value) =>
                      setAdminDetails({
                        ...adminDetails,
                        pop_admin_type: value,
                      })
                    }
                  />
                </div>
                <div className="my-3">
                  <input
                    type="submit"
                    value={"Update Admin Profile"}
                    className="bg-primary text-white py-2 px-4 rounded-xl cursor-pointer"
                  />
                </div>
              </form>
            ) : null}
          </Modal>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminsPage;
