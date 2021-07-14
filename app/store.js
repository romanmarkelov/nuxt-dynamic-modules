import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const createStore = () => {
  return new Vuex.Store({
    state: {
      common: new Date()
    },
  });
};
