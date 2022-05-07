<template>
  <div class="view-research-container">
    <div id="topic-1" class="content-container">
      <h1 class="text-header">
        Research Detail (uncomplete)
        <hr />
      </h1>
      <p class="text-normal">
        This research has 2 objectives. For the first, To create fake news
        datasets from Thai Facebook publish page. The second, To classify fake
        news by applying machine learning.
      </p>
      <p class="text-normal">
        The data was collected from Thai Facebook publish page. Only text posts
        will be included in fake news datasets, videos or background profile
        pictures will be excluded.
      </p>
      <p class="text-normal">
        This website has been made to accommodate Fake news Labeling. Only users
        who have permission can access the Labeling page.
      </p>
    </div>
    <div id="topic-2" class="content-container">
      <h1 class="text-header">
        Dataset Overview (mock data)
        <hr />
      </h1>
      <div class="d-grid2-1-1 d-block-900px">
        <chart1Component />
        <chart2Component />
      </div>
    </div>
  </div>
</template>

<script>
import chart1Component from "@/components/subview/research/chart1.vue";
import chart2Component from "@/components/subview/research/chart2.vue";
export default {
  name: "project-component",
  components: {
    chart1Component,
    chart2Component,
  },
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
  methods: {
    setSidebarTopic() {
      let topic = [
        { key: "Detail", value: "" },
        { key: "Chart", value: "" },
      ];
      this.$store.dispatch("setTopicAction", topic);
    },
  },
  created() {
    this.setSidebarTopic();
  },
  mounted() {},
};
</script>


<style scoped>
@import "@/assets/css/font.css";
@import "@/assets/css/layout.css";
@import "@/assets/css/box.css";
hr {
  border: 1px solid v-bind(themeColorNormal);
  background-color: v-bind(themeColorNormal);
}
a {
  text-decoration: underline;
  color: v-bind(themeColorNormal);
}
.view-research-container {
  display: block;
  width: 100%;
  margin-bottom: 5rem;
  /* border: 1px solid skyblue; */
}
.topic2-chart {
  width: 40%;
  margin: auto;
  padding-top: 1rem;
  /* border: 1px solid red; */
}
@media screen and (max-width: 1024px) {
  .topic2-chart {
    width: 60%;
  }
}
@media screen and (max-width: 900px) {
}
@media screen and (max-width: 700px) {
  .topic2-chart {
    width: 70%;
  }
}
@media screen and (max-width: 600px) {
  .topic2-chart {
    width: 70%;
  }
}
@media screen and (max-width: 500px) {
  .topic2-chart {
    width: 70%;
  }
}
</style>

<style lang="scss" scoped>
@import "@/assets/css/font";
@import "@/assets/css/layout";
@import "@/assets/css/box";

.text-header {
  @extend .fs-big;
  @extend .fw-bolder;
}
.text-normal {
  @extend .fs-normal;
  @extend .text-left;
  @extend .text-indent;
  padding: 1rem 0 0 0;
  // border: 1px solid red;
}
.content-container {
  @extend .content-container;
  margin-top: 3rem;
}
</style>
