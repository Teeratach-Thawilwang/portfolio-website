<template>
  <div class="p-t-1">
    <div class="content-containe">
      <div class="chart-container">
        <p @click="toggleStatus()">
          {{ status == "done" ? "ข้อมูล Label เเล้ว" : "ข้อมูลทั้งหมด" }}
        </p>
        <div v-show="renderChart">
          <canvas id="topic2-chart-1"></canvas>
        </div>
      </div>
      <p class="fs-normal text-center">
        {{
          status == "done"
            ? "The number of labeled news"
            : "The number of total news"
        }}
      </p>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import axios from "axios";
export default {
  name: "chart1-component",
  data() {
    this.chart = null;
    return {
      status: "done",
      renderChart: false,
      updateChart: false,
      topic2: {
        xValue: ["Real", "Fake"],
        yValue: [0, 0],
        barColors: ["#5585cb", "#d24369"],
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
      // console.log(val);
      if (this.renderChart) {
        this.chart.options = this.ChartOptions(val);
        this.chart.update();
      }
    },
    renderChart(val) {
      if (val) {
        // console.log("renderChart", val);
        this.CreateChart();
      }
    },
    updateChart(val) {
      if (val && this.renderChart) {
        // console.log("updateChart", val);
        this.chart.data.labels = this.topic2.xValue;
        this.chart.data.datasets[0].data = this.topic2.yValue;
        this.chart.update();
      }
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
    ChartData(DataChart = this.topic2) {
      // console.log("ChartData", DataChart);
      let config = {
        type: "pie",
        data: {
          labels: DataChart.xValue,
          datasets: [
            {
              data: DataChart.yValue,
              backgroundColor: DataChart.barColors,
            },
          ],
        },
      };
      return config;
    },
    CreateChart(fontColor = this.themeColorNormal) {
      // console.log("on CreateChart1");
      let canvas = document.getElementById("topic2-chart-1").getContext("2d");
      let option = this.ChartOptions(fontColor);
      let config = this.ChartData();
      config["options"] = option;
      Chart.defaults.font.size = 16;
      this.chart = new Chart(canvas, config);
    },
    getLabelCount() {
      const param = "/" + this.status;
      axios
        .get(this.$BackendURL + "labelCount" + param)
        .then((res) => {
          console.log("getLabelCount", res.data.data);
          this.topic2.xValue = Object.keys(res.data.data);
          this.topic2.yValue = Object.values(res.data.data);
          this.renderChart = true;
          this.updateChart = true;
        })
        .catch((err) => {
          console.log("Axios getLabelCount err : ", err.response.data);
          // show error message from server
          this.ErrorMSG = err.response.data.error;
        });
    },
    toggleStatus() {
      if (this.status == "done") {
        this.status = "not done";
      } else {
        this.status = "done";
      }
      this.updateChart = false;
      this.getLabelCount();
    },
  },
  mounted() {
    // console.log("on mounted");
    this.getLabelCount();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/font";
@import "@/assets/css/layout";
@import "@/assets/css/box";

.chart-container {
  height: 350px;
  padding: 30px;
  position: relative;
}
.chart-container p {
  @extend .fs-small;
  border-radius: 5px;
  position: absolute;
  right: 10px;
  padding: 1px 5px;
}
.chart-container p:hover {
  background-color: #5585cb;
  cursor: pointer;
}
.chart-container div {
  width: 100% !important;
  height: 100% !important;
}
</style>