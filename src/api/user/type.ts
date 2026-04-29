import type { ApiResponseData } from "types/api"

export interface UserLoginRequestData {
  username: string
  password: string
}

export interface UserLoginResponseData {
  id: number
  username: string
  realName: string
  email: string
  phone: string
  roleId: number
  token: string
}

export interface UserInfo {
  id: number
  username: string
  realName: string
  email: string
  phone: string
  roleId: number
  status: number
  createdAt: string
  updatedAt: string
}

export interface UserListRequestData {
  pageNum?: number
  pageSize?: number
  username?: string
  realName?: string
}

export interface UserListResponseData {
  records: UserInfo[]
  total: number
  pageNum: number
  pageSize: number
}

export type UserDetailResponseData = ApiResponseData<UserInfo>

export interface UserAddRequestData {
  username: string
  password: string
  realName: string
  email: string
  phone: string
  roleId: number
  status: number
}

export type UserUpdateRequestData = Partial<Omit<UserAddRequestData, "password">> & { id: number }
