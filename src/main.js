import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Button, Icon, Popup, Rate, Overlay, Dialog } from "vant";
import "vant/lib/index.less";

// css
import "assets/style/base.css";

// 定义全局变量
// Vue.prototype.cartSet = []; // 购物车里的商品集合

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(Rate);
Vue.use(Overlay);
Vue.use(Dialog);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
