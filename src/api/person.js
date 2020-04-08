import {axiosD, axiosG, axiosK} from "./request";

const getUserUrl = "admin/login/getUserInfo"; // 获取用户信息
const logoutUrl = "admin/login/logout"; // 退出登录
const updatePassUrl = "test/updatePass"; // 更改密码
const getUserLogUrl = "test/pageUserLog"; // 个人日志
const getUserLevelUrl = "admin/user/getUserLevel"; // 获得角色级别

export const getUserApi = () => axiosG(getUserUrl);
export const logoutApi = () => axiosD(logoutUrl);
export const updatePassApi = data => axiosK(updatePassUrl, data);
export const getUserLogApi = () => axiosG(getUserLogUrl);
export const getUserLevelApi = () => axiosG(getUserLevelUrl);
