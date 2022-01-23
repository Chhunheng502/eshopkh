import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

const store = createStore({
    state: {
      itemInCart: []
    },
    mutations: {
      addItemToCart (state, item) {
        state.itemInCart.push(item);
      }
    },
    plugins: [createPersistedState({
      storage: window.sessionStorage,
    })],
});

export default store;