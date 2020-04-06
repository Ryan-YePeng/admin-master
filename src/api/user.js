import {axiosD, axiosG, axiosK} from "@/api/request";

const addUserUrl = "test/addUser"; // 新增用户
const getUserByIdUrl = "test/getUser?userId="; // 通过用户id获得用户详情
const getUserListUrl = "test/pageUser?"; // 获得用户列表
const getOnlineUserUrl = "test/online/pageOnLineUser?"; // 查询在线用户
const deleteOnlineUserUrl = "test/online/kickOut?keys="; // 踢出用户


export const addUserApi = data => axiosK(addUserUrl, data);
export const getUserByIdApi = data => axiosG(getUserByIdUrl + data);
export const getUserListApi = data => axiosG(getUserListUrl + data);
export const getOnlineUserApi = data => axiosG(getOnlineUserUrl + data);
export const deleteOnlineUserApi = data => axiosD(deleteOnlineUserUrl + data);
