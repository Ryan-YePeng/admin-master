/**
 * @param value
 * @return {Boolean}
 * @description 判断是否为空
 * */
export const isEmpty = value => {
  return (
      value === undefined
      || value === null
      || (typeof value === "object" && Object.keys(value).length === 0)
      || (typeof value === "string" && value.trim().length === 0)
  );
};

/**
 * @param {String} value
 * @return {String}
 * @description 格式化时间
 * */
export const formatDate = value => {
  let date = new Date(value);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * @param {String} value
 * @return {String}
 * @description 格式化时间
 * */
export const formatDateTime = value => {
  let date = new Date(value);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let seconds = date.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * @param {Object} target
 * @param {Object} object
 * @description target从object中取值 target <= object
 * */
export const objectEvaluate = (target, object) => {
  for (let key in target) {
    if (object.hasOwnProperty(key)) target[key] = object[key]
  }
};

/**
 * @author xuanzai
 * @description json美化(配合pre标签使用)
 * @param {JSON | Object} json json字符串或对象
 * @param {Number} tab 空格的个数
 * @returns {JSON|Object} 返回美化好的JSON
 **/
export const jsonPretty = (json, tab = 2) => {
  try {
    if (typeof json == "object") {
      return JSON.stringify(json, null, tab)
    } else {
      return JSON.stringify(JSON.parse(json), null, tab)
    }
  } catch (e) {
    return json
  }
};
