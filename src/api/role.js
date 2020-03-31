import {axiosD, axiosFs, axiosG, axiosJ, axiosK, axiosP} from "./request";

const addRoleUrl = "test/addRole"; // 添加角色
const addUserUrl = "test/addUser"; // 添加用户
const deleteRoleUrl = "test/deleteRole?roleId="; // 删除角色
const getRoleListUrl = "test/getRoleList?roleName="; // 获得角色列表
const getUserByIdUrl = "test/getUserById"; // 通过id获取用户
const getUserListUrl = "test/getUserListPage"; // 获得用户列表
const updateRoleUrl = "test/updateRole"; // 更改角色
const getRoleTreeUrl = "test/getRoleTree"; // 获得权限树
const updateRolesMenusUrl = "test/updateRolesMenus"; // 添加权限

export function addRoleApi(data) {
  return axiosFs(addRoleUrl, data)
}

export function addUserApi(data) {
  return axiosK(addUserUrl, data)
}

export function deleteRoleApi(data) {
  return axiosD(deleteRoleUrl + data)
}

export function getRoleListApi(data) {
  return axiosG(getRoleListUrl + data)
}

export function getUserByIdApi(data) {
  return axiosD(getUserByIdUrl + data)
}

export function getUserListApi() {
  return axiosG(getUserListUrl)
}

export function updateRoleApi(data) {
  return axiosP(updateRoleUrl, data)
}

export function getRoleTreeApi() {
  return axiosG(getRoleTreeUrl)
}

export function updateRolesMenusApi(data) {
  return axiosFs(updateRolesMenusUrl, data)
}
