import {axiosD, axiosG, axiosP} from "@/api";

const getUser = "admin/login/getUserInfo"; // 获取用户信息
const logout = "admin/login/logout"; // 退出登录
const updatePass = "admin/user/editPass"; // 修改密码
const editMyUser = "admin/user/editMyUser"; // 修改密码
const getUserLog = "log/pageUserLog"; // 个人日志

export const getUserInfoApi = () => axiosG(getUser);
export const logoutApi = () => axiosD(logout);
export const updatePassApi = data => axiosP(updatePass, data);
export const editMyUserApi = data => axiosP(editMyUser, data);
export const getUserLogApi = data => axiosG(getUserLog, data);
