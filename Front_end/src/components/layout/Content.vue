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
        <li v-for="(topic, index) in topics" :key="index">
          <a :href="`#topic-${index + 1}`">
            <div class="tooltip">
              <fa-icon :icon="`${index + 1}`" />
              <span class="tooltiptext">{{ topic.key }}</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="content-container">
      <router-view></router-view>
      <div class="move-top-bottom" @click="scrollScreen()">
        <fa-icon
          :icon="moveTopBottom ? 'angle-double-up' : 'angle-double-down'"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Content-app",
  data() {
    return {
      moveTopBottom: false,
    };
  },
  computed: {
    themeColorNormal() {
      return this.$store.getters.getThemeColorNormal;
    },
    themeColorInvert() {
      return this.$store.getters.getThemeColorInvert;
    },
    topics() {
      return this.$store.getters.getTopics;
    },
  },
  methods: {
    scrollScreen() {
      if (this.moveTopBottom) {
        window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, document.body.scrollHeight);
      }
      this.moveTopBottom = !this.moveTopBottom;
    },
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
.unselected {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

/* Sidebar */
.sidebar-container {
  display: flex;
  justify-content: space-around;
  position: relative;
  z-index: 100;
  /* border: 1px solid red; */
}
.sidebar {
  position: fixed;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);

  width: 5vw;
  text-align: center;
  /* font-size: calc(1vw + 0.5vh + 0.5vmin); */
  font-size: 1.25rem;
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
  animation: move 2.5s;
  animation-timing-function: ease-in-out;
  /* animation-timing-function: cubic-bezier(0.69, 2.6, 0.36, -1); */
  animation-fill-mode: forwards;
}
/* End Sidebar animation */

/* Sidebar menu */
.sidebar li {
  list-style: none;
  width: calc(5vw);
  transition: ease-in-out 0.2s;
  transform: translate(0vw, 0);
  /* border: 1px solid red; */
}
.sidebar li:hover {
  cursor: pointer;
}
.sidebar a:hover {
  /* font-size: calc(2.5vw + 1.5vh + 1vmin); */
  font-size: 2rem;
  transform: translate(0vw, 0);
  cursor: pointer;
}
.sidebar a {
  display: block;
  width: 100%;
  padding-top: calc(0.5vw + 0.5vh + 0.5vmin);
  padding-bottom: calc(0.5vw + 0.5vh + 0.5vmin);
  padding-left: 2vw;
  transform: translate(-1vw, 0);
  transition: ease-in-out 0.3s;
  color: v-bind(themeColorNormal);
  text-decoration: none;
  /* border: 1px solid green; */
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
  box-shadow: 5px 5px 20px 20px rgba(0, 0, 0, 0.15);
}
/* End Tooltip */

/* End Sidebar*/

/* Arrow move top-bottom */
.move-top-bottom {
  display: none;
  position: fixed;
  bottom: 50px;
  right: 1rem;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 10px;
  color: #000;
  background-color: #fff;
  box-shadow: 5px 5px 20px 20px rgba(0, 0, 0, 0.15);
}

@media screen and (max-width: 700px) {
}

@media screen and (max-width: 600px) {
  .content-app-container {
    display: block;
    /* border: 1px solid red; */
  }
  .sidebar-container {
    display: none;
    /* border: 1px solid red; */
  }
  .move-top-bottom {
    display: block;
  }
}
</style>