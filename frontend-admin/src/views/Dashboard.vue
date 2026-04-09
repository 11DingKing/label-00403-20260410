<template>
  <div class="insight-page">
    <div class="page-header">
      <h1>数据分析</h1>
      <span v-if="searchKeyword" class="search-result">搜索: "{{ searchKeyword }}"</span>
    </div>

    <div class="widgets-grid">
      <div class="widget-card" v-show="showCard('销售')">
        <div class="widget-header">
          <div class="widget-title"><icon-drive-file /> 总销售额</div>
        </div>
        <div class="widget-value">
          <span class="value">¥{{ statsData.sales.value }}</span>
          <span :class="['change', statsData.sales.trend]">
            <icon-arrow-rise v-if="statsData.sales.trend === 'up'" />
            <icon-arrow-fall v-else />
            {{ statsData.sales.change }}%
          </span>
        </div>
        <div class="widget-subtitle">销售趋势</div>
        <div ref="salesChartRef" class="widget-chart"></div>
        <div class="chart-legend">
          <span class="legend-item"><span class="dot blue"></span> 本周</span>
          <span class="legend-item"><span class="dot gray"></span> 上周</span>
        </div>
      </div>

      <div class="widget-card" v-show="showCard('订单')">
        <div class="widget-header">
          <div class="widget-title"><icon-storage /> 平均订单金额</div>
        </div>
        <div class="widget-value">
          <span class="value">¥{{ statsData.order.value }}</span>
          <span :class="['change', statsData.order.trend]">
            <icon-arrow-rise v-if="statsData.order.trend === 'up'" />
            <icon-arrow-fall v-else />
            {{ statsData.order.change }}%
          </span>
        </div>
        <div class="widget-subtitle">订单金额趋势</div>
        <div ref="orderChartRef" class="widget-chart"></div>
        <div class="chart-legend">
          <span class="legend-item"><span class="dot green"></span> 本周</span>
          <span class="legend-item"><span class="dot gray"></span> 上周</span>
        </div>
      </div>

      <div class="widget-card" v-show="showCard('客户,回头客')">
        <div class="widget-header">
          <div class="widget-title"><icon-user-group /> 回头客比例</div>
        </div>
        <div class="widget-value">
          <span class="value">{{ statsData.customer.value }}%</span>
          <span :class="['change', statsData.customer.trend]">
            <icon-arrow-rise v-if="statsData.customer.trend === 'up'" />
            <icon-arrow-fall v-else />
            {{ statsData.customer.change }}%
          </span>
        </div>
        <div class="widget-subtitle">客户趋势</div>
        <div ref="customerChartRef" class="widget-chart"></div>
        <div class="chart-legend">
          <span class="legend-item"><span class="dot orange"></span> 本周</span>
          <span class="legend-item"><span class="dot gray"></span> 上周</span>
        </div>
      </div>

      <div class="widget-card" v-show="showCard('转化')">
        <div class="widget-header">
          <div class="widget-title"><icon-line-height /> 转化率</div>
        </div>
        <div class="widget-value">
          <span class="value">{{ statsData.conversion.value }}%</span>
          <span :class="['change', statsData.conversion.trend]">
            <icon-arrow-rise v-if="statsData.conversion.trend === 'up'" />
            <icon-arrow-fall v-else />
            {{ statsData.conversion.change }}%
          </span>
        </div>
        <div class="conversion-list">
          <div class="conversion-item" v-for="item in statsData.conversionList" :key="item.name">
            <div class="item-info">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-sub">{{ item.sessions }} 次会话</span>
            </div>
            <div class="item-stats">
              <span class="item-value">{{ item.rate }}%</span>
              <span :class="['item-change', item.trend]">
                <icon-arrow-rise v-if="item.trend === 'up'" />
                <icon-arrow-fall v-else />
                {{ item.change }}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="widget-card" v-show="showCard('访问')">
        <div class="widget-header">
          <div class="widget-title"><icon-thunderbolt /> 访问量</div>
        </div>
        <div class="widget-value"><span class="value">{{ statsData.sessions.value }}</span></div>
        <div class="widget-subtitle">每6小时用户数</div>
        <div ref="sessionsChartRef" class="widget-chart"></div>
      </div>

      <div class="widget-card wide" v-show="showCard('留存,客户')">
        <div class="widget-header">
          <div class="widget-title"><icon-user-group /> 客户留存分析</div>
        </div>
        <div class="cohort-table">
          <div class="cohort-header">
            <span class="cohort-label">全部用户</span>
            <span v-for="w in weeks" :key="w" class="cohort-week">{{ w }}</span>
          </div>
          <div class="cohort-row" v-for="(row, i) in cohortData" :key="i">
            <span class="cohort-date">{{ row.date }}</span>
            <span class="cohort-total">{{ row.total }}</span>
            <span v-for="(val, j) in row.weeks" :key="j" class="cohort-cell" :style="{ background: getCohortColor(val) }"></span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="noResults" class="no-results">
      <icon-search style="font-size: 48px; color: #c9cdd4;" />
      <p>未找到匹配 "{{ searchKeyword }}" 的数据</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { IconUserGroup, IconThunderbolt, IconArrowRise, IconArrowFall, IconDriveFile, IconStorage, IconLineHeight, IconSearch } from '@arco-design/web-vue/es/icon'

const props = defineProps<{ searchKeyword?: string }>()

const weeks = ['第0周', '第1周', '第2周', '第3周', '第4周', '第5周']

const showCard = (keywords: string) => {
  if (!props.searchKeyword) return true
  const search = props.searchKeyword.toLowerCase()
  return keywords.split(',').some(k => k.toLowerCase().includes(search) || search.includes(k.toLowerCase()))
}

const noResults = computed(() => {
  if (!props.searchKeyword) return false
  const cards = ['销售', '订单', '客户,回头客', '转化', '访问', '留存,客户']
  return !cards.some(k => showCard(k))
})

const statsData = {
  sales: { value: 1423, change: 10, trend: 'down', data: [500, 700, 600, 900, 1100, 1200, 800], compare: [400, 500, 450, 700, 800, 900, 600] },
  order: { value: 3808, change: 5, trend: 'up', data: [600, 800, 750, 1000, 1200, 1100, 900], compare: [500, 600, 550, 800, 900, 850, 700] },
  customer: { value: 27, change: 3, trend: 'down', data: [15, 18, 20, 22, 25, 27, 24], compare: [12, 14, 16, 18, 20, 22, 19] },
  conversion: { value: 23.87, change: 1.23, trend: 'down' },
  conversionList: [
    { name: '商品浏览', sessions: 2341, rate: 87.23, change: 10.74, trend: 'up' },
    { name: '加入购物车', sessions: 1253, rate: 47.87, change: 3.33, trend: 'down' },
    { name: '进入结算', sessions: 208, rate: 23.95, change: 5.44, trend: 'up' },
    { name: '完成购买', sessions: 258, rate: 18.14, change: 3.34, trend: 'up' }
  ],
  sessions: { value: 1234, data: [120, 200, 150, 180, 250, 300, 220] }
}

const cohortData = [
  { date: '08/20 - 08/26', total: '100%', weeks: [100, 5.8, 3.2, 2.7, 1.5, 1.5] },
  { date: '08/27 - 09/02', total: '100%', weeks: [100, 5.8, 3.2, 2.7, 1.5, 0] },
  { date: '09/03 - 09/09', total: '100%', weeks: [100, 5.8, 3.2, 2.7, 0, 0] },
  { date: '09/10 - 09/16', total: '100%', weeks: [100, 5.8, 3.2, 0, 0, 0] },
  { date: '09/17 - 09/23', total: '100%', weeks: [100, 5.8, 0, 0, 0, 0] },
  { date: '09/24 - 09/30', total: '100%', weeks: [100, 0, 0, 0, 0, 0] },
]

const getCohortColor = (val: number) => {
  if (val === 0) return 'transparent'
  if (val >= 100) return '#f77234'
  if (val >= 5) return '#ffb65d'
  if (val >= 3) return '#ffe5a0'
  return '#fff3d0'
}

const salesChartRef = ref<HTMLElement>()
const orderChartRef = ref<HTMLElement>()
const customerChartRef = ref<HTMLElement>()
const sessionsChartRef = ref<HTMLElement>()
let charts: echarts.ECharts[] = []

onMounted(() => { initCharts(); window.addEventListener('resize', handleResize) })
onUnmounted(() => { charts.forEach(c => c?.dispose()); window.removeEventListener('resize', handleResize) })
const handleResize = () => { charts.forEach(c => c?.resize()) }

const initCharts = () => {
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const baseOpt = { 
    grid: { left: 40, right: 10, top: 10, bottom: 20 }, 
    xAxis: { type: 'category', data: days, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: '#86909c', fontSize: 11 } }, 
    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#f0f0f0', type: 'dashed' } }, axisLabel: { color: '#86909c', fontSize: 11 } } 
  }
  const data = statsData
  
  if (salesChartRef.value) {
    const c = echarts.init(salesChartRef.value)
    c.setOption({ ...baseOpt, yAxis: { ...baseOpt.yAxis, axisLabel: { ...baseOpt.yAxis.axisLabel, formatter: '¥{value}' } }, series: [
      { type: 'line', smooth: true, data: data.sales.data, lineStyle: { color: '#165dff', width: 2 }, itemStyle: { color: '#165dff' }, showSymbol: false, areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(22,93,255,0.15)' }, { offset: 1, color: 'rgba(22,93,255,0)' }]) } },
      { type: 'line', smooth: true, data: data.sales.compare, lineStyle: { color: '#c9cdd4', width: 2, type: 'dashed' }, itemStyle: { color: '#c9cdd4' }, showSymbol: false }
    ] })
    charts.push(c)
  }
  if (orderChartRef.value) {
    const c = echarts.init(orderChartRef.value)
    c.setOption({ ...baseOpt, yAxis: { ...baseOpt.yAxis, axisLabel: { ...baseOpt.yAxis.axisLabel, formatter: '¥{value}' } }, series: [
      { type: 'line', smooth: true, data: data.order.data, lineStyle: { color: '#00b42a', width: 2 }, itemStyle: { color: '#00b42a' }, showSymbol: false, areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,180,42,0.15)' }, { offset: 1, color: 'rgba(0,180,42,0)' }]) } },
      { type: 'line', smooth: true, data: data.order.compare, lineStyle: { color: '#c9cdd4', width: 2, type: 'dashed' }, itemStyle: { color: '#c9cdd4' }, showSymbol: false }
    ] })
    charts.push(c)
  }
  if (customerChartRef.value) {
    const c = echarts.init(customerChartRef.value)
    c.setOption({ ...baseOpt, yAxis: { ...baseOpt.yAxis, axisLabel: { ...baseOpt.yAxis.axisLabel, formatter: '{value}%' } }, series: [
      { type: 'line', smooth: true, data: data.customer.data, lineStyle: { color: '#f77234', width: 2 }, itemStyle: { color: '#f77234' }, showSymbol: false, areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(247,114,52,0.15)' }, { offset: 1, color: 'rgba(247,114,52,0)' }]) } },
      { type: 'line', smooth: true, data: data.customer.compare, lineStyle: { color: '#c9cdd4', width: 2, type: 'dashed' }, itemStyle: { color: '#c9cdd4' }, showSymbol: false }
    ] })
    charts.push(c)
  }
  if (sessionsChartRef.value) {
    const c = echarts.init(sessionsChartRef.value)
    c.setOption({ ...baseOpt, series: [{ type: 'bar', data: data.sessions.data, itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#14c9c9' }, { offset: 1, color: '#0fc6c2' }]), borderRadius: [4, 4, 0, 0] }, barWidth: 24 }] })
    charts.push(c)
  }
}
</script>

<style scoped>
.insight-page { display: flex; flex-direction: column; gap: 20px; }
.page-header { display: flex; justify-content: space-between; align-items: center; }
.page-header h1 { font-size: 22px; font-weight: 600; color: #1d2129; margin: 0; }
.search-result { font-size: 14px; color: #86909c; background: #f7f8fc; padding: 4px 12px; border-radius: 4px; }
.widgets-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.no-results { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 20px; color: #86909c; }
.no-results p { margin-top: 16px; font-size: 14px; }
.widget-card { background: #fff; border-radius: 12px; padding: 20px; border: 1px solid #f0f0f0; }
.widget-card.wide { grid-column: span 1; }
.widget-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.widget-title { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 500; color: #86909c; }
.widget-value { display: flex; align-items: baseline; gap: 12px; margin-bottom: 8px; }
.widget-value .value { font-size: 32px; font-weight: 700; color: #1d2129; }
.change { display: flex; align-items: center; gap: 4px; font-size: 14px; font-weight: 500; }
.change.up { color: #00b42a; }
.change.down { color: #f53f3f; }
.widget-subtitle { font-size: 13px; color: #86909c; margin-bottom: 16px; text-decoration: underline; text-underline-offset: 3px; }
.widget-chart { height: 140px; }
.chart-legend { display: flex; gap: 16px; margin-top: 12px; }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #86909c; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.blue { background: #165dff; }
.dot.green { background: #00b42a; }
.dot.orange { background: #f77234; }
.dot.gray { background: #c9cdd4; }
.conversion-list { display: flex; flex-direction: column; gap: 16px; margin-top: 16px; }
.conversion-item { display: flex; justify-content: space-between; align-items: center; }
.item-info { display: flex; flex-direction: column; gap: 2px; }
.item-name { font-size: 13px; color: #1d2129; }
.item-sub { font-size: 12px; color: #86909c; }
.item-stats { display: flex; align-items: center; gap: 12px; }
.item-value { font-size: 14px; font-weight: 600; color: #1d2129; }
.item-change { display: flex; align-items: center; gap: 2px; font-size: 12px; }
.item-change.up { color: #00b42a; }
.item-change.down { color: #f53f3f; }
.cohort-table { margin-top: 16px; }
.cohort-header, .cohort-row { display: grid; grid-template-columns: 100px 60px repeat(6, 1fr); gap: 4px; align-items: center; }
.cohort-header { margin-bottom: 8px; }
.cohort-label, .cohort-week { font-size: 11px; color: #86909c; text-align: center; }
.cohort-label { text-align: left; }
.cohort-row { margin-bottom: 4px; }
.cohort-date { font-size: 12px; color: #4e5969; }
.cohort-total { font-size: 12px; color: #86909c; text-align: center; }
.cohort-cell { height: 24px; border-radius: 4px; }

@media (max-width: 1200px) { .widgets-grid { grid-template-columns: repeat(2, 1fr); } .widget-card.wide { grid-column: span 2; } }
@media (max-width: 768px) { 
  .widgets-grid { grid-template-columns: 1fr; gap: 12px; } 
  .widget-card.wide { grid-column: span 1; } 
  .widget-card { padding: 16px; }
  .widget-value .value { font-size: 24px; }
  .page-header h1 { font-size: 18px; }
  .page-header { gap: 12px; }
  .compare-text { display: none; }
  .filter-divider { display: none; }
  .cohort-header, .cohort-row { grid-template-columns: 80px 50px repeat(6, 1fr); }
  .cohort-date { font-size: 10px; }
  .cohort-week { font-size: 10px; }
}
@media (min-width: 1600px) {
  .widgets-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; }
  .widget-card.wide { grid-column: span 2; }
  .widget-value .value { font-size: 36px; }
  .page-header h1 { font-size: 26px; }
}
</style>
