import Vue from 'vue'
import App from './App.vue'
import router from './router'
//导入axios包
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
axios.defaults.baseURL = "http://www.liulongbin.top:3005";
// axios.defaults.baseURL = "http://127.0.0.1:80";
// axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';

//导入Mui样式
// import './assets/lib/mui/css/mui.css'

//导入自定义字体图标
import './assets/lib/vdlib/iconfont.css'


//图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);

//导入格式化时间的插件
import moment from 'moment'

import store from './store'

Vue.filter('dateFormat',function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
});
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
