/* globals Vuex */

function createStore() {

    return new Vuex.Store({
        strict: false,
        state: {
            amount: 7
        },
        getters: {
            Partners: (state) => {
                return (state.menu || {}).partners || [];
            },
        },
        mutations: {},
        actions: {}
    });
}

module.exports = createStore;