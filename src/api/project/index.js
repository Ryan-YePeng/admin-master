import {axiosD, axiosG, axiosK, axiosP} from "../request";

const addProject = "project/addProject"; // 添加项目
const delProject = "project/delProject"; // 删除项目
const editProject = "project/editProject"; // 编辑项目
const pageProject = "project/pageProject"; // 获得项目
const pageDonation = "project/pageOrders"; // 获得捐款

export const addProjectApi = data => axiosK(addProject, data);
export const delProjectApi = data => axiosD(delProject, data);
export const editProjectApi = data => axiosP(editProject, data);
export const pageProjectApi = data => axiosG(pageProject, data);
export const pageDonationApi = data => axiosG(pageDonation, data);




