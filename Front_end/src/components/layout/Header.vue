<template>
  <div class="header-app-container">
    <nav>
      <div class="home-icon">
        <a href="/"><img src="../../assets/profile.jpg" alt="" /></a>
      </div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/">Project</a></li>
        <li v-if="loginStatus"><a href="#">Logout</a></li>
        <li v-else><a href="#">Login</a></li>
      </ul>
      <div class="Theme-icon-container" @click="changeTheme">
        <fa-icon class="Theme-icon" :icon="themeIcon" />
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header-app",
  props: ["theme_app"],
  data() {
    return {
      loginStatus: false,
      theme: "theme-dark",
      themeColor: "#fff",
      themeIcon: "sun",
    };
  },
  methods: {
    changeTheme() {
      if (this.themeIcon === "sun") {
        this.themeIcon = "moon";
        this.theme = "theme-white";
        this.themeColor = "#000";
      } else {
        this.themeIcon = "sun";
        this.theme = "theme-dark";
        this.themeColor = "#fff";
      }
    },
  },
  beforeUpdate() {
    this.$emit("theme", this.theme);
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
  border: calc(3px + 0.2vw) solid transparent;
  transition: ease-in-out 0.2s;
  transform: scale(1.5vh, 1.5vh);
}
.home-icon img:hover {
  width: 12vh;
  height: 12vh;
  border: calc(3px + 0.2vw) solid v-bind(themeColor);
  transform: translate(0vh, 2vh);
}
/* End Home icon */

/* nav menu */
nav ul {
  padding-right: 1rem;
  font-size: calc(1rem + (15) * ((100vw - 375px) / (1920 - 375)));
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* border: 1px solid red; */
}
nav ul li {
  padding: calc(1vw + 1vh - 1vmax);
  margin-right: 1vw;
  border-radius: calc(5vw + 5vmin);
  border: calc(1.5px + 0.15vw) solid transparent;
  transition: ease-in-out 0.3s;
}
nav ul li:hover {
  border: calc(1.5px + 0.15vw) solid v-bind(themeColor);
}
nav a {
  color: v-bind(themeColor);
  text-decoration: none;
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
  color: v-bind(themeColor);
  padding: calc(0.7vw + 0.7vh - 0.45vmax);
  font-size: calc(0.5vw + 3vh - 0.1vmax);
  transition: ease-in-out 0.3s;
  border: calc(1.5px + 0.15vw) solid transparent;
  border-radius: 100%;
}
.Theme-icon:hover {
  border: calc(1.5px + 0.15vw) solid v-bind(themeColor);
  cursor: pointer;
}
/* End Theme icon */
</style>