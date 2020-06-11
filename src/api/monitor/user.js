import {axiosD, axiosG} from "@/api";

const getOnlineUser = "user/online/pageOnLineUser"; // 查询在线用户
const deleteOnlineUser = "user/online/kickOut"; // 踢出用户

export const getOnlineUserApi = data => axiosG(getOnlineUser, data);
export const deleteOnlineUserApi = data => axiosD(deleteOnlineUser, data);
