import {axiosD, axiosG, axiosK, axiosP} from "./request";

const addMenuUrl = "test/addMenu"; // 添加菜单
const deleteMenuUrl = "test/deleteMenu?menuId="; // 删除菜单
const updateMenuUrl = "test/updateMenu"; // 更改菜单
const getMenuUrl = "test/getMenusTree"; // 获取菜单
const getAllMenuUrl = "test/getAllMenuTree?title="; // 获取所有菜单

export const addMenuApi = data => axiosK(addMenuUrl, data);
export const deleteMenuApi = data => axiosD(deleteMenuUrl + data);
export const updateMenuApi = data => axiosP(updateMenuUrl, data);
export const getMenuApi = () => axiosG(getMenuUrl);
export const getAllMenuApi = data => axiosG(getAllMenuUrl + data);
