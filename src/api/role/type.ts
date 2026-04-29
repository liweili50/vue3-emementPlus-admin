export interface RoleInfo {
  id: number
  roleName: string
  roleCode: string
  description: string
  status: number
  createdAt: string
  updatedAt: string
}

export interface RoleListRequestData {
  pageNum?: number
  pageSize?: number
  roleName?: string
  roleCode?: string
}

export interface RoleListResponseData {
  records: RoleInfo[]
  total: number
  pageNum: number
  pageSize: number
}

export interface RoleSimpleInfo {
  id: number
  roleName: string
  roleCode: string
}

export type RoleAddRequestData = {
  roleName: string
  roleCode: string
  description: string
  status: number
}

export type RoleUpdateRequestData = Partial<Omit<RoleAddRequestData, "roleName">> & { id: number }

export interface RoleAssignPermissionRequestData {
  permissionIds: number[]
}
