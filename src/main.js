import Vue from "vue";
import App from "./App.vue";
// vuex 추가
import { store } from "./store/store";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  // vuex 추가
  store,
}).$mount("#app");
