import type * as Product from "./type"
import type { ApiResponseData } from "types/api"
import { API_PREFIX } from "@/api/utils/config"
import { request } from "@/http/axios"

/** 获取产品分页列表 */
export function getProductPageApi(params: Product.ProductListRequestData) {
  return request<ApiResponseData<Product.ProductListResponseData>>({
    url: `${API_PREFIX}/product/page`,
    method: "get",
    params
  })
}

/** 获取产品列表(不分页) */
export function getProductListApi() {
  return request<ApiResponseData<Product.ProductSimpleInfo[]>>({
    url: `${API_PREFIX}/product/list`,
    method: "get"
  })
}

/** 获取产品详情 */
export function getProductDetailApi(id: number) {
  return request<ApiResponseData<Product.ProductInfo>>({
    url: `${API_PREFIX}/product/detail/${id}`,
    method: "get"
  })
}

/** 新增产品 */
export function addProductApi(data: Product.ProductAddRequestData) {
  return request({
    url: `${API_PREFIX}/product/add`,
    method: "post",
    data
  })
}

/** 更新产品 */
export function updateProductApi(data: Product.ProductUpdateRequestData) {
  return request({
    url: `${API_PREFIX}/product/update`,
    method: "put",
    data
  })
}

/** 删除产品 */
export function deleteProductApi(id: number) {
  return request({
    url: `${API_PREFIX}/product/delete/${id}`,
    method: "delete"
  })
}
