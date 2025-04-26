import { authID, host } from "@/utils/host";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export interface memberProps {
  createdAt: string;
  dob: string;
  fullname: string;
  id_card_no: string;
  mobile: string;
  passport: string;
  pop_member_id: number;
  post: string;
  status: string;
  updatedAt: string;
  zone: string;
  boss_name: string;
}

const useMemberHook = () => {
  const [members, setMembers] = useState<memberProps[]>();
  const [member_profile, setMember_profile] = useState<memberProps>();
  const [filter_member, setfilter_member] = useState([]);
  const [userUpdateInfo, setUserUpdateInfo] = useState<memberProps>();
  const [suspended, setSuspended] = useState(0);
  const [leave, setLeave] = useState(0);
  const [dead, setDead] = useState(0);
  const [allMember, setAllMember] = useState(0);

  // eslint-disable-next-line
  const createNewMember = async (
    passport: any,
    mobile: string,
    zone: string,
    id: string,
    dob: string,
    status: string,
    fullname: string,
    post: string,
    bossName: string
  ) => {
    try {
      if (
        mobile.trim() === "" ||
        zone.trim() === "" ||
        id.trim() === "" ||
        dob.trim() === "" ||
        status.trim() === "" ||
        fullname.trim() === "" ||
        post.trim() === "" ||
        !passport ||
        bossName.trim() === ""
      ) {
        toast.error("Please fill all the required fields!");
      } else {
        const formData = new FormData();
        formData.append("passport", passport);
        formData.append("fullname", fullname);
        formData.append("mobile", mobile);
        formData.append("zone", zone);
        formData.append("id", id);
        formData.append("status", status);
        formData.append("post", post);
        formData.append("dob", dob);
        formData.append("bossName", bossName);

        const { data } = await axios.post(`${host}/new/member`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authID}`,
          },
        });

        if (data.status === true) {
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      }

      // eslint-disable-next-line
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getAllMembers = async () => {
    const { data } = await axios.get(`${host}/members`, {
      headers: {
        Authorization: `Bearer ${authID}`,
      },
    });
    if (data.status === true) {
      setMembers(data.msg);
    } else {
      setMembers([]);
    }
  };

  const fetchSingleMember = async (id: number) => {
    const { data } = await axios.get(`${host}/member/${id}`, {
      headers: {
        Authorization: `Bearer ${authID}`,
      },
    });
    if (data.status === true) {
      setMember_profile(data.msg[0]);
      setUserUpdateInfo({
        createdAt: "",
        dob: data.msg[0]?.dob,
        fullname: data.msg[0]?.fullname,
        id_card_no: data.msg[0]?.id_card_no,
        mobile: data.msg[0]?.mobile,
        passport: data.msg[0]?.passport,
        pop_member_id: data.msg[0]?.pop_member_id,
        post: data.msg[0]?.post,
        status: data.msg[0]?.status,
        updatedAt: data.msg[0]?.updatedAt,
        zone: data.msg[0]?.zone,
        boss_name: data.msg[0]?.boss_name,
      });
    } else {
      return;
      // setMember_profile({})
    }
  };

  const updateMemberInfo = async () => {
    const { data } = await axios.put(
      `${host}/update/member/${userUpdateInfo?.pop_member_id}`,
      { ...userUpdateInfo },
      {
        headers: {
          Authorization: `Bearer ${authID}`,
        },
      }
    );
    if (data.status === true) {
      toast.success(data.msg);
    } else {
      toast.error(data.msg);
    }
  };

  const deleteMember = async (id: string | number) => {

    const { data } = await axios.delete(`${host}/member/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${authID}`,
      },
    });
    if (data.status === true) {
      toast.success(data.msg);
      getAllMembers();
    } else {
      toast.error(data.msg);
    }
  };

  const TotalDead = async () => {
    const { data } = await axios.get(`${host}/dead/members`, {
      headers: {
        Authorization: `Bearer ${authID}`,
      },
    });
    if (data.status === true) {
      setDead(data.msg[0].dead);
    } else {
      setDead(0);
    }
  };

  const TotalMembers = async () => {
    const { data } = await axios.get(`${host}/total/members`, {
      headers: {
        Authorization: `Bearer ${authID}`,
      },
    });
    if (data.status === true) {
      setAllMember(data.msg[0].members);
    } else {
      setAllMember(0);
    }
  };

  const TotalLeave = async () => {
    const { data } = await axios.get(`${host}/leave/members`, {
      headers: {
        Authorization: `Bearer ${authID}`,
      },
    });
    if (data.status === true) {
      setLeave(data.msg[0].leaves);
    } else {
      setLeave(0);
    }
  };

  const TotalSuspended = async () => {
    const { data } = await axios.get(`${host}/suspended/members`, {
      headers: {
        Authorization: `Bearer ${authID}`,
      },
    });
    if (data.status === true) {
      setSuspended(data.msg[0].suspended);
    } else {
      setSuspended(0);
    }
  };

  const filterMemberInfo = async (filter: string) => {
    const { data } = await axios.get(
      `${host}/filter/members?filterType=${filter}`,
      {
        headers: {
          Authorization: `Bearer ${authID}`,
        },
      }
    );
    if (data.status === true) {
      setfilter_member(data.msg);
    } else {
      return;
    }
  };

  const searchMemberInfo = async (search: string) => {
    const { data } = await axios.get(
      `${host}/search/members?search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${authID}`,
        },
      }
    );
    if (data.status === true) {
      setfilter_member(data.msg);
    } else {
      return;
    }
  };

  return {
    createNewMember,
    getAllMembers,
    members,
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
  };
};

export default useMemberHook;
