import {axiosD, axiosG, axiosK, axiosP} from "@/api/request";

const addDeptUrl = "admin/dept/addDept"; // 新增部门
const deleteDeptUrl = "admin/dept/delDept?deptId="; // 删除部门
const getDeptTreeUrl = "admin/dept/treeDept?deptName="; // 分页获得部门列表
const getDeptNameListUrl = "admin/dept/listDeptName"; // 获得部门列表名称
const updateDeptUrl = "admin/dept/editDept"; // 更新部门

export const addDeptApi = data => axiosK(addDeptUrl, data);
export const deleteDeptApi = data => axiosD(deleteDeptUrl + data);
export const getDeptTreeApi = data => axiosG(getDeptTreeUrl + data);
export const getDeptNameListApi = () => axiosG(getDeptNameListUrl);
export const updateDeptApi = data => axiosP(updateDeptUrl, data);

