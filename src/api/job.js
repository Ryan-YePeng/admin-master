import {axiosD, axiosG, axiosK, axiosP} from "@/api/request";

const addJobUrl = "admin/job/addJob"; // 新增职业
const deleteJobUrl = "admin/job/delJob?jobId="; // 删除职业
const getJobByIdUrl = "admin/job/getJobById"; // 分页获得职业列表
const getJobListPageUrl = "admin/job/pageJob?"; // 分页获得职业列表
const getJobByDeptIdUrl = "admin/job/listJob?deptId="; // 新增职业名列表（模糊搜索职业名）
const updateJobUrl = "admin/job/editJob"; // 更新职业

export const addJobApi = data => axiosK(addJobUrl, data);
export const deleteJobApi = data => axiosD(deleteJobUrl + data);
export const getJobByIdApi = data => axiosG(getJobByIdUrl + data);
export const getJobListApi = data => axiosG(getJobListPageUrl + data);
export const getJobByDeptIdApi  = data => axiosG(getJobByDeptIdUrl  + data);
export const updateJobApi = data => axiosP(updateJobUrl, data);
