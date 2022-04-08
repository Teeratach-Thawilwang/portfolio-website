import Vuex from "vuex"

export default new Vuex.Store({
    state: {
        themeColor: "dark",
        themeColorSet: {
            normal: "#fff",
            invert: "#000"
        },
        loginState: false,
        topics: [
            { key: "About", value: "hand-peace" },
            { key: "Contact", value: "address-card" },
            { key: "Skill", value: "heart" },
            { key: "Education", value: "graduation-cap" },
            { key: "Chat", value: "comment" },
        ],
    },
    mutations: {
        changeTheme(state, value) {
            if (value === "white") {
                state.themeColor = "white";
                state.themeColorSet.normal = "#000";
                state.themeColorSet.invert = "#fff";
            } else if(value === "dark"){
                state.themeColor = "dark"
                state.themeColorSet.normal = "#fff";
                state.themeColorSet.invert = "#000";
            }
        }
    },
    actions: {
        changeThemeAction(context, themeColor) {
            context.commit('changeTheme', themeColor);
        }
    },
    getters: {
        getThemeColor(state) {
            return state.themeColor;
        },
        getThemeColorNormal(state) {
            return state.themeColorSet.normal;
        },
        getThemeColorInvert(state) {
            return state.themeColorSet.invert;
        },
        getLoginState(state) {
            return state.loginState;
        },
        getTopics(state) {
            return state.topics;
        }
    },
    modules: {}
})