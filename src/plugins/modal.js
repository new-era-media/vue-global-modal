import Vue from "vue";
import store from "@/store";
import { guid } from "./guid";

Vue.prototype.$modal = ({ component, props, on, ...rest }) => {
    store.commit("openModal", {
        _uid: guid(),
        component: () => import("@/components/_Modals/" + component + ".vue"),
        props,
        on,
        ...rest,
    });
};
