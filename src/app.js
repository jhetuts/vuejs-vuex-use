import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

import store from "./store";
import router from "./router";
Vue.use(VueRouter);
Vue.use(require("vue-moment"));

new Vue({
  el: "#app",
  store,
  router,
  render: (h) => h(App),
});
