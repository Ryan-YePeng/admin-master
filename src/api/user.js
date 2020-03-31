import {axiosD, axiosG, axiosK} from "@/api/request";

const getOnlineUserUrl = "test/online/getOnLineUserPage?"; // 查询在线用户
const deleteOnlineUserUrl = "test/online/kickOut?keys="; // 踢出用户
const addUserUrl = "test/addUser"; // 添加用户
const getUserByIdUrl = "test/getUserById?userId="; // 通过用户id获得用户详情
const getUserListUrl = "test/getUserListPage?"; // 获得用户列表

export function getOnlineUserApi(data) {
  return axiosG(getOnlineUserUrl + data)
}

export function deleteOnlineUserApi(data) {
  return axiosD(deleteOnlineUserUrl + data)
}

export function addUserApi(data) {
  return axiosK(addUserUrl, data)
}

export function getUserByIdApi(data) {
  return axiosG(getUserByIdUrl + data)
}

export function getUserListApi(data) {
  return axiosG(getUserListUrl + data)
}
