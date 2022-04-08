<template>
  <div class="education-container">
    <h1>
      Timeline
      <hr />
    </h1>
    <div class="timeline-bar">
      <ul id="timeline-ul">
        <li
          v-for="(educate, index) in educateTimeline"
          :key="index"
          :class="`li_item_${index}`"
          @click="setActive"
        >
          <b></b>
          <p>{{ educate.year }}</p>
        </li>
      </ul>
    </div>
    <div class="timeline-content-container">
      <div
        class="timeline-content"
        v-for="(educate, index) in educateTimeline"
        :key="index"
        v-show="timelineIdx==index"
      >
        <p>{{ educate.detail }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-education-component",
  data() {
    return {
      timelineIdx: 0,
      educateTimeline: [
        {
          year: 2015,
          detail: "Study in Bachelor of Electrical Engineering at KKU",
        },
        { year: 2018, detail: "Congradjuration in Bechelor degree." },
        {
          year: 2019,
          detail: "Starting work as software engineering (for 8 month).",
        },
        {
          year: 2020,
          detail: "Study in master's degree of Computer science at KKU.",
        },
        { year: "Now", detail: "Researching in fake news detection topics." },
      ],
    };
  },
  methods: {
    setActive(even) {
      const li = document.querySelector('[id="timeline-ul"]').children;
      var eClassname;
      if (even.target.offsetParent.className == "timeline-bar") {
        eClassname = even.target.className.replace("active", "").trim();
      } else {
        eClassname = even.target.offsetParent.className
          .replace("active", "")
          .trim();
      }
      let idx = 0;
      for (let i = 0; i < li.length; i++) {
        const liClassName = li[i].className.replace("active", "").trim();
        if (eClassname == liClassName) {
          idx = i;
          break;
        }
      }
      for (let i = 0; i < li.length; i++) {
        if (idx >= i) {
          li[i].classList.add("active");
        } else {
          li[i].classList.remove("active");
        }
      }
      this.timelineIdx = idx;
    },
  },
  computed: {
    timelineLiLen() {
      /* (100% / n_node) */
      return 100 / this.educateTimeline.length + "%";
    },
  },
  mounted() {
    document
      .querySelector('[id="timeline-ul"]')
      .children[0].classList.add("active");
  },
};
</script>

<style scoped>
.education-container {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

/* Timeline Bar */
.timeline-bar {
  position: relative;
  margin: 40px auto;
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
.timeline-bar ul li b:before {
  /* create line */
  content: "";
  background-color: #fff;
  height: 5px;
  width: 100%;
  display: block;
  position: absolute;
  left: -50%;
  top: 7.5px; /* calc( (B_Y - b_Y_after) / 2) */
  z-index: -1;
  /* border: 1px solid red; */
}
.timeline-bar ul li:first-child b:before {
  /* cancel first-child line */
  content: none;
}
.timeline-bar ul li:hover {
  cursor: pointer;
}
.timeline-bar ul li:hover > b {
  /* hover circle */
  background-color: rgb(227, 114, 8);
}
.timeline-bar ul li.active b {
  /* active circle */
  background-color: rgb(255, 188, 18);
  border: 3px solid rgb(255, 188, 18);
}
.timeline-bar ul li.active b:before {
  /* active line */
  background-color: rgb(255, 188, 18);
}
/* End Timeline Bar */

.timeline-content-container {
  min-height: 50px;
  /* border: 1px solid rgb(204, 201, 128); */
}

.timeline-content {
  padding: 2rem 0;
  transition: 1s ease-in-out;
  /* border: 1px solid red; */
}


@media screen and (max-width: 1024px) {
}

@media screen and (max-width: 900px) {
}
@media screen and (max-width: 700px) {
}
@media screen and (max-width: 600px) {
}
</style>