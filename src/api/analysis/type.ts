export interface DashboardData {
  customerCount: number
  orderCount: number
  totalAmount: number
  conversionRate: number
}

export interface SalesTrendData {
  labels: string[]
  data: number[]
}

export interface CustomerStatData {
  levelStat: { name: string, value: number }[]
  statusStat: { name: string, value: number }[]
  industryStat: { name: string, value: number }[]
}

export interface OrderStatData {
  statusStat: { name: string, value: number }[]
  monthAmount: { month: string, amount: number }[]
}
