import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        modals: [],
    },

    mutations: {
        openModal(state, modal) {
            state.modals.push(modal);
            document.body.classList.add("--overlay");
        },
        closeModal(state, uid) {
            state.modals.splice(
                state.modals.findIndex((item) => item._uid === uid)
            );

            if (!state.modals.length) {
                document.body.classList.remove("--overlay");
            }
        },
    },
});
