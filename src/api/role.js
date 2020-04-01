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

export const addRoleApi = data => axiosFs(addRoleUrl, data);
export const addUserApi = data => axiosK(addUserUrl, data);
export const deleteRoleApi = data => axiosD(deleteRoleUrl + data);
export const getRoleListApi = data => axiosG(getRoleListUrl + data);
export const getUserByIdApi = data => axiosD(getUserByIdUrl + data);
export const getUserListApi = () => axiosG(getUserListUrl);
export const updateRoleApi = data => axiosP(updateRoleUrl, data);
export const getRoleTreeApi = () => axiosG(getRoleTreeUrl);
export const updateRolesMenusApi = data => axiosFs(updateRolesMenusUrl, data);
