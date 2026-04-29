import type * as User from "./type"
import type { ApiResponseData } from "types/api"
import { request } from "@/http/axios"

/** 用户登录 */
export function loginApi(data: User.UserLoginRequestData) {
  return request<ApiResponseData<User.UserLoginResponseData>>({
    url: `/api/user/login`,
    method: "post",
    data
  })
}

/** 用户退出 */
export function logoutApi() {
  return request({
    url: `/api/user/logout`,
    method: "post"
  })
}

/** 获取用户列表 */
export function getUserListApi(params: User.UserListRequestData) {
  return request<ApiResponseData<User.UserListResponseData>>({
    url: `/api/user/list`,
    method: "get",
    params
  })
}

/** 获取用户详情 */
export function getUserDetailApi(id: number) {
  return request<ApiResponseData<User.UserInfo>>({
    url: `/api/user/detail/${id}`,
    method: "get"
  })
}

/** 新增用户 */
export function addUserApi(data: User.UserAddRequestData) {
  return request({
    url: `/api/user/add`,
    method: "post",
    data
  })
}

/** 更新用户 */
export function updateUserApi(data: User.UserUpdateRequestData) {
  return request({
    url: `/api/user/update`,
    method: "put",
    data
  })
}

/** 删除用户 */
export function deleteUserApi(id: number) {
  return request({
    url: `/api/user/delete/${id}`,
    method: "delete"
  })
}
