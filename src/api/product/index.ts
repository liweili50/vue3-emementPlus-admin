import type * as Product from "./type"
import type { ApiResponseData } from "types/api"
import { request } from "@/http/axios"

/** 获取产品分页列表 */
export function getProductPageApi(params: Product.ProductListRequestData) {
  return request<ApiResponseData<Product.ProductListResponseData>>({
    url: `/api/product/page`,
    method: "get",
    params
  })
}

/** 获取产品列表(不分页) */
export function getProductListApi() {
  return request<ApiResponseData<Product.ProductSimpleInfo[]>>({
    url: `/api/product/list`,
    method: "get"
  })
}

/** 获取产品详情 */
export function getProductDetailApi(id: number) {
  return request<ApiResponseData<Product.ProductInfo>>({
    url: `/api/product/detail/${id}`,
    method: "get"
  })
}

/** 新增产品 */
export function addProductApi(data: Product.ProductAddRequestData) {
  return request({
    url: `/api/product/add`,
    method: "post",
    data
  })
}

/** 更新产品 */
export function updateProductApi(data: Product.ProductUpdateRequestData) {
  return request({
    url: `/api/product/update`,
    method: "put",
    data
  })
}

/** 删除产品 */
export function deleteProductApi(id: number) {
  return request({
    url: `/api/product/delete/${id}`,
    method: "delete"
  })
}
