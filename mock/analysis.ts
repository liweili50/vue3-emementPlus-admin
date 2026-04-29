import type { MockMethod } from "vite-plugin-mock"
import { resultSuccess } from "./_utils"

export default [
  // 8.1 获取仪表盘数据
  {
    url: "/api/analysis/dashboard",
    method: "get",
    response: () => {
      return resultSuccess({
        customerCount: 100,
        orderCount: 50,
        totalAmount: 1000000.0,
        conversionRate: 35.5
      })
    }
  },
  // 8.2 获取销售趋势
  {
    url: "/api/analysis/sales-trend",
    method: "get",
    response: () => {
      return resultSuccess({
        labels: ["04-18", "04-19", "04-20", "04-21", "04-22", "04-23", "04-24"],
        data: [12000, 15000, 18000, 14000, 20000, 16000, 19000]
      })
    }
  },
  // 8.3 获取客户统计
  {
    url: "/api/analysis/customer-stat",
    method: "get",
    response: () => {
      return resultSuccess({
        levelStat: [
          { name: "VIP客户", value: 20 },
          { name: "重要客户", value: 30 },
          { name: "普通客户", value: 50 }
        ],
        statusStat: [
          { name: "活跃客户", value: 80 },
          { name: "休眠客户", value: 20 }
        ],
        industryStat: [
          { name: "通信", value: 30 },
          { name: "消费电子", value: 25 },
          { name: "金融", value: 20 },
          { name: "其他", value: 25 }
        ]
      })
    }
  },
  // 8.4 获取订单统计
  {
    url: "/api/analysis/order-stat",
    method: "get",
    response: () => {
      return resultSuccess({
        statusStat: [
          { name: "待审核", value: 10 },
          { name: "已审核", value: 20 },
          { name: "已完成", value: 15 },
          { name: "已取消", value: 5 }
        ],
        monthAmount: [
          { month: "1月", amount: 200000 },
          { month: "2月", amount: 250000 },
          { month: "3月", amount: 300000 },
          { month: "4月", amount: 250000 }
        ]
      })
    }
  }
] as MockMethod[]
