<template>
  <div class="app-container" :class="[getThemeColor]">
    <div class="app-header">
      <Header />
    </div>
    <div class="app-content">
      <Content />
    </div>
    <div class="app-footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import Content from "@/components/layout/Content.vue";
import Footer from "@/components/layout/Footer.vue";
import { useCookies } from "vue3-cookies";
export default {
  name: "app",
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {};
  },
  components: {
    Header,
    Content,
    Footer,
  },
  methods: {},
  computed: {
    getThemeColor() {
      return this.$store.getters.getThemeColor;
    },
  },
  mounted() {
    document.title = "Teeratach Thawilwang";
  },
  beforeCreate() {
    const color = this.cookies.get("themeColor");
    this.$store.dispatch("changeThemeAction", color);
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
@font-face {
  font-family: "Fredoka", sans-serif;
  font-family: "Roboto", sans-serif;
  font-family: "Itim", cursive;
  src: url("https://fonts.googleapis.com/css2?family=Fredoka:wght@400;700&family=Itim&family=Roboto:wght@300;400;700&display=swap");
}

/* Custom scrollbar*/
body::-webkit-scrollbar {
  width: inherit;
}
body::-webkit-scrollbar-track {
  background: rgb(81, 81, 81);
}
body::-webkit-scrollbar-thumb {
  background: rgb(127, 127, 127);
  border-radius: 10px;
}
body::-webkit-scrollbar-thumb:hover {
  background: rgb(160, 160, 160);
}
</style>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.dark {
  background-image: linear-gradient(to bottom left, #2c3e50, #222c36);
}
.white {
  background-image: linear-gradient(
    to bottom left,
    rgb(255, 252, 203),
    rgb(247, 214, 132)
  );
}
.app-header {
  height: 12vh;
  /* border: 1px solid rgb(88, 255, 88); */
}
.app-content {
  height: auto;
  min-height: 83vh;
  /* border: 2px solid white; */
}
.app-footer {
  height: 5vh;
  flex-shrink: 0;
  /* border: 2px solid orange; */
}
</style>
