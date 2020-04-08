import {axiosD, axiosG, axiosJ, axiosK} from "@/api/request";

const addUserUrl = "admin/user/addUser"; // 新增用户
const getUserByIdUrl = "admin/user/getUser?userId="; // 通过用户id获得用户详情
const getUserListUrl = "admin/user/pageUser?"; // 获得用户列表
const getOnlineUserUrl = "admin/user/online/pageOnLineUser?"; // 查询在线用户
const deleteOnlineUserUrl = "admin/user/online/kickOut?keys="; // 踢出用户

export const addUserApi = data => axiosK(addUserUrl, data);
export const getUserByIdApi = data => axiosG(getUserByIdUrl + data);
export const getUserListApi = data => axiosG(getUserListUrl + data);
export const getOnlineUserApi = data => axiosG(getOnlineUserUrl + data);
export const deleteOnlineUserApi = data => axiosD(deleteOnlineUserUrl + data);
