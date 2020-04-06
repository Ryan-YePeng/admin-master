import {axiosD, axiosG, axiosK, axiosP} from "./request";

const addMenuUrl = "test/addMenu"; // 新增菜单
const deleteMenuUrl = "test/delMenu?id="; // 删除菜单
const updateMenuUrl = "test/editMenu"; // 更改菜单
const getMenuUrl = "test/treeMenu"; // 获取菜单
const getAllMenuUrl = "test/treeAllMenu?title="; // 获取所有菜单

export const addMenuApi = data => axiosK(addMenuUrl, data);
export const deleteMenuApi = data => axiosD(deleteMenuUrl + data);
export const updateMenuApi = data => axiosP(updateMenuUrl, data);
export const getMenuApi = () => axiosG(getMenuUrl);
export const getAllMenuApi = data => axiosG(getAllMenuUrl + data);
