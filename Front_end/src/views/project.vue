<template>
  <div class="view-project-container">
    <div id="topic-1" class="topic-container">
      <h1>
        Research Detail (uncomplete)
        <hr />
      </h1>
      <p>
        This research has 2 objectives. For the first, To create fake news
        datasets from Thai Facebook publish page. The second, To classify fake
        news by applying machine learning.
      </p>
      <p>
        The data was collected from Thai Facebook publish page. Only text posts
        will be included in fake news datasets, videos or background profile
        pictures will be excluded.
      </p>
      <p>
        This website has been made to accommodate Fake news Labeling. If you
        can't see any data, Please Login.
      </p>
    </div>
    <div id="topic-2" class="topic-container">
      <h1>
        News Chart.
        <hr />
      </h1>
      <div class="topic2-chart">
        <canvas id="topic2-chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "project-component",
  data() {
    return {
      topic2: {
        xValue: ["Fake", "Real"],
        yValue: [2315, 7854],
        barColors: ["#b91d47", "#2b5797"],
      },
      topic2Chart: null,
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
  watch: {
    themeColorNormal(val) {
      this.topic2Chart.destroy();
      this.Topic2Chart(val);
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
    Topic2Chart(fontColor = this.themeColorNormal) {
      console.log("on Topic2Chart");
      var canvas = document.getElementById("topic2-chart").getContext("2d");
      var option = {
        type: "pie",
        data: {
          labels: this.topic2.xValue,
          datasets: [
            {
              label: "Page A",
              data: this.topic2.yValue,
              backgroundColor: this.topic2.barColors,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: fontColor,
                font: {
                  size: 20,
                },
              },
              position: "bottom",
            },
          },
        },
      };
      Chart.defaults.font.size = 18;
      this.topic2Chart = new Chart(canvas, option);
    },
  },
  created() {
    this.setSidebarTopic();
  },
  mounted() {
    this.Topic2Chart();
  },
};
</script>

<style scoped>
/* Global tag */
hr {
  border: 1px solid v-bind(themeColorNormal);
  background-color: v-bind(themeColorNormal);
}
a {
  text-decoration: underline;
  color: v-bind(themeColorNormal);
}
h1 {
  font-size: 2.5rem;
  font-weight: bolder;
  text-align: left;
}
p {
  padding: 0 1rem;
  font-size: 1.25rem;
  letter-spacing: 2px;
  word-spacing: 0px;
}

@media screen and (max-width: 1024px) {
  h1 {
    font-size: 2rem;
  }
}
@media screen and (max-width: 900px) {
}
@media screen and (max-width: 700px) {
  h1 {
    font-size: 1.5rem;
  }
  p {
    font-size: 1rem;
    padding: 0 1rem;
    letter-spacing: 0px;
    /* word-break: keep-all; */
  }
}
@media screen and (max-width: 600px) {
  h1 {
    font-size: 2rem;
    text-align: center;
    padding: 0;
    /* border: 1px solid red; */
  }
  p {
    padding: 0;
    letter-spacing: 0px;
    /* color: yellow; */
  }
}
/* End Global tag */
</style>

<style scoped>
.view-project-container {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid skyblue; */
}
/* Global Container */
.topic-container {
  display: block;
  width: 90%;
  margin-top: 3rem;
  /* border: 1px solid skyblue; */
}
.topic-container:last-child {
  margin-bottom: 5rem;
}
/* End Global Container */

.topic-container h1 {
  font-size: 2.5rem;
  /* margin-bottom: 3rem; */
}
.topic-container p {
  display: block;
  text-align: left;
  text-indent: 2rem;
  padding-top: 1rem;
  font-size: 1.25rem;
  font-weight: normal;
  letter-spacing: 2px;
  word-spacing: 0px;
  /* border: 1px solid red; */
}

.topic2-chart {
  width: 50%;
  margin: auto;
  padding-top: 1rem;
  /* border: 1px solid red; */
}

@media screen and (max-width: 1024px) {
  .topic-container h1 {
    font-size: 2rem;
  }
  .topic2-chart {
    width: 60%;
  }
}
@media screen and (max-width: 900px) {
  .topic-container p {
    letter-spacing: 0px;
  }
  .topic2-chart {
    width: 60%;
  }
}
@media screen and (max-width: 700px) {
  .topic-container h1 {
    font-size: 1.5rem;
  }
  .topic-container p {
    font-size: 1rem;
  }
  .topic2-chart {
    width: 70%;
  }
}
@media screen and (max-width: 600px) {
  .topic-container h1 {
    font-size: 2rem;
  }
  .topic2-chart {
    width: 80%;
  }
}
@media screen and (max-width: 500px) {
  .topic2-chart {
    width: 90%;
  }
}
</style>