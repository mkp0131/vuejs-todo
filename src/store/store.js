import Vue from "vue";
import Vuex from "vuex";
import todo from "./modules/todo";

// Vue.use(): Vue 플러그인 기능
// Vue 에 글러벌로 사용을 하기 원할때 사용한다.
Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: { todo },
});
