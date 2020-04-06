import {axiosG, axiosK} from "./request";

const getCodeUrl = "test/admin/getCode"; // 获取验证码
const loginUrl = "test/admin/login"; // 登陆

export const getCodeApi = () => axiosG(getCodeUrl);
export const loginApi = data => axiosK(loginUrl, data);
