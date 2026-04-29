import type { MockMethod } from "vite-plugin-mock"
import { pagination, resultError, resultSuccess } from "./_utils"

/** 内存产品数据 */
const products: any[] = [
  {
    id: 1,
    productCode: "P001",
    productName: "产品A",
    category: "电子产品",
    unit: "个",
    price: 1000.0,
    stock: 100,
    createdAt: "2024-01-01 10:00:00",
    updatedAt: "2024-01-01 10:00:00"
  },
  {
    id: 2,
    productCode: "P002",
    productName: "产品B",
    category: "电子产品",
    unit: "个",
    price: 2000.0,
    stock: 80,
    createdAt: "2024-01-02 10:00:00",
    updatedAt: "2024-01-02 10:00:00"
  },
  {
    id: 3,
    productCode: "P003",
    productName: "产品C",
    category: "电子产品",
    unit: "个",
    price: 1500.0,
    stock: 50,
    createdAt: "2024-01-03 10:00:00",
    updatedAt: "2024-01-03 10:00:00"
  },
  {
    id: 4,
    productCode: "P004",
    productName: "产品D",
    category: "办公用品",
    unit: "箱",
    price: 500.0,
    stock: 200,
    createdAt: "2024-01-04 10:00:00",
    updatedAt: "2024-01-04 10:00:00"
  },
  {
    id: 5,
    productCode: "P005",
    productName: "产品E",
    category: "办公用品",
    unit: "箱",
    price: 800.0,
    stock: 150,
    createdAt: "2024-01-05 10:00:00",
    updatedAt: "2024-01-05 10:00:00"
  }
]

export default [
  // 5.1 获取产品分页列表
  {
    url: "/api/product/page",
    method: "get",
    response: (request: { query: { pageNum?: string, pageSize?: string, productCode?: string, productName?: string, category?: string } }) => {
      const { pageNum = "1", pageSize = "10", productCode, productName, category } = request.query
      let filteredList = [...products]
      if (productCode) {
        filteredList = filteredList.filter(p => p.productCode.includes(productCode))
      }
      if (productName) {
        filteredList = filteredList.filter(p => p.productName.includes(productName))
      }
      if (category) {
        filteredList = filteredList.filter(p => p.category === category)
      }
      return resultSuccess(pagination(Number(pageNum), Number(pageSize), filteredList))
    }
  },
  // 5.2 获取产品列表(不分页)
  {
    url: "/api/product/list",
    method: "get",
    response: () => {
      const list = products.map(p => ({
        id: p.id,
        productCode: p.productCode,
        productName: p.productName,
        price: p.price
      }))
      return resultSuccess(list)
    }
  },
  // 5.3 获取产品详情
  {
    url: "/api/product/detail/:id",
    method: "get",
    response: (request: { query: { id: string } }) => {
      const product = products.find(p => p.id === Number(request.query.id))
      if (product) {
        return resultSuccess(product)
      }
      return resultError("产品不存在", 404)
    }
  },
  // 5.4 新增产品
  {
    url: "/api/product/add",
    method: "post",
    response: (request: { body: Record<string, unknown> }) => {
      const newProduct = {
        id: products.length + 1,
        ...request.body,
        createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
        updatedAt: new Date().toISOString().replace("T", " ").slice(0, 19)
      }
      products.push(newProduct)
      return resultSuccess(newProduct)
    }
  },
  // 5.5 更新产品
  {
    url: "/api/product/update",
    method: "put",
    response: (request: { body: { id: number, [key: string]: unknown } }) => {
      const { id, ...updateData } = request.body
      const index = products.findIndex(p => p.id === id)
      if (index !== -1) {
        products[index] = { ...products[index], ...updateData, updatedAt: new Date().toISOString().replace("T", " ").slice(0, 19) }
        return resultSuccess(null)
      }
      return resultError("产品不存在", 404)
    }
  },
  // 5.6 删除产品
  {
    url: "/api/product/delete/:id",
    method: "delete",
    response: (request: { query: { id: string } }) => {
      const index = products.findIndex(p => p.id === Number(request.query.id))
      if (index !== -1) {
        products.splice(index, 1)
        return resultSuccess(null)
      }
      return resultError("产品不存在", 404)
    }
  }
] as MockMethod[]
