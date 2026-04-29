import type * as Analysis from "./type"
import { API_PREFIX } from "@/api/utils/config"
import { request } from "@/http/axios"

/** 获取仪表盘数据 */
export function getDashboardApi() {
  return request<Analysis.DashboardData>({
    url: `${API_PREFIX}/analysis/dashboard`,
    method: "get"
  })
}

/** 获取销售趋势 */
export function getSalesTrendApi() {
  return request<Analysis.SalesTrendData>({
    url: `${API_PREFIX}/analysis/sales-trend`,
    method: "get"
  })
}

/** 获取客户统计 */
export function getCustomerStatApi() {
  return request<Analysis.CustomerStatData>({
    url: `${API_PREFIX}/analysis/customer-stat`,
    method: "get"
  })
}

/** 获取订单统计 */
export function getOrderStatApi() {
  return request<Analysis.OrderStatData>({
    url: `${API_PREFIX}/analysis/order-stat`,
    method: "get"
  })
}
