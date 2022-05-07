<template>
  <div class="p-t-1">
    <div class="content-containe">
      <div class="chart-container">
        <canvas id="topic2-chart-2"></canvas>
      </div>
      <p class="fs-normal text-center">Fake news Histogram</p>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  name: "chart2-component",
  data() {
    this.chart = null;
    return {
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
      console.log("on CreateChart");
      let canvas = document.getElementById("topic2-chart-2").getContext("2d");
      let option = this.ChartOptions(fontColor);
      let config = this.ChartData();
      config["options"] = option;
      Chart.defaults.font.size = 16;
      this.chart = new Chart(canvas, config);
    },
  },
  mounted() {
    // console.log("on mounted");
    this.CreateChart();
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
.chart-container canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>