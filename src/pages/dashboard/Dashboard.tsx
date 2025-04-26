import DashboardLayout from "@/comps/Dashboardlayout";
import useDashboardHook from "./hook/dashboardhook";
import { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import { Toaster } from "sonner";

const Dashboard = () => {
  const { newPost, getAllPosts, newZone, getAllZones } = useDashboardHook();
  const [openPost, setOpenPost] = useState(false);
  const [openZone, setOpenZone] = useState(false);
  const [post, setPost] = useState("");
  const [zone, setZone] = useState("");

  // POST MODAL
  const openCreatePost = () => {
    setOpenPost(true);
  };
  const openCreateZone = () => {
    setOpenZone(true);
  };

  //eslint-disable-next-line
  const createPost = async (e: any) => {
    e.preventDefault();
    await newPost(post);
    // setPost("")
  };

  //eslint-disable-next-line
  const createZone = async (e: any) => {
    e.preventDefault();
    await newZone(zone);
  };

  useEffect(() => {
    getAllPosts();
    getAllZones();
  }, []);

  return (
    <DashboardLayout>
      <Toaster richColors position="top-right" />
      <h1 className="text-slate-400 font-bold text-2xl">DASHBOARD</h1>
      {/* BUTTON TO CREATE A POST AND ZONE */}
      <div className="flex justify-end items-center gap-5">
        <div className="flex justify-start items-center gap-5">
          <div>
            {/* CONTAINER TO CREATE A NEW POST */}
            <Button onClick={openCreatePost} className="bg-primary text-white">
              Create a Post
            </Button>
            <Modal
              open={openPost}
              onCancel={() => setOpenPost(false)}
              footer={null}
            >
              <h1 className="my-10 text-xl font-bold text-slate-300">
                Create a New Post
              </h1>
              <form action="" onSubmit={createPost}>
                <div className="my-5">
                  <label htmlFor="">Post</label>
                  <Input
                    type="text"
                    placeholder="Enter the new Post"
                    onChange={(e) => {
                      setPost(e.target.value);
                    }}
                  />
                </div>
                <div className="my-5 flex justify-end">
                  <input
                    type="submit"
                    value="Create New Post"
                    onChange={(e) => {
                      setPost(e.target.value);
                    }}
                    className="bg-primary text-white px-5 py-2 rounded-md cursor-pointer"
                  />
                </div>
              </form>
            </Modal>
          </div>
        </div>
        <div className="flex justify-start items-center gap-5">
          <div>
            {/* CONTAINER TO CREATE A NEW ZONE */}
            <Button onClick={openCreateZone} className="">
              Create a Zone
            </Button>
            <Modal
              open={openZone}
              onCancel={() => setOpenZone(false)}
              footer={null}
            >
              <h1 className="my-10 text-xl font-bold text-slate-300">
                Create a New Zone
              </h1>
              <form action="" onSubmit={createZone}>
                <div className="my-5">
                  <label htmlFor="">Zone Name</label>
                  <Input
                    type="text"
                    placeholder="Enter the new Zone"
                    onChange={(e) => {
                      setZone(e.target.value);
                    }}
                  />
                </div>
                <div className="my-5 flex justify-end">
                  <input
                    type="submit"
                    value="Add New Zone"
                    onChange={(e) => {
                      setPost(e.target.value);
                    }}
                    className="bg-primary text-white px-5 py-2 rounded-md cursor-pointer"
                  />
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </div>
      {/* WELCOME DASHBOARD  */}
      <div className="h-[200px] bg-glass rounded-xl my-5 py-5 px-10 flex justify-between items-center gap-3 flex-wrap">
        <div className="">
          <h1 className="text-4xl font-bold text-slate-400 ">Welcome Back!</h1>
          <p className="text-slate-400 my-2">
            to the Dashboard of <br />{" "}
            <span className="text-primary">
              ASSOCIATION OF POP, GYPSIUM & ARCHITECTURAL ORNAMENT ARTISTS
            </span>
          </p>
        </div>
        <div>
          <img src="/assets/pop_logo.png" width={100} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
