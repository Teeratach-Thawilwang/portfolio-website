<template>
  <div class="p-t-1">
    <div class="content-containe">
      <div class="chart-container">
        <canvas id="topic2-chart-1"></canvas>
      </div>
      <p class="fs-normal text-center">The number of fake/real news</p>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  name: "chart1-component",
  data() {
    this.chart = null;
    return {
      topic2: {
        xValue: ["Fake", "Real"],
        yValue: [2315, 7854],
        barColors: ["#d24369", "#5585cb"],
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
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: fontColor,
              font: {
                size: 16,
              },
            },
            position: "bottom",
          },
        },
      };
      return options;
    },
    ChartData() {
      let config = {
        type: "pie",
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
      let canvas = document.getElementById("topic2-chart-1").getContext("2d");
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
}
.chart-container canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>