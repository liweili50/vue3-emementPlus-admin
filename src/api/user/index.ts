import type * as User from "./type"
import type { ApiResponseData } from "types/api"
import { API_PREFIX } from "@/api/utils/config"
import { request } from "@/http/axios"

/** 用户登录 */
export function loginApi(data: User.UserLoginRequestData) {
  return request<ApiResponseData<User.UserLoginResponseData>>({
    url: `${API_PREFIX}/user/login`,
    method: "post",
    data
  })
}

/** 用户退出 */
export function logoutApi() {
  return request({
    url: `${API_PREFIX}/user/logout`,
    method: "post"
  })
}

/** 获取用户列表 */
export function getUserListApi(params: User.UserListRequestData) {
  return request<ApiResponseData<User.UserListResponseData>>({
    url: `${API_PREFIX}/user/list`,
    method: "get",
    params
  })
}

/** 获取用户详情 */
export function getUserDetailApi(id: number) {
  return request<ApiResponseData<User.UserInfo>>({
    url: `${API_PREFIX}/user/detail/${id}`,
    method: "get"
  })
}

/** 新增用户 */
export function addUserApi(data: User.UserAddRequestData) {
  return request({
    url: `${API_PREFIX}/user/add`,
    method: "post",
    data
  })
}

/** 更新用户 */
export function updateUserApi(data: User.UserUpdateRequestData) {
  return request({
    url: `${API_PREFIX}/user/update`,
    method: "put",
    data
  })
}

/** 删除用户 */
export function deleteUserApi(id: number) {
  return request({
    url: `${API_PREFIX}/user/delete/${id}`,
    method: "delete"
  })
}
