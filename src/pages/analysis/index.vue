<script lang="ts" setup>
import type { CustomerStatData, DashboardData, OrderStatData, SalesTrendData } from "@/api/analysis/type"
import { getCustomerStatApi, getDashboardApi, getOrderStatApi, getSalesTrendApi } from "@/api/analysis"

defineOptions({
  name: "Analysis"
})

const loading = ref<boolean>(false)

// #region 仪表盘数据
const dashboardData = ref<DashboardData>({
  customerCount: 0,
  orderCount: 0,
  totalAmount: 0,
  conversionRate: 0
})

// #endregion

// #region 销售趋势
const salesTrendData = ref<SalesTrendData>({
  labels: [],
  data: []
})

// #endregion

// #region 客户统计
const customerStat = ref<CustomerStatData>({
  levelStat: [],
  statusStat: [],
  industryStat: []
})

// #endregion

// #region 订单统计
const orderStat = ref<OrderStatData>({
  statusStat: [],
  monthAmount: []
})

// #endregion

function getData() {
  loading.value = true
  Promise.all([
    getDashboardApi(),
    getSalesTrendApi(),
    getCustomerStatApi(),
    getOrderStatApi()
  ]).then(([dashboardRes, salesTrendRes, customerStatRes, orderStatRes]) => {
    dashboardData.value = dashboardRes.data
    salesTrendData.value = salesTrendRes.data
    customerStat.value = customerStatRes.data
    orderStat.value = orderStatRes.data
  }).finally(() => {
    loading.value = false
  })
}

getData()
</script>

<template>
  <div v-loading="loading" class="app-container">
    <!-- 仪表盘 -->
    <el-row :gutter="20" class="mb-20">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-card">
            <div class="stat-icon" style="background-color: #409eff">
              <el-icon :size="32">
                <User />
              </el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-title">
                客户总数
              </div>
              <div class="stat-value">
                {{ dashboardData.customerCount }}
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-card">
            <div class="stat-icon" style="background-color: #67c23a">
              <el-icon :size="32">
                <Document />
              </el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-title">
                订单总数
              </div>
              <div class="stat-value">
                {{ dashboardData.orderCount }}
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-card">
            <div class="stat-icon" style="background-color: #e6a23c">
              <el-icon :size="32">
                <Money />
              </el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-title">
                销售总额
              </div>
              <div class="stat-value">
                ¥{{ dashboardData.totalAmount.toFixed(2) }}
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-card">
            <div class="stat-icon" style="background-color: #f56c6c">
              <el-icon :size="32">
                <TrendCharts />
              </el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-title">
                转化率
              </div>
              <div class="stat-value">
                {{ dashboardData.conversionRate }}%
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 销售趋势 -->
    <el-card shadow="never" class="mb-20">
      <template #header>
        <span>销售趋势</span>
      </template>
      <div class="chart-placeholder">
        <div class="trend-chart">
          <div class="trend-labels">
            <span v-for="label in salesTrendData.labels" :key="label">{{ label }}</span>
          </div>
          <div class="trend-bars">
            <div
              v-for="(value, index) in salesTrendData.data"
              :key="index"
              class="trend-bar"
              :style="{ height: `${(value / Math.max(...salesTrendData.data)) * 200}px` }"
            >
              <span class="bar-value">{{ value }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <el-row :gutter="20">
      <!-- 客户统计 -->
      <el-col :span="12">
        <el-card shadow="never" class="mb-20">
          <template #header>
            <span>客户级别统计</span>
          </template>
          <div class="stat-list">
            <div v-for="item in customerStat.levelStat" :key="item.name" class="stat-item">
              <span class="stat-label">{{ item.name }}</span>
              <el-progress :percentage="(item.value / customerStat.levelStat.reduce((a, b) => a + b.value, 0)) * 100" />
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 订单状态统计 -->
      <el-col :span="12">
        <el-card shadow="never" class="mb-20">
          <template #header>
            <span>订单状态统计</span>
          </template>
          <div class="stat-list">
            <div v-for="item in orderStat.statusStat" :key="item.name" class="stat-item">
              <span class="stat-label">{{ item.name }}</span>
              <el-progress :percentage="(item.value / orderStat.statusStat.reduce((a, b) => a + b.value, 0)) * 100" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 8px;
  color: #fff;
}

.stat-content {
  flex: 1;
}

.stat-title {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

.chart-placeholder {
  padding: 20px 0;
}

.trend-chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.trend-labels {
  display: flex;
  justify-content: space-around;
  color: #909399;
  font-size: 12px;
}

.trend-bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 220px;
  gap: 8px;
}

.trend-bar {
  flex: 1;
  background: linear-gradient(180deg, #409eff 0%, #79bbff 100%);
  border-radius: 4px 4px 0 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8px;
  min-height: 20px;
}

.bar-value {
  color: #fff;
  font-size: 12px;
  font-weight: bold;
}

.stat-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-label {
  min-width: 80px;
  font-size: 14px;
  color: #606266;
}
</style>
