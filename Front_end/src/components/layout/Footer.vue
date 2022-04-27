<template>
  <div class="footer-app-container unselected">
    <p class="fs-small">&copy;copyright 2022 by Teeratach Thawilwang.</p>
    <p class="fs-small">
      The website source code is available <a :href="linkSourceCode">here</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: "Footer-app",
  data() {
    return {
      linkSourceCode:
        "https://github.com/Teeratach-Thawilwang/portfolio-website",
    };
  },
  computed: {
    themeColorNormal() {
      return this.$store.getters.getThemeColorNormal;
    },
    themeColorInvert() {
      return this.$store.getters.getThemeColorInvert;
    },
  },
  methods: {},
};
</script>

<style scoped>
@import "@/assets/css/font.css";

.footer-app-container {
  box-sizing: border-box;
  min-height: inherit;
  margin: 0 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
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
p {
  color: v-bind(themeColorNormal);
}

@media screen and (max-width: 1024px) {
}
@media screen and (max-width: 900px) {
  .footer-app-container {
    flex-direction: column;
  }
}
@media screen and (max-width: 700px) {
}
@media screen and (max-width: 600px) {
}
@media screen and (max-width: 500px) {
}
</style>