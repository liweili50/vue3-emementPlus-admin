import type * as Permission from "./type"
import type { ApiResponseData } from "types/api"
import { request } from "@/http/axios"

/** 获取权限列表 */
export function getPermissionListApi() {
  return request<ApiResponseData<Permission.PermissionInfo[]>>({
    url: `/api/permission/list`,
    method: "get"
  })
}

/** 新增权限 */
export function addPermissionApi(data: Permission.PermissionAddRequestData) {
  return request({
    url: `/api/permission/add`,
    method: "post",
    data
  })
}

/** 更新权限 */
export function updatePermissionApi(data: Permission.PermissionUpdateRequestData) {
  return request({
    url: `/api/permission/update`,
    method: "put",
    data
  })
}

/** 删除权限 */
export function deletePermissionApi(id: number) {
  return request({
    url: `/api/permission/delete/${id}`,
    method: "delete"
  })
}
