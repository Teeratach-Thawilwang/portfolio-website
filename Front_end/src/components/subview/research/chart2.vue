<template>
  <div class="p-t-1">
    <div class="content-containe">
      <div class="chart-container">
        <div v-show="renderChart">
          <canvas id="topic2-chart-2"></canvas>
        </div>
      </div>
      <p class="fs-normal text-center">Fake news Histogram</p>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import axios from "axios";
export default {
  name: "chart2-component",
  data() {
    this.chart = null;
    return {
      renderChart: false,
      topic2: {
        xValue: [
          "satire",
          "misleading",
          "imposter",
          "fabricate",
          "false conection",
          "false context",
          "manipulated content",
        ],
        yValue: [810, 512, 3512, 2546, 921, 975, 1230],
        barColors: ["#d24369", "#5585cb", "#6dc362"],
      },
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
      console.log(val);
      this.chart.options = this.ChartOptions(val);
      this.chart.update();
    },
    renderChart(val) {
      if (val) {
        // console.log("renderChart", val);
        this.CreateChart();
      }
    },
  },
  methods: {
    ChartOptions(fontColor = this.themeColorNormal) {
      let options = {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              color: fontColor,
            },
            ticks: {
              color: fontColor,
            },
          },
          y: {
            grid: {
              // color: fontColor,
            },
            ticks: {
              color: fontColor,
            },
          },
        },
      };
      return options;
    },
    ChartData() {
      let config = {
        type: "bar",
        data: {
          labels: this.topic2.xValue,
          datasets: [
            {
              data: this.topic2.yValue,
              backgroundColor: this.topic2.barColors,
            },
          ],
        },
      };
      return config;
    },
    CreateChart(fontColor = this.themeColorNormal) {
      console.log("on CreateChart2");
      let canvas = document.getElementById("topic2-chart-2").getContext("2d");
      let option = this.ChartOptions(fontColor);
      let config = this.ChartData();
      config["options"] = option;
      Chart.defaults.font.size = 16;
      this.chart = new Chart(canvas, config);
    },
    getLabelCategoryCount() {
      axios
        .get(this.$BackendURL + "labelCategoryCount" )
        .then((res) => {
          // console.log("getLabelCategoryCount", Object.keys(res.data.labelCategory));
          this.topic2.xValue = Object.keys(res.data.labelCategory);
          this.topic2.yValue = Object.values(res.data.labelCategory);
          this.renderChart = true;
        })
        .catch((err) => {
          console.log("Axios getLabelCategoryCount err : ", err.response.data);
          // show error message from server
          this.ErrorMSG = err.response.data.error;
        });
    },
  },
  mounted() {
    // console.log("on mounted");
    this.getLabelCategoryCount()
  },
};
</script>

<style scoped>
@import "@/assets/css/font.css";
@import "@/assets/css/layout.css";
@import "@/assets/css/box.css";

.chart-container {
  height: 250px;
  /* background-color: #6dc362; */
}
.chart-container div {
  width: 100% !important;
  height: 100% !important;
}
</style>