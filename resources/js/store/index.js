import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

const store = createStore({
    state: {
      itemInCart: []
    },
    mutations: {
      addItemToCart (state, item) {
        state.itemInCart.push(item);
      },
      resetCart (state) {
        state.itemInCart = []
      }
    },
    getters: {
      sortedItemInCart: state => {
        return [...new Map(state.itemInCart.map(item => [item['id'], item])).values()]
        .sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      }
    },
    plugins: [createPersistedState({
      storage: window.sessionStorage,
    })],
});

export default store;