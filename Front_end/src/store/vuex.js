import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({
    state: {
        loginStatus: false,
        Account: {
            username: "",
            email: "",
            token: "",
        },
        themeColor: "dark",
        themeColorSet: {
            normal: "#fff",
            invert: "#000",
            scrollbarTrack: "#515151",
            scrollbarThumb: "#7F7F7F",
            scrollbarThumbHover: "#A0A0A0",
            chatboxBG: "#222c36",
            chatTextBG: "#858585",
            chatFormBorder: "#A0A0A0",
            chatInputBG: "#404952",
            chatBtnBG: "#21a221",
            chatBtnBGHover: "#0D890D",
        },
        topics: [],
        Shownpage: 50,
        LabelnPage: 1,
        LabelPostIndex: 1,
    },
    mutations: {
        changeTheme(state, value) {
            if (value === "white") {
                state.themeColor = "white";
                state.themeColorSet.normal = "#000";
                state.themeColorSet.invert = "#fff";
                state.themeColorSet.scrollbarTrack = "#515151";
                state.themeColorSet.scrollbarThumb = "#7F7F7F";
                state.themeColorSet.scrollbarThumbHover = "#A0A0A0";
                state.themeColorSet.chatboxBG = "#fff";
                state.themeColorSet.chatTextBG = "#fff";
                state.themeColorSet.chatFormBorder = "#AAA";
                state.themeColorSet.chatInputBG = "#FFF";
            } else if (value === "dark") {
                state.themeColor = "dark"
                state.themeColorSet.normal = "#fff";
                state.themeColorSet.invert = "#000";
                state.themeColorSet.scrollbarTrack = "#515151";
                state.themeColorSet.scrollbarThumb = "#7F7F7F";
                state.themeColorSet.scrollbarThumbHover = "#A0A0A0";
                state.themeColorSet.chatboxBG = "#222c36";
                state.themeColorSet.chatTextBG = "#394856";
                state.themeColorSet.chatFormBorder = "#A0A0A0";
                // state.themeColorSet.chatInputBG ="#404952";
                state.themeColorSet.chatInputBG = "#394856";
            }
        },
        setLogin(state, val) {
            state.loginStatus = val;
            if (val == false) {
                state.Account.username = '';
                state.Account.email = '';
                state.Account.token = '';
            }
        },
        setAccount(state, val) {
            state.Account.username = val.username;
            state.Account.email = val.email;
            state.Account.token = val.token;
        },
        setTopic(state, val) {
            state.topics = val
        },
        setShownpage(state, val) {
            state.Shownpage = val
        },
        setLabelnPage(state, val) {
            state.LabelnPage = val
        },
        setLabelPostIndex(state, val) {
            state.LabelPostIndex = val
        }
    },
    actions: {
        changeThemeAction(context, val) {
            context.commit('changeTheme', val);
        },
        setLoginAction(context, val) {
            context.commit('setLogin', val)
        },
        setAccountAction(context, val) {
            context.commit('setAccount', val)
        },
        setTopicAction(context, val) {
            context.commit('setTopic', val)
        },
        setShownpageAction(context, val) {
            context.commit('setShownpage', val)
        },
        setLabelnPageAction(context, val) {
            context.commit('setLabelnPage', val)
        },
        setLabelPostIndexAction(context, val) {
            context.commit('setLabelPostIndex', val)
        }
    },
    getters: {
        getThemeColor(state) {
            return state.themeColor;
        },
        getThemeColorSet(state) {
            return state.themeColorSet;
        },
        getThemeColorNormal(state) {
            return state.themeColorSet.normal;
        },
        getThemeColorInvert(state) {
            return state.themeColorSet.invert;
        },
        getTopics(state) {
            return state.topics;
        },
        getLoginStatus(state) {
            return state.loginStatus;
        },
        getAccount(state) {
            if (state.loginStatus) {
                return state.Account
            } else {
                return {
                    username: "",
                    email: "",
                    token: "",
                }
            }
        },
        getShownpage(state) {
            return state.Shownpage;
        },
        getLabelnPage(state) {
            return state.LabelnPage;
        },
        getLabelPostIndex(state) {
            return state.LabelPostIndex;
        },
    },
    modules: {},
    plugins: [createPersistedState()]
})