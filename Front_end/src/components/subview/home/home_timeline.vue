<template>
  <div class="timeline-main-container">
    <h1>
      Timeline & Education
      <hr />
    </h1>
    <div class="timeline-bar">
      <ul id="timeline-ul">
        <li
          v-for="(educate, index) in educateTimeline"
          :key="index"
          @click="setActive(index)"
        >
          <b></b>
          <p>{{ educate.year }}</p>
        </li>
      </ul>
    </div>
    <div class="timeline-content-container">
      <div
        class="carousel"
        v-for="(educate, index) in educateTimeline"
        :key="index"
      >
        <transition :name="direction" mode="in-out">
          <div v-show="index == timelineIdx" class="carousel-slide">
            <p>{{ educate.detail }}</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-timeline-component",
  components: {},
  data() {
    return {
      timelineIdx: 0,
      timelineLastIdx: 0,
      direction: "right",
      educateTimeline: [
        {
          year: 2015,
          detail:
            "Study in Bachelor of Electrical Engineering at Khon Kaen University.",
        },
        {
          year: 2018,
          detail: "Graduate from Bachelor of Electrical Engineering.",
        },
        {
          year: 2019,
          detail: "Starting work in Software Engineering (for 8 months).",
        },
        {
          year: 2020,
          detail:
            "Study for a master's degree in Computer science at Khon Kaen University.",
        },
        {
          year: "Present",
          detail:
            "Researching in fake news detection topics and looking for front-end developer jobs.",
        },
      ],
    };
  },
  methods: {
    setActive(index) {
      /* set active for line of timeline */
      const li = document.querySelector('[id="timeline-ul"]').children;
      /* set class */
      for (let i = 0; i < li.length; i++) {
        if (index >= i) {
          li[i].classList.add("active");
        } else {
          li[i].classList.remove("active");
        }
      }
      this.timelineIdx = index;

      /* set active of timeline-content */
      for (let i = 0; i < li.length; i++) {
        if (index == i && index < this.timelineLastIdx) {
          this.direction = "right";
        } else if (index == i && index > this.timelineLastIdx) {
          this.direction = "left";
        }
      }
      this.timelineLastIdx = index;
    },
  },
  computed: {
    timelineLiLen() {
      /* (100% / n_node) */
      return 100 / this.educateTimeline.length + "%";
    },
    setTimeLineLen() {
      return 100 * this.timelineIdx + "%";
    },
    themeColorNormal() {
      return this.$store.getters.getThemeColorNormal;
    },
    themeColorInvert() {
      return this.$store.getters.getThemeColorInvert;
    },
  },
  mounted() {
    document
      .querySelector('[id="timeline-ul"]')
      .children[0].classList.add("active");
    document;
  },
  
};
</script>

<style scoped>
.timeline-main-container {
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  overflow: hidden;
}
/* Timeline Bar */
.timeline-bar {
  position: relative;
  margin: 1rem auto;
  z-index: 1;
}
.timeline-bar ul {
  display: flex;
  justify-content: center;
  /* border: 1px solid red; */
}
.timeline-bar ul li {
  display: block;
  width: v-bind(timelineLiLen); /* (100% / n_node) */
  height: 100%;
  /* To set position of tag b (create line)*/
  position: relative;
}
.timeline-bar ul li b {
  /* create circle */
  background-color: #fff;
  border: 3px solid #fff;
  display: block;
  margin: auto;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  /* font-size: 1rem; */
}
.timeline-bar ul li:first-child b:before {
  /* create line */
  content: "";
  background-color: #fff;
  height: 5px;
  width: 0%;
  display: block;
  position: absolute;
  left: 50%;
  top: 7.5px; /* calc( (B_Y - b_Y_after) / 2) */
  z-index: -1;
  transition: 0.6s linear;
  /* border: 1px solid red; */
}
.timeline-bar ul li:hover {
  cursor: pointer;
}
.timeline-bar ul li:hover > b {
  /* hover circle */
  background-color: rgb(255, 165, 0);
}
.timeline-bar ul li:hover.active > b {
  /* hover active circle */
  background-color: #fff;
  border: 4px solid rgb(255, 165, 0);
}
.timeline-bar ul li.active b {
  /* active circle */
  background-color: rgb(255, 165, 0);
  border: 4px solid rgb(255, 165, 0);
}
.timeline-bar ul li.active b:before {
  /* active line */
  /* width : calc( 100 * (idx_node) + "%") */
  /* which idx_node start from 0 to +interger */
  width: v-bind(setTimeLineLen);
  background-color: rgb(255, 165, 0);
}
/* End Timeline Bar */


/* Timeline Content */
.timeline-content-container {
  position: relative;
  min-height: 5rem;
  overflow: hidden;
  /* border: 2px solid red; */
}
.carousel {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* border: 1px solid red; */
}
/* Timeline Carousel */
.carousel-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.carousel-slide p {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 80%;
  word-break: break-word;
  border: 1px solid;
  box-shadow: 5px 5px v-bind(themeColorNormal);
}
.left-enter-active {
  animation: showTimeLineContentLeftIn 1s ease-in-out;
}
.left-leave-active {
  animation: showTimeLineContentLeftOut 1s ease-in-out;
}
.right-enter-active {
  animation: showTimeLineContentRightIn 1s ease-in-out;
}
.right-leave-active {
  animation: showTimeLineContentRightOut 1s ease-in-out;
}

@keyframes showTimeLineContentLeftIn {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}
@keyframes showTimeLineContentLeftOut {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
@keyframes showTimeLineContentRightIn {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}
@keyframes showTimeLineContentRightOut {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}
/* End Timeline Carousel */
/* End Timeline Content */


@media screen and (max-width: 1024px) {
  .timeline-main-container{
    width: 90%;
  }
}
@media screen and (max-width: 900px) {
}
@media screen and (max-width: 700px) {
  .timeline-main-container h1{
    text-align: center;
  }
}
@media screen and (max-width: 600px) {
  .timeline-main-container{
    width: 80%;
  }
}
@media screen and (max-width: 500px) {
  .timeline-main-container{
    width: 90%;
  }
}
</style>