<template>
  <div ref="chartDom"></div>
</template>

<script>
import * as echarts from "echarts";
import { addListener, removeListener } from "resize-detector";
import debounce from "lodash/debounce";

export default {
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    option: function (val) {
      this.chart.setOption(val);
    },
  },
  data() {
    return {};
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  methods: {
    resize() {
      this.chart.resize();
    },
    renderChart() {
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
    },
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
};
</script>

<style></style>
