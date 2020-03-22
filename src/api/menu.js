import {axiosD, axiosG, axiosK, axiosP} from "./request";

const addMenuUrl = "test/addMenu"; // 添加菜单
const deleteMenuUrl = "test/deleteMenu?menuId="; // 删除菜单
const updateMenuUrl = "test/updateMenu"; // 更改菜单
const getMenuUrl = "test/getMenusTree"; // 获取菜单
const getAllMenuUrl = "test/getAllMenuTree"; // 获取所有菜单

export function addMenuApi(data) {
  return axiosK(addMenuUrl, data);
}

export function deleteMenuApi(data) {
  return axiosD(deleteMenuUrl + data);
}

export function updateMenuApi(data) {
  return axiosP(updateMenuUrl, data);
}

export function getMenuApi() {
  return axiosG(getMenuUrl);
}

export function getAllMenuApi() {
  return axiosG(getAllMenuUrl);
}

