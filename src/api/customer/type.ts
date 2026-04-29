export interface CustomerInfo {
  id: number
  name: string
  contact: string
  phone: string
  email: string
  address: string
  industry: string
  level: number
  status: number
  ownerId: number
  createdAt: string
  updatedAt: string
}

export interface CustomerListRequestData {
  pageNum?: number
  pageSize?: number
  name?: string
  industry?: string
  level?: number
  status?: number
}

export interface CustomerListResponseData {
  records: CustomerInfo[]
  total: number
  pageNum: number
  pageSize: number
}

export type CustomerAddRequestData = {
  name: string
  contact: string
  phone: string
  email: string
  address: string
  industry: string
  level: number
  status: number
  ownerId: number
}

export type CustomerUpdateRequestData = Partial<Omit<CustomerAddRequestData, "name">> & { id: number }
