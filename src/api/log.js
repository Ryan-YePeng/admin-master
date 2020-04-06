import {axiosG} from "@/api/request";

const getErrorDetailByIdUrl = "test/getErrorDetail?logId="; // 通过id获得报错信息的详情
const getErrorLogUrl = "test/getErrorLog?"; // 获得报错日志
const getLogListUrl = "test/pageLog?"; // 分页获得日志列表

export const getErrorDetailByIdApi = data => axiosG(getErrorDetailByIdUrl + data);
export const getErrorLogApi = data => axiosG(getErrorLogUrl + data);
export const getLogListApi = data => axiosG(getLogListUrl + data);
