export interface OrderInfo {
  id: number
  orderNo: string
  customerId: number
  customerName: string
  productId: number
  productName: string
  quantity: number
  totalAmount: number
  status: number
  remark: string
  createdAt: string
  updatedAt: string
}

export interface OrderListRequestData {
  pageNum?: number
  pageSize?: number
  orderNo?: string
  customerId?: number
  status?: number
}

export interface OrderListResponseData {
  records: OrderInfo[]
  total: number
  pageNum: number
  pageSize: number
}

export type OrderAddRequestData = {
  customerId: number
  productId: number
  quantity: number
  remark?: string
}

export type OrderUpdateRequestData = Partial<Omit<OrderAddRequestData, "customerId">> & { id: number }
