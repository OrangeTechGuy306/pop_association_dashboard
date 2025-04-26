// import toast from "sonner"

import { authID } from "@/utils/host";
import { host } from "@/utils/server";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export interface adminInfoType {
  avatar?: string;
  createdAt?: string;
  email_mobile?: string;
  pop_admin_id?: number;
  pop_admin_type?: string;
  pop_admin_username?: string;
  updatedAt?: string;
}

const useAdmin = () => {
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [superAdmins, setSuperAdmins] = useState(0);
  const [adminsTotal, setAdmins] = useState(0);
  const [masterTotal, setMasterTotal] = useState(0);
  const [filterResult, setFilterResult] = useState([]);

  //eslint-disable-next-line
  const createAdmin = async (
    username: string,
    password: string,
    email: string,
    confirm_password: string,
    admin_type: string,
    //eslint-disable-next-line
    file: any
  ) => {
    try {
      if (
        !username ||
        !password ||
        !email ||
        !confirm_password ||
        !admin_type ||
        !file
      ) {
        toast.error("Please fill all fields");
      } else {
        const formData = new FormData();
        formData.append("passport", file);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("confirm_password", confirm_password);
        formData.append("admin_type", admin_type);
        const { data } = await axios.post(`${host}/new/admin`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (data.status === true) {
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      }
      //eslint-disable-next-line
    } catch (error: any) {
      toast.error(error?.message);
      // console.log(error)
    }
  };

  const updateAdminInfo = async (
    username?: string,
    email?: string,
    admin_type?: string,
    id?: number
  ) => {
    try {
      if (!username || !email || !admin_type || !id) {
        return { status: false, msg: "Please fill all fields" };
      } else {
        const { data } = await axios.put(
          `${host}/update/admin/${id}`,
          { username, email, admin_type },
          {
            headers: {
              Authorization: `Bearer ${authID}`,
            },
          }
        );
        // console.log(data)
        if (data.status === true) {
          return { status: true, msg: data.msg };
        } else {
          return { status: false, msg: data.msg };
        }
      }
      //eslint-disable-next-line
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const fetchAllAdmins = async () => {
    const { data } = await axios.get(`${host}/admins`, {
      headers: {
        Authorization: `Bearer ${authID}`,
      },
    });
    if (data.status === true) {
      return { status: true, msg: data.msg };
    } else {
      return { status: false, msg: data.msg };
    }
  };

  const fetchAdminInfo = async () => {
    const { data } = await axios.get(`${host}/admin/info`, {
      headers: {
        Authorization: `Bearer ${authID}`,
      },
    });
    if (data.status === true) {
      return { status: true, msg: data.msg };
    } else {
      return { status: false, msg: data.msg };
    }
  };

  const fetchSingleAdminInfo = async (id: number | string) => {
    try {
      if (id) {
        const { data } = await axios.get(`${host}/admin/info/${id}`, {
          headers: {
            Authorization: `Bearer ${authID}`,
          },
        });
        if (data.status === true) {
          return { status: true, msg: data.msg };
        } else {
          return { status: false, msg: data.msg };
        }
      }
      //eslint-disable-next-line
    } catch (error: any) {
      return { status: false, msg: error.message };
    }
  };

  const deleteAdmin = async (id: number) => {
    try {
      if (id) {
        const { data } = await axios.delete(`${host}/delete/admin/${id}`, {
          headers: {
            Authorization: `Bearer ${authID}`,
          },
        });
        if (data.status === true) {
          return { status: true, msg: data.msg };
        } else {
          return { status: false, msg: data.msg };
        }
      }
      //eslint-disable-next-line
    } catch (error: any) {
      return { status: false, msg: error.message };
    }
  };

  const countAdmins = async () => {
    const { data } = await axios.get(`${host}/all/admins`, {
      headers: {
        Authorization: `Bearer ${authID}`,
      },
    });
    if (data.status === true) {
      setTotalAdmins(
        data.msg[0].total_admins !== 0 ? data.msg[0].total_admins : 0
      );
    } else {
      setTotalAdmins(0);
    }
  };

  const countSuperAdmins = async () => {
    const { data } = await axios.get(`${host}/super/admins`, {
      headers: {
        Authorization: `Bearer ${authID}`,
      },
    });
    if (data.status === true) {
      setSuperAdmins(
        data.msg[0].super_admins !== 0 ? data.msg[0].super_admins : 0
      );
    } else {
      setSuperAdmins(0);
    }
  };

  const countAllAdmins = async () => {
    const { data } = await axios.get(`${host}/admins/admins`, {
      headers: {
        Authorization: `Bearer ${authID}`,
      },
    });
    if (data.status === true) {
      setAdmins(data.msg[0].admins !== 0 ? data.msg[0].admins : 0);
    } else {
      setSuperAdmins(0);
    }
  };

  const countMasterAdmins = async () => {
    const { data } = await axios.get(`${host}/master/admins`, {
      headers: {
        Authorization: `Bearer ${authID}`,
      },
    });
    if (data.status === true) {
      setMasterTotal(
        data.msg[0].master_admins !== 0 ? data.msg[0].master_admins : 0
      );
    } else {
      setMasterTotal(0);
    }
  };

  const filterController = async (filter: string) => {
    const { data } = await axios.get(
      `${host}/admins/filter?adminfilter=${filter}`,
      {
        headers: {
          Authorization: `Bearer ${authID}`,
        },
      }
    );
    if (data.status === true) {
      setFilterResult(data.msg);
    } else {
      setFilterResult([]);
    }
  };

  return {
    createAdmin,
    fetchAllAdmins,
    fetchAdminInfo,
    fetchSingleAdminInfo,
    updateAdminInfo,
    deleteAdmin,
    totalAdmins,
    superAdmins,
    countSuperAdmins,
    filterController,
    countAdmins,
    countAllAdmins,
    adminsTotal,
    countMasterAdmins,
    masterTotal,
    filterResult,
  };
};

export default useAdmin;
