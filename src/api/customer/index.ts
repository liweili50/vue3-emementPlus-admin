import type * as Customer from "./type"
import type { ApiResponseData } from "types/api"
import { API_PREFIX } from "@/api/utils/config"
import { request } from "@/http/axios"

/** 获取客户分页列表 */
export function getCustomerPageApi(params: Customer.CustomerListRequestData) {
  return request<ApiResponseData<Customer.CustomerListResponseData>>({
    url: `${API_PREFIX}/customer/page`,
    method: "get",
    params
  })
}

/** 获取客户详情 */
export function getCustomerDetailApi(id: number) {
  return request<ApiResponseData<Customer.CustomerInfo>>({
    url: `${API_PREFIX}/customer/detail/${id}`,
    method: "get"
  })
}

/** 新增客户 */
export function addCustomerApi(data: Customer.CustomerAddRequestData) {
  return request({
    url: `${API_PREFIX}/customer/add`,
    method: "post",
    data
  })
}

/** 更新客户 */
export function updateCustomerApi(data: Customer.CustomerUpdateRequestData) {
  return request({
    url: `${API_PREFIX}/customer/update`,
    method: "put",
    data
  })
}

/** 删除客户 */
export function deleteCustomerApi(id: number) {
  return request({
    url: `${API_PREFIX}/customer/delete/${id}`,
    method: "delete"
  })
}
