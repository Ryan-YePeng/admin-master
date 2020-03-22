import {axiosD, axiosG, axiosK, axiosP} from "@/api/request";

const addDeptUrl = "test/addDept"; // 添加部门
const deleteDeptUrl = "test/deleteDept?deptId="; // 删除部门
const getDeptTreeUrl = "test/getDeptTree?deptName="; // 分页获得部门列表
const getDeptNameListUrl = "test/getDeptNameList"; // 获得部门列表名称
const updateDeptUrl = "test/updateDept"; // 更新部门

export function addDeptApi(data) {
  return axiosK(addDeptUrl, data)
}

export function deleteDeptApi(data) {
  return axiosD(deleteDeptUrl + data)
}

export function getDeptTreeApi(data) {
  return axiosG(getDeptTreeUrl + data)
}

export function getDeptNameListApi() {
  return axiosG(getDeptNameListUrl)
}

export function updateDeptApi(data) {
  return axiosP(updateDeptUrl, data)
}
