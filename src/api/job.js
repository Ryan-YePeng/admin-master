import {axiosD, axiosG, axiosK, axiosP} from "@/api/request";

const addJobUrl = "test/addJob"; // 添加职业
const deleteJobUrl = "test/deleteJob?jobId="; // 删除职业
const getJobByIdUrl = "test/getJobById"; // 分页获得职业列表
const getJobListPageUrl = "test/getJobListPage?"; // 分页获得职业列表
const getJobNameListUrl = "test/getJobNameList"; // 添加职业名列表（模糊搜索职业名）
const updateJobUrl = "test/updateJob"; // 更新职业

export function addJobApi(data) {
  return axiosK(addJobUrl, data)
}

export function deleteJobApi(data) {
  return axiosD(deleteJobUrl + data)
}

export function getJobByIdApi(data) {
  return axiosG(getJobByIdUrl + data)
}

export function getJobListApi(data) {
  return axiosG(getJobListPageUrl + data)
}

export function getJobNameListApi(data) {
  return axiosG(getJobNameListUrl + data)
}

export function updateJobApi(data) {
  return axiosP(updateJobUrl, data)
}
