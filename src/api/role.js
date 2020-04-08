import {axiosD, axiosFs, axiosG, axiosJ, axiosK, axiosP, axiosU} from "./request";

const addRoleUrl = "admin/role/addRole"; // 新增角色
const deleteRoleUrl = "admin/role/delRole?roleId="; // 删除角色
const getRoleListUrl = "admin/role/listRole?roleName="; // 获得角色列表
const getUserByIdUrl = "admin/role/getUserById"; // 通过id获取用户
const getUserListUrl = "admin/role/getUserListPage"; // 获得用户列表
const updateRoleUrl = "admin/role/editRole"; // 更改角色
const getRoleTreeUrl = "admin/role/treeRole"; // 获得权限树
const updateRolesMenusUrl = "admin/menu/editRolesMenus"; // 编辑权限

export const addRoleApi = data => axiosJ(addRoleUrl, data);
export const deleteRoleApi = data => axiosD(deleteRoleUrl + data);
export const getRoleListApi = data => axiosG(getRoleListUrl + data);
export const getUserByIdApi = data => axiosD(getUserByIdUrl + data);
export const getUserListApi = () => axiosG(getUserListUrl);
export const updateRoleApi = data => axiosU(updateRoleUrl, data);
export const getRoleTreeApi = () => axiosG(getRoleTreeUrl);
export const updateRolesMenusApi = data => axiosJ(updateRolesMenusUrl, data);
