import {axiosD, axiosFs, axiosG, axiosP} from "./request";

const addRoleUrl = "test/addRole"; // 新增角色
const deleteRoleUrl = "test/delRole?roleId="; // 删除角色
const getRoleListUrl = "test/listRole?roleName="; // 获得角色列表
const getUserByIdUrl = "test/getUserById"; // 通过id获取用户
const getUserListUrl = "test/getUserListPage"; // 获得用户列表
const updateRoleUrl = "test/editRole"; // 更改角色
const getRoleTreeUrl = "test/treeRole"; // 获得权限树
const updateRolesMenusUrl = "test/editRolesMenus"; // 新增权限

export const addRoleApi = data => axiosFs(addRoleUrl, data);
export const deleteRoleApi = data => axiosD(deleteRoleUrl + data);
export const getRoleListApi = data => axiosG(getRoleListUrl + data);
export const getUserByIdApi = data => axiosD(getUserByIdUrl + data);
export const getUserListApi = () => axiosG(getUserListUrl);
export const updateRoleApi = data => axiosP(updateRoleUrl, data);
export const getRoleTreeApi = () => axiosG(getRoleTreeUrl);
export const updateRolesMenusApi = data => axiosFs(updateRolesMenusUrl, data);
