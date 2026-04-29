import type * as Analysis from "./type"
import { request } from "@/http/axios"

/** 获取仪表盘数据 */
export function getDashboardApi() {
  return request<Analysis.DashboardData>({
    url: `/api/analysis/dashboard`,
    method: "get"
  })
}

/** 获取销售趋势 */
export function getSalesTrendApi() {
  return request<Analysis.SalesTrendData>({
    url: `/api/analysis/sales-trend`,
    method: "get"
  })
}

/** 获取客户统计 */
export function getCustomerStatApi() {
  return request<Analysis.CustomerStatData>({
    url: `/api/analysis/customer-stat`,
    method: "get"
  })
}

/** 获取订单统计 */
export function getOrderStatApi() {
  return request<Analysis.OrderStatData>({
    url: `/api/analysis/order-stat`,
    method: "get"
  })
}
