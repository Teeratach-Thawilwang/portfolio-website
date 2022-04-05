<template>
  <div class="content-app-container">
    <div class="sidebar-container">
      <ul class="sidebar">
        <li>
          <a href="#">
            <div class="tooltip">
              <fa-icon icon="angle-double-up" />
              <span class="tooltiptext">Go Top</span>
            </div>
          </a>
        </li>
        <li v-for="(topic, key) in topics" :key="key">
          <a href="#">
            <div class="tooltip">
              <fa-icon :icon="topic" />
              <span class="tooltiptext">{{ key }}</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="content-container">
      <router-view :theme_app="theme_app"></router-view>
      <router-view :theme_app="theme_app"></router-view>
      <router-view :theme_app="theme_app"></router-view>
      <router-view :theme_app="theme_app"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Content-app",
  props: ["theme_app"],
  data() {
    return {
      themeColorNormal: "#fff",
      themeColorInvert: "#000",
      topics: {
        About: "hand-peace",
        Contact: "address-card",
        Skill: "heart",
        Education: "graduation-cap",
        Chat: "comment",
      },
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
.content-app-container {
  display: grid;
  grid-template-columns: 5vw auto;
  /* border: 1px solid rgb(255, 255, 213); */
}
.content-container {
  color: v-bind(themeColorNormal);
  /* border: 1px solid rgb(179, 255, 2); */
}

/* Sidebar */
.sidebar-container {
  display: flex;
  justify-content: space-around;
  position: relative;
  /* border: 1px solid red; */
}
.sidebar {
  position: fixed;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
 
  width: 5vw;
  text-align: center;
  font-size: calc(1vw + 1vh + 1vmin);
  /* border: 1px solid rgb(13, 0, 255); */
}

/* Sidebar animation */
@keyframes move {
  0% {
    top: 0;
  }
  50% {
    top: 80%;
  }
  80% {
    top: 10%;
  }
  100% {
    top: 50%;
  }
}
.sidebar {
  /* animation: move 2.5s; */
  animation-timing-function: ease-in-out;
  /* animation-timing-function: cubic-bezier(0.69, 2.6, 0.36, -1); */
  animation-fill-mode: forwards;
}
/* End Sidebar animation */

/* Sidebar menu */
.sidebar li {
  list-style: none;
  width: calc(5vw);
  padding-top: calc(0.5vw + 0.5vh + 0.5vmin);
  padding-bottom: calc(0.5vw + 0.5vh + 0.5vmin);
  padding-left: 3vw;
  transition: ease-in-out 0.3s;
  transform: translate(-3vw, 0);
  /* border: 1px solid red; */
}
.sidebar li:hover {
  font-size: calc(2.5vw + 1.5vh + 1vmin);
  transform: translate(-0.5vw, 0);
  cursor: pointer;
}
.sidebar a {
  color: v-bind(themeColorNormal);
  text-decoration: none;
}
/* End Sidebar menu */

/* Tooltip */
.tooltip {
  position: relative;
  /* border: 1px solid red; */
}
.tooltiptext {
  white-space: pre;
  visibility: hidden;
  background-color: v-bind(themeColorNormal);
  color: v-bind(themeColorInvert);
  text-align: center;
  border-radius: 1em;

  font-size: calc(0.5vw + 1vh + 1vmin);
  margin-left: calc(5vw + 1.5vh + 1.5vmin);
  padding: calc(0.25vw + 0.25vh + 0.25vmin) calc(1vw + 1vh + 1vmin);

  transition: ease-in-out 0.3s;
  transform: translate(0, -2vw);
  transform: rotate(120deg);

  /* Position the tooltip */
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.sidebar li:hover .tooltiptext {
  visibility: visible;
  transform: translate(10, -2vw);
  transform: rotate(0deg);
}
/* End Tooltip */

/* End Sidebar*/

/* @media screen and (max-width: 800px) {
  .container {
    grid-template-columns: 8vw 92vw;
  }
}

@media screen and (max-width: 400px) {
  .container {
    display: block;
  }
  .pagewrap {
    display: none;
  }
} */
</style>