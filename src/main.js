// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import './assets/css/dookayui.min.css'
import './assets/css/widgets.css'
import './assets/css/common.css'
import './assets/css/baorong.css'
import '../static/js/plugins/bootstrap/bootstrap.min'
import '../static/js/plugins/layer/layer'
import '../static/js/plugins/lodash.min'
import './assets/js/common'
import './assets/js/api'
import Vue from 'vue'
import app from './app'
import router from './router'
import moment from 'moment'

Vue.config.productionTip = false

// 定义layerjs的皮肤
layer.config({path: '../static/js/plugins/layer/'})

Vue.filter("parseImageSrc", function (value) {
  var result = "";
  if (value) {
    var image = JSON.parse(value)[0];
    result = image.file;
  }
  return result;
});
Vue.filter("parseImageList", function (value) {
  var result = "";
  if (value) {
    result = JSON.parse(value);
  }
  return result;
});
Vue.filter('formatDate', function (value, format) {
  if (!value) return '';
  if (!format) format = 'YYYY-MM-DD HH:mm:ss';
  value = parseInt(value);
  return moment(value).format(format);
});
Vue.filter('enumToDescription', function (value, enumList) {
  if(!value) return '';
  return _.get(enumList, value);
});

function ajaxFunction(url, type, data, callback) {
  $.ajax({
    url: url,
    type: type,
    data: data,
    success: callback,
    statusCode: {
      401: function () {
        router.push('/passport/login');
      }
    }
  });
}

Vue.prototype.ajax = function (obj) {
  obj.data = getData(obj.data);
  ajaxFunction(obj.url, obj.type, obj.data, obj.success);
}
Vue.prototype.get = function (url, data, callback) {
  if (typeof data == "function") {
    callback = data;
  }
  data = getData(data);
  ajaxFunction(url, "GET", data, callback);
}
Vue.prototype.getJSON = function (url, data, callback) {
  if (typeof data == "function") {
    callback = data;
  }
  data = getData(data);
  ajaxFunction(url, "GET", data, callback);
}
Vue.prototype.post = function (url, data, callback) {
  if (typeof data == "function") {
    callback = data;
  }
  data = getData(data);
  ajaxFunction(url, "POST", data, callback);
}
function getData(data) {
  // var userContext = JSON.parse(window.sessionStorage.userContext);
  // if (data == undefined) {
  //   data = {};
  // }
  // if (typeof data == 'string') {
  //   data = data + "&token=" + userContext.token + "&username=" + userContext.adminModel.userName;
  // } else {
  //   data.token = userContext.token;
  //   data.username = userContext.adminModel.userName;
  // }
  return data;
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<app/>',
  components: {app}
});
