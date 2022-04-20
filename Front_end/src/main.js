import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from './store/vuex'
import clickOutSide from '@/helpers/directives/clickOutSide'

// imprt fontawesome
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, fab, far);
dom.watch();

const app = createApp(App);
// add component
app.component("fa-icon", FontAwesomeIcon);

// add directive
app.directive('click-outside', clickOutSide);

// add global variable
const { io } = require("socket.io-client");
const BackendURL = 'http://192.168.199.104:35001/'
// const BackendURL = 'http://ahmacake.trueddns.com:47636/'
const socket = io(BackendURL);
app.config.globalProperties.$socket = socket;
app.config.globalProperties.$BackendURL = BackendURL;

// add necessary dependencies...
app.use(router)
app.use(Vuex)
app.mount("#app");