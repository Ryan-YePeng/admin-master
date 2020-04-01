import {axiosD, axiosG, axiosK} from "@/api/request";

const getOnlineUserUrl = "test/online/getOnLineUserPage?"; // 查询在线用户
const deleteOnlineUserUrl = "test/online/kickOut?keys="; // 踢出用户
const addUserUrl = "test/addUser"; // 添加用户
const getUserByIdUrl = "test/getUserById?userId="; // 通过用户id获得用户详情
const getUserListUrl = "test/getUserListPage?"; // 获得用户列表

export const getOnlineUserApi = data => axiosG(getOnlineUserUrl + data);
export const deleteOnlineUserApi = data => axiosD(deleteOnlineUserUrl + data);
export const addUserApi = data => axiosK(addUserUrl, data);
export const getUserByIdApi = data => axiosG(getUserByIdUrl + data);
export const getUserListApi = data => axiosG(getUserListUrl + data);
