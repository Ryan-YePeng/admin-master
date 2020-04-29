import Vue from "vue";
import {formatDateTime} from "@/utils/common";


/**
 * @description 过滤时间
 * @return YYYY-MM-DD
 **/
Vue.filter("formatDate", time => formatDateTime(time, '{Y}-{M}-{D}'));

/**
 * @description 过滤时间
 * @return YYYY-MM-DD hh:mm:ss
 **/
Vue.filter("formatDateTime", time => formatDateTime(time));
