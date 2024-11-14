// store.js
import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      justSignedUp: false,
    };
  },
  mutations: {
    setJustSignedUp(state, value) {
      state.justSignedUp = value;
    },
  },
  actions: {
    signUp({ commit }) {
      commit("setJustSignedUp", true);
    },
    resetSignUp({ commit }) {
      commit("setJustSignedUp", false);
    },
  },
  getters: {
    justSignedUp(state) {
      return state.justSignedUp;
    },
  },
});
