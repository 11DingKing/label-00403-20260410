<template>
  <div class="charts-page">
    <div class="page-header">
      <div class="header-info">
        <h2>数据分析</h2>
        <p>多维度数据可视化展示</p>
      </div>
    </div>

    <a-row :gutter="20" class="chart-row">
      <a-col :xs="24" :lg="12">
        <a-card class="chart-card" :bordered="false">
          <template #title>
            <div class="card-header">
              <span class="card-title">销售数据</span>
              <a-tag color="arcoblue" size="small">实时</a-tag>
            </div>
          </template>
          <div ref="barChartRef" class="chart-container"></div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="12">
        <a-card class="chart-card" :bordered="false">
          <template #title>
            <div class="card-header">
              <span class="card-title">能力评估</span>
              <a-tag color="arcoblue" size="small">季度</a-tag>
            </div>
          </template>
          <div ref="radarChartRef" class="chart-container"></div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="20" class="chart-row">
      <a-col :span="24">
        <a-card class="chart-card" :bordered="false">
          <template #title>
            <div class="card-header">
              <span class="card-title">年度数据对比</span>
              <a-radio-group v-model="chartType" type="button" size="small">
                <a-radio value="bar">柱状图</a-radio>
                <a-radio value="line">折线图</a-radio>
              </a-radio-group>
            </div>
          </template>
          <div ref="mixedChartRef" class="chart-container-lg"></div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const chartType = ref('bar')
const barChartRef = ref<HTMLElement>()
const radarChartRef = ref<HTMLElement>()
const mixedChartRef = ref<HTMLElement>()
let barChart: echarts.ECharts | null = null
let radarChart: echarts.ECharts | null = null
let mixedChart: echarts.ECharts | null = null

onMounted(() => { initBarChart(); initRadarChart(); initMixedChart(); window.addEventListener('resize', handleResize) })
onUnmounted(() => { barChart?.dispose(); radarChart?.dispose(); mixedChart?.dispose(); window.removeEventListener('resize', handleResize) })
const handleResize = () => { barChart?.resize(); radarChart?.resize(); mixedChart?.resize() }

watch(chartType, () => { initMixedChart() })

const initBarChart = () => {
  if (!barChartRef.value) return
  barChart = echarts.init(barChartRef.value)
  barChart.setOption({
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(255,255,255,0.95)', borderColor: '#e5e6eb', textStyle: { color: '#1d2129' } },
    legend: { data: ['销售额', '利润'], right: 0, top: 0 },
    grid: { left: 0, right: 10, bottom: 0, top: 40, containLabel: true },
    xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月'], axisLine: { lineStyle: { color: '#e5e6eb' } }, axisLabel: { color: '#86909c' } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#f2f3f5', type: 'dashed' } }, axisLabel: { color: '#86909c' } },
    series: [
      { name: '销售额', type: 'bar', data: [120, 200, 150, 80, 70, 110], itemStyle: { borderRadius: [6, 6, 0, 0], color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#165dff' }, { offset: 1, color: '#4080ff' }]) }, barWidth: 20 },
      { name: '利润', type: 'bar', data: [60, 100, 75, 40, 35, 55], itemStyle: { borderRadius: [6, 6, 0, 0], color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#0fc6c2' }, { offset: 1, color: '#14c9c9' }]) }, barWidth: 20 },
    ],
  })
}

const initRadarChart = () => {
  if (!radarChartRef.value) return
  radarChart = echarts.init(radarChartRef.value)
  radarChart.setOption({
    tooltip: { backgroundColor: 'rgba(255,255,255,0.95)', borderColor: '#e5e6eb', textStyle: { color: '#1d2129' } },
    legend: { data: ['团队A', '团队B'], right: 0, top: 0 },
    radar: {
      indicator: [{ name: '销售', max: 100 }, { name: '管理', max: 100 }, { name: '技术', max: 100 }, { name: '客服', max: 100 }, { name: '研发', max: 100 }, { name: '市场', max: 100 }],
      shape: 'polygon', splitNumber: 4, axisName: { color: '#86909c' }, splitLine: { lineStyle: { color: '#f2f3f5' } }, splitArea: { areaStyle: { color: ['rgba(22,93,255,0.02)', 'rgba(22,93,255,0.04)'] } },
    },
    series: [{
      type: 'radar',
      data: [
        { value: [80, 90, 70, 85, 95, 75], name: '团队A', areaStyle: { color: 'rgba(22,93,255,0.2)' }, lineStyle: { color: '#165dff', width: 2 }, itemStyle: { color: '#165dff' } },
        { value: [70, 80, 85, 75, 80, 90], name: '团队B', areaStyle: { color: 'rgba(15,198,194,0.2)' }, lineStyle: { color: '#0fc6c2', width: 2 }, itemStyle: { color: '#0fc6c2' } },
      ],
    }],
  })
}

const initMixedChart = () => {
  if (!mixedChartRef.value) return
  if (!mixedChart) mixedChart = echarts.init(mixedChartRef.value)
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  const evapData = [2, 4.9, 7, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20, 6.4, 3.3]
  const rainData = [2.6, 5.9, 9, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6, 2.3]
  const tempData = [2, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23, 16.5, 12, 6.2]
  const seriesType = chartType.value
  mixedChart.setOption({
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(255,255,255,0.95)', borderColor: '#e5e6eb', textStyle: { color: '#1d2129' } },
    legend: { data: ['蒸发量', '降水量', '平均温度'], right: 60, top: 0 },
    grid: { left: 0, right: 60, bottom: 0, top: 50, containLabel: true },
    xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#e5e6eb' } }, axisLabel: { color: '#86909c' } },
    yAxis: [
      { type: 'value', name: '水量(ml)', splitLine: { lineStyle: { color: '#f2f3f5', type: 'dashed' } }, axisLabel: { color: '#86909c' } },
      { type: 'value', name: '温度(°C)', position: 'right', splitLine: { show: false }, axisLabel: { color: '#86909c' } },
    ],
    series: [
      { name: '蒸发量', type: seriesType, data: evapData, itemStyle: { color: '#165dff', borderRadius: seriesType === 'bar' ? [4, 4, 0, 0] : 0 }, smooth: true },
      { name: '降水量', type: seriesType, data: rainData, itemStyle: { color: '#0fc6c2', borderRadius: seriesType === 'bar' ? [4, 4, 0, 0] : 0 }, smooth: true },
      { name: '平均温度', type: 'line', yAxisIndex: 1, data: tempData, itemStyle: { color: '#f77234' }, lineStyle: { width: 3 }, smooth: true },
    ],
  }, true)
}
</script>

<style scoped>
.charts-page { display: flex; flex-direction: column; gap: 20px; }
.page-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
.header-info h2 { margin: 0 0 4px 0; font-size: 20px; font-weight: 600; color: var(--color-text-1); }
.header-info p { margin: 0; font-size: 14px; color: var(--color-text-3); }
.chart-row { margin: 0 !important; }
.chart-card { border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); overflow: hidden; }
.chart-card :deep(.arco-card-header) { border-bottom: 1px solid var(--color-border-1); padding: 16px 20px; }
.card-header { display: flex; align-items: center; gap: 12px; width: 100%; justify-content: space-between; }
.card-title { font-weight: 600; font-size: 15px; }
.chart-container { height: 320px; }
.chart-container-lg { height: 380px; }

/* 大屏适配 */
@media (min-width: 1600px) {
  .chart-container { height: 400px; }
  .chart-container-lg { height: 450px; }
  .page-header { padding: 24px 32px; }
  .header-info h2 { font-size: 24px; }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .charts-page { gap: 12px; }
  .page-header { padding: 16px; flex-direction: column; align-items: flex-start; gap: 12px; }
  .header-info h2 { font-size: 18px; }
  .header-info p { font-size: 12px; }
  .chart-container { height: 240px; }
  .chart-container-lg { height: 280px; }
  .chart-card :deep(.arco-card-header) { padding: 12px 16px; }
  .card-header { flex-wrap: wrap; gap: 8px; }
  .card-title { font-size: 14px; }
}
</style>
