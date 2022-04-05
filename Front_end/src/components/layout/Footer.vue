<template>
  <div class="footer-app-container">
    <p >&copy;copyright 2022 by Teeratach Thawilwang</p>
  </div>
</template>

<script>
export default {
  name: "Footer-app",
  props: ["theme_app"],
  data() {
    return {
      themeColorNormal: "#fff",
      themeColorInvert: "#000",
    };
  },
  methods: {
    changeTheme() {
      if (this.theme_app === "theme-white") {
        this.themeColorNormal = "#000";
        this.themeColorInvert = "#fff";
      } else {
        this.themeColorNormal = "#fff";
        this.themeColorInvert = "#000";
      }
    },
  },
  beforeUpdate() {
    this.changeTheme();
  },
};
</script>

<style scoped>
.footer-app-container {
  height: inherit;
  margin: 0 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
}
p {
  font-size: calc(1rem + (15) * ((100vw - 375px) / (1920 - 375)));
  color: v-bind(themeColorNormal)
}
</style>