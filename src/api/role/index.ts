import type * as Role from "./type"
import type { ApiResponseData } from "types/api"
import { API_PREFIX } from "@/api/utils/config"
import { request } from "@/http/axios"

/** 获取角色分页列表 */
export function getRolePageApi(params: Role.RoleListRequestData) {
  return request<ApiResponseData<Role.RoleListResponseData>>({
    url: `${API_PREFIX}/role/page`,
    method: "get",
    params
  })
}

/** 获取角色列表(不分页) */
export function getRoleListApi() {
  return request<ApiResponseData<Role.RoleSimpleInfo[]>>({
    url: `${API_PREFIX}/role/list`,
    method: "get"
  })
}

/** 新增角色 */
export function addRoleApi(data: Role.RoleAddRequestData) {
  return request({
    url: `${API_PREFIX}/role/add`,
    method: "post",
    data
  })
}

/** 更新角色 */
export function updateRoleApi(data: Role.RoleUpdateRequestData) {
  return request({
    url: `${API_PREFIX}/role/update`,
    method: "put",
    data
  })
}

/** 删除角色 */
export function deleteRoleApi(id: number) {
  return request({
    url: `${API_PREFIX}/role/delete/${id}`,
    method: "delete"
  })
}

/** 分配权限 */
export function assignRolePermissionApi(roleId: number, data: Role.RoleAssignPermissionRequestData) {
  return request({
    url: `${API_PREFIX}/role/assign/${roleId}`,
    method: "post",
    data
  })
}
