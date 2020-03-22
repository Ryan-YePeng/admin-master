import {axiosD, axiosG} from "@/api/request";

const getOnlineUserUrl = "test/online/getOnLineUserPage?"; // 查询在线用户
const deleteOnlineUserUrl = "test/online/kickOut?keys="; // 踢出用户

export function getOnlineUserApi(data) {
  return axiosG(getOnlineUserUrl + data)
}

export function deleteOnlineUserApi(data) {
  return axiosD(deleteOnlineUserUrl + data)
}
