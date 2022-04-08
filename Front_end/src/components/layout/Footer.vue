<template>
  <div class="footer-app-container unselected">
    <p>&copy;copyright 2022 by Teeratach Thawilwang</p>
  </div>
</template>

<script>
export default {
  name: "Footer-app",
  data() {
    return {};
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
.footer-app-container {
  height: inherit;
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
  font-size: calc(0.8vw + 1.5vh - 0.1vmax);
  color: v-bind(themeColorNormal);
}
</style>