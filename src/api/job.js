import {axiosD, axiosG, axiosK, axiosP} from "@/api/request";

const addJobUrl = "test/addJob"; // 添加职业
const deleteJobUrl = "test/deleteJob?jobId="; // 删除职业
const getJobByIdUrl = "test/getJobById"; // 分页获得职业列表
const getJobListPageUrl = "test/getJobListPage?"; // 分页获得职业列表
const getJobNameListUrl = "test/getJobNameList"; // 添加职业名列表（模糊搜索职业名）
const updateJobUrl = "test/updateJob"; // 更新职业

export const addJobApi = data => axiosK(addJobUrl, data);
export const deleteJobApi = data => axiosD(deleteJobUrl + data);
export const getJobByIdApi = data => axiosG(getJobByIdUrl + data);
export const getJobListApi = data => axiosG(getJobListPageUrl + data);
export const getJobNameListApi = data => axiosG(getJobNameListUrl + data);
export const updateJobApi = data => axiosP(updateJobUrl, data);
