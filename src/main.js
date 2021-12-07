import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Button, Icon, Popup, Rate } from "vant";
import "vant/lib/index.less";
import "assets/style/base.css";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(Rate);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
