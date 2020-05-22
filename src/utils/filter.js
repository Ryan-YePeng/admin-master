import Vue from "vue";

const formatTime = require('silly-datetime');

/**
 * @description 过滤时间
 * @return YYYY-MM-DD
 **/
Vue.filter("formatDate", function (time) {
  if (!time) return '';
  return formatTime.format(time, 'YYYY-MM-DD');
});

/**
 * @description 过滤时间
 * @return YYYY-MM-DD hh:mm:ss
 **/
Vue.filter("formatDateTime", function (time) {
  if (!time) return '';
  return formatTime.format(time, 'YYYY-MM-DD HH:mm:ss');
});

/**
 * @description 节流
 **/
let openDelay = false;
Vue.directive('intervalClick', function (el, binding) {
  el.onclick = function (e) {
    if (openDelay) return;
    openDelay = !openDelay;
    if (!binding.value) {
      alert("未传入Value数据！");
      return;
    }
    let func = binding.value['func'];
    let time = binding.value['time'];
    if (typeof time !== 'number') {
      alert("传入等待时间错误");
      return;
    }
    let args = [];
    for (const key in binding.value) {
      if (binding.value.hasOwnProperty(key)) {
        if (key === 'func' || key === 'time') continue;
        args.push(binding.value[key])
      }
    }
    setTimeout(() => {
      openDelay = !openDelay;
    }, time);
    func(...args);
  }
});
