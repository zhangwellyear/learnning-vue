<template>
  <div>
    <Chart :option="chartOptions" style="height: 400px" />
  </div>
</template>

<script>
import Chart from "../../components/Chart.vue";
import request from "../../utils/request";

export default {
  components: {
    Chart,
  },
  data() {
    return {
      chartOptions: {},
    };
  },
  mounted() {
    this.getChartData();
    setInterval(() => {
      this.getChartData();
    }, 3000);
  },
  methods: {
    getChartData() {
      return request({
        method: "get",
        url: "/api/dashboard/chart",
        params: { id: 12345 },
      }).then((response) => {
        this.chartOptions = {
          title: {
            text: "ECharts 入门示例",
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: response.data,
            },
          ],
        };
        console.log(this.chartOptions);
      });
    },
  },
};
</script>

<style></style>
