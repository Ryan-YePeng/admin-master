import {axiosG} from "@/api/request";

const getErrorDetailById = "test/getErrorDetail"; // 通过id获得报错信息的详情
const getErrorLog = "test/getErrorLog"; // 获得报错日志
const getLogList = "test/pageLog"; // 分页获得日志列表

export const getErrorDetailByIdApi = data => axiosG(getErrorDetailById, data);
export const getErrorLogApi = data => axiosG(getErrorLog, data);
export const getLogListApi = data => axiosG(getLogList, data);
