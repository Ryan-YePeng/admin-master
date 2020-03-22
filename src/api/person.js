import {axiosD, axiosG, axiosK} from "./request";

const getUserUrl = "admin/getUser"; // 获取用户信息
const logoutUrl = "admin/logout"; // 退出登录
const updatePassUrl = "test/updatePass"; // 更改密码
const getUserLogUrl = "test/getUserLog"; // 个人日志
const getUserLevelUrl = "test/getUserLevel"; // 获得角色级别

export function getUserApi() {
  return axiosG(getUserUrl);
}

export function logoutApi() {
  return axiosD(logoutUrl);
}

export function updatePassApi(data) {
  return axiosK(updatePassUrl, data);
}

export function getUserLogApi() {
  return axiosG(getUserLogUrl);
}

export function getUserLevelApi() {
  return axiosG(getUserLevelUrl);
}
