export interface ProductInfo {
  id: number
  productCode: string
  productName: string
  category: string
  unit: string
  price: number
  stock: number
  createdAt: string
  updatedAt: string
}

export interface ProductListRequestData {
  pageNum?: number
  pageSize?: number
  productCode?: string
  productName?: string
  category?: string
}

export interface ProductListResponseData {
  records: ProductInfo[]
  total: number
  pageNum: number
  pageSize: number
}

export interface ProductSimpleInfo {
  id: number
  productCode: string
  productName: string
  price: number
}

export type ProductAddRequestData = {
  productCode: string
  productName: string
  category: string
  unit: string
  price: number
  stock: number
}

export type ProductUpdateRequestData = Partial<Omit<ProductAddRequestData, "productCode">> & { id: number }
