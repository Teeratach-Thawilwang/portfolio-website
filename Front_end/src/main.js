import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from './store/vuex'

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
// app.directive('click-outside', clickOutside);

// add necessary dependencies...
app.use(router)
app.use(Vuex)
app.mount("#app");