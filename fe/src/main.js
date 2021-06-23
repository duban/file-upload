import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
// import i18n from 'vue-i18n';

Vue.config.productionTip = false
// Vue.use(i18n);
Vue.use(ElementUI, { locale });
Vue.config.lang = 'en';

new Vue({
  render: h => h(App),
}).$mount('#app')
