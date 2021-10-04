import Vue from "vue";
import App from "./App.vue";
import Authorize from "./components/Authorize.vue";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
} from "ant-design-vue";
import Auth from "./directives/auth";
import router from "./router";
import store from "./store";

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
Vue.component("Authorize", Authorize);
Vue.use(Auth);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
