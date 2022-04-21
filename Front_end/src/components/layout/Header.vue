<template>
  <div class="header-app-container unselected">
    <nav>
      <div class="home-icon">
        <a href="/"><img src="@/assets/home/profile.jpg" alt="" /></a>
      </div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/project">Project</a></li>
        <li v-if="getLoginStatus" @click="setLoginStatus(false)"><a href="#">Logout</a></li>
        <li v-else><a href="#" @click="clickLoginPopUp = true">Login</a></li>
      </ul>
      <div class="Theme-icon-container" @click="changeTheme">
        <fa-icon class="Theme-icon" :icon="themeIcon" />
      </div>
    </nav>
  </div>
  <loginComponent :clickLoginPopUp="clickLoginPopUp" @clickLoginPopUpProp="clickLoginPopUpMT" />
</template>

<script>
import { useCookies } from "vue3-cookies";
import loginComponent from "@/components/subview/login/login.vue";
export default {
  name: "Header-app",
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  components: {
    loginComponent,
  },
  data() {
    return {
      clickLoginPopUp: false,
      themeIcon: "sun",
    };
  },
  computed: {
    themeColorNormal() {
      return this.$store.getters.getThemeColorNormal;
    },
    getLoginStatus() {
      return this.$store.getters.getLoginStatus;
    },
  },
  methods: {
    changeTheme() {
      if (this.$store.getters.getThemeColor === "dark") {
        this.themeIcon = "moon";
        this.$store.dispatch("changeThemeAction", "white");
        this.cookies.set("themeColor", "white");
      } else {
        this.themeIcon = "sun";
        this.$store.dispatch("changeThemeAction", "dark");
        this.cookies.set("themeColor", "dark");
      }
    },
    clickLoginPopUpMT(value) {
      this.clickLoginPopUp = value;
    },
    setLoginStatus(val){
        this.$store.dispatch("setLoginAction", val);
        this.cookies.remove("session");
    }
  },
  mounted() {
    this.loginStatus = this.$store.getters.getLoginState;
  },
};
</script>

<style scoped>
.header-app-container {
  height: 12vh;
  margin: 0 5vw;
  /* border: 1px solid rgb(163, 209, 113); */
}
nav {
  height: 12vh;
  display: grid;
  grid-template-columns: 25fr 65fr 10fr;
  /* border: 1px solid red; */
}
.unselected {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

/* Home icon */
.home-icon {
  position: relative;
  /* border: 1px solid red; */
}
.home-icon img {
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  height: 9vh;
  width: 9vh;
  object-fit: cover;
  object-position: 80% 20%;
  border-radius: 100%;
  border: calc(0.15vw + 0.5vmin) solid transparent;
  transition: ease-in-out 0.2s;
}
.home-icon img:hover {
  width: 12vh;
  height: 12vh;
  border: calc(0.15vw + 0.5vmin) solid v-bind(themeColorNormal);
  transform: translate(0vh, 2vh);
}
/* End Home icon */

/* nav menu */
nav ul {
  padding-right: 1rem;
  /* font-size: calc(1rem + (10) * ((100vw - 375px) / (1920 - 375))); */
  font-size: calc(0.8vw + 1.5vh - 0.1vmax);
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* border: 1px solid red; */
}
nav a {
  color: v-bind(themeColorNormal);
  text-decoration: none;
  padding: calc(1vw + 1vh - 1vmax);
  margin-right: 1vw;
  border-radius: calc(5vw + 5vmin);
  border: calc(0.15vw + 0.15vmin) solid transparent;
  transition: ease-in-out 0.3s;
}
nav ul a:hover {
  border: calc(0.15vw + 0.15vmin) solid v-bind(themeColorNormal);
}
/* End nav menu */

/* Theme icon */
.Theme-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
}
.Theme-icon {
  color: v-bind(themeColorNormal);
  padding: calc(0.7vw + 0.7vh - 0.45vmax);
  font-size: calc(0.5vw + 3vh - 0.1vmax);
  transition: ease-in-out 0.3s;
  border: calc(0.15vw + 0.15vmin) solid transparent;
  border-radius: 100%;
}
.Theme-icon:hover {
  border: calc(0.15vw + 0.15vmin) solid v-bind(themeColorNormal);
  cursor: pointer;
}
/* End Theme icon */
</style>