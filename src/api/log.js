import {axiosG} from "@/api/request";

const getErrorDetailByIdUrl = "test/getErrorDetailById?log_id="; // 通过id获得报错信息的详情
const getErrorLogUrl = "test/getErrorLog?"; // 获得报错日志
const getLogListUrl = "test/getLogList?"; // 分页获得日志列表

export function getErrorDetailByIdApi(data) {
  return axiosG(getErrorDetailByIdUrl + data)
}

export function getErrorLogApi(data) {
  return axiosG(getErrorLogUrl + data)
}

export function getLogListApi(data) {
  return axiosG(getLogListUrl + data)
}
