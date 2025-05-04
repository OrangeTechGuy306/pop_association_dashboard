import DashboardLayout from "@/comps/Dashboardlayout";
import SummaryCard from "@/comps/summaryCard";
import { Avatar, Button, Input, Modal, Select, Table } from "antd";
import { FaEye, FaUsers } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from "react";
// eslint-disable-next-line
import { memberProps } from "../member/membertype";
// import useMemberHook from "./hooks/executiveshook";


const ExecutivesPage = () => {

  const [dataSource, setDataSource] = useState([]);
  const [view, setView] = useState(false);
  const [update, setUpdate] = useState(false);
  

  const fetchData = async () => {
    const { data } = await axios.get(
      "https://672c992f1600dda5a9f9172e.mockapi.io/members"
    );
    setDataSource(data);
  };

  const viewModal = () => {
    setView(true);
  };
  const updateFormModal = () => {
    setUpdate(!update);
  };

  // const newMember = async(e: any)=>{
  //   e.preventDefault()
  //   await createNewMember(passport, mobile, zone, id, dob, status, fullname, post)
  // }

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="h-[86vh] overflow-y-scroll ">
        <div className="mb-5">
          <h1 className="font-bold text-3xl text-slate-400">Executives</h1>
        </div>
        <div className="flex items-center gap-3">
          <SummaryCard
            title="Executives"
            desc="Current Executives"
            total={Intl.NumberFormat().format(4287687)}
            icon={<FaUsers size={50} className="text-slate-100" />}
            className="bg-primary text-white"
          />
          <SummaryCard
            title="Formal Executives"
            desc="Formal Executives"
            total={Intl.NumberFormat().format(2121)}
            icon={<FaUsers size={50} className="text-slate-400" />}
          />
          <SummaryCard
            title="Executives"
            desc="All Executives"
            total={Intl.NumberFormat().format(2121)}
            icon={<FaUsers size={50} className="text-slate-400" />}
          />
        </div>
        <div className="my-5 flex justify-between items-center  ">
          <div className="flex items-center gap-5 flex-wrap">
            <form action="" className="flex items-center gap-2">
              <Select
                className="w-[200px]"
                placeholder={"Click to Filter By: Categories"}
                options={[{ value: "date", label: "Date" }]}
                defaultValue={"Date"}
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
          {/* <div>
            <Button
              className="bg-primary text-white flex items-center"
              onClick={openModal}
            >
              <IoMdPersonAdd /> <span>New Member</span>{" "}
            </Button>
            <Modal open={open} onCancel={() => setOpen(false)} footer={null}>
              <form action="">
                <div className="my-5">
                  <h1 className="text-xl text-slate-300">
                    Add New Member to the Database{" "}
                  </h1>
                </div>
                <div className="my-3 flex flex-col">
                  <label
                    htmlFor="passport"
                    className=" w-[100%] h-[150px] bg-slate-50 rounded-xl flex flex-col gap-2 items-center cursor-pointer"
                  >
                    <MdOutlinePhotoCameraFront
                      size={100}
                      className="text-slate-100"
                    />
                    <span className="text-xl text-slate-200">
                      Upload Passport
                    </span>
                  </label>
                  <input
                    type="file"
                    placeholder="Member Fullname"
                    className="hidden"
                    id="passport"
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="">Full Name</label>
                  <Input
                    type="text"
                    placeholder="Member Fullname"
                    className=""
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="">Phone Number</label>
                  <Input
                    type="number"
                    placeholder="Member Mobile NO."
                    className=""
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="">ID Card NO.</label>
                  <Input
                    type="text"
                    placeholder="Member ID Card NO."
                    className=""
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="">Date OF Birth (DOB)</label>
                  <Input
                    type="date"
                    placeholder="Member ID Card NO."
                    className=""
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="">Zone</label> <br />
                  <Select
                    className="w-[100%]"
                    placeholder={"Click to Filter By: Categories"}
                    options={[{ value: "date", label: "Date" }]}
                    defaultValue={"Date"}
                  />
                </div>
                <div className="my-3">
                  <input
                    type="submit"
                    value={"Add New Member to Database"}
                    className="bg-primary text-white py-2 px-4 rounded-xl"
                  />
                </div>
              </form>
            </Modal>
          </div> */}
        </div>
        <div className="my-10">
          <Table
            dataSource={dataSource.map((d: memberProps, i) => ({
              key: i + 1,
              no: i + 1,
              name: d.fullname,
              passport: <Avatar src={d.passport} />,
              mobile: d.mobile,
              zone: "Zone A Oja koro alapa Ilorin",
              post: "Chair Man and the director",
              id: d.ID_NO,
              dob: d.dob,
              view: (
                <button
                  className="bg-primary text-white px-4 py-2 rounded-md"
                  onClick={viewModal}
                >
                  <FaEye />
                </button>
              ),
              status: (
                <button className="bg-green-500 text-white px-2 rounded-md">
                  Active
                </button>
              ),
            }))}
            columns={columns}
          />
          <Modal open={view} onCancel={() => setView(false)} footer={null}>
            <h1 className="bg-primary text-white rounded-md px-5 py-2 mt-5">
              User Information
            </h1>
            <div className="flex justify-between items-center">
              <div className="my-5 flex items-center gap-5">
                <Avatar src="" size={100} />
                <div className="my-5">
                  <h1 className="text-slate-400 text-xl">Hanafi Taofiq</h1>
                  <small>9894324374834</small> <br />
                  <button className="bg-primary py-1 px-2 rounded-md text-white text-sm">
                    Member
                  </button>
                </div>
              </div>
              <Button onClick={updateFormModal}>{update ? "Close" :"Update Profile"}</Button>
            </div>
            <div className="flex gap-5 flex-wrap">
              <div className="">
                <h1 className="font-bold text-primary">Mobile NO.</h1>
                <small className="text-md">48384934</small>
              </div>
              <div className="">
                <h1 className="font-bold text-primary">Zone</h1>
                <small className="text-md">48384934</small>
              </div>
              <div className="">
                <h1 className="font-bold text-primary">Post</h1>
                <small className="text-md">Member</small>
              </div>
              <div className="">
                <h1 className="font-bold text-primary">DOB</h1>
                <small className="text-md">1997</small>
              </div>
              <div className="">
                <h1 className="font-bold text-primary">Status</h1>
                <small className="text-md">Active</small>
              </div>
            </div>
            {update ? (
              <form action="">
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
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="">Phone Number</label>
                  <Input
                    type="number"
                    placeholder="Member Mobile NO."
                    className=""
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="">ID Card NO.</label>
                  <Input
                    type="text"
                    placeholder="Member ID Card NO."
                    className=""
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="">Date OF Birth (DOB)</label>
                  <Input
                    type="date"
                    placeholder="Member ID Card NO."
                    className=""
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="">Zone</label> <br />
                  <Select
                    className="w-[100%]"
                    placeholder={"Click to Filter By: Categories"}
                    options={[{ value: "date", label: "Date" }]}
                    defaultValue={"Date"}
                  />
                </div>
                <div className="my-3">
                  <input
                    type="submit"
                    value={"Add New Member to Database"}
                    className="bg-primary text-white py-2 px-4 rounded-xl"
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

export default ExecutivesPage;
