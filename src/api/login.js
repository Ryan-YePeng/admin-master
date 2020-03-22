import {axiosG, axiosK} from "./request";

const getCodeUrl = "admin/getCode"; // 获取验证码
const loginUrl = "admin/login"; // 登陆

export function getCodeApi() {
  return axiosG(getCodeUrl);
}

export function loginApi(data) {
  return axiosK(loginUrl, data);
}
