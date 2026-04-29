import type * as Order from "./type"
import type { ApiResponseData } from "types/api"
import { request } from "@/http/axios"

/** 获取订单分页列表 */
export function getOrderPageApi(params: Order.OrderListRequestData) {
  return request<ApiResponseData<Order.OrderListResponseData>>({
    url: `/api/order/page`,
    method: "get",
    params
  })
}

/** 获取订单详情 */
export function getOrderDetailApi(id: number) {
  return request<ApiResponseData<Order.OrderInfo>>({
    url: `/api/order/detail/${id}`,
    method: "get"
  })
}

/** 新增订单 */
export function addOrderApi(data: Order.OrderAddRequestData) {
  return request({
    url: `/api/order/add`,
    method: "post",
    data
  })
}

/** 更新订单 */
export function updateOrderApi(data: Order.OrderUpdateRequestData) {
  return request({
    url: `/api/order/update`,
    method: "put",
    data
  })
}

/** 删除订单 */
export function deleteOrderApi(id: number) {
  return request({
    url: `/api/order/delete/${id}`,
    method: "delete"
  })
}

/** 订单审核 */
export function auditOrderApi(id: number) {
  return request({
    url: `/api/order/audit/${id}`,
    method: "put"
  })
}
