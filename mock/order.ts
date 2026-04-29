import type { MockMethod } from "vite-plugin-mock"
import { pagination, resultError, resultSuccess } from "./_utils"

/** 内存订单数据 */
const orders: any[] = [
  {
    id: 1,
    orderNo: "SO202401010001",
    customerId: 1,
    customerName: "华为技术有限公司",
    productId: 1,
    productName: "产品A",
    quantity: 10,
    totalAmount: 10000.0,
    status: 2,
    remark: "无",
    createdAt: "2024-01-01 10:00:00",
    updatedAt: "2024-01-01 10:00:00"
  },
  {
    id: 2,
    orderNo: "SO202401020001",
    customerId: 1,
    customerName: "华为技术有限公司",
    productId: 1,
    productName: "产品A",
    quantity: 20,
    totalAmount: 20000.0,
    status: 1,
    remark: "加急订单",
    createdAt: "2024-01-02 10:00:00",
    updatedAt: "2024-01-02 10:00:00"
  },
  {
    id: 3,
    orderNo: "SO202401030001",
    customerId: 2,
    customerName: "小米科技有限责任公司",
    productId: 2,
    productName: "产品B",
    quantity: 15,
    totalAmount: 30000.0,
    status: 2,
    remark: "无",
    createdAt: "2024-01-03 10:00:00",
    updatedAt: "2024-01-03 10:00:00"
  },
  {
    id: 4,
    orderNo: "SO202401040001",
    customerId: 3,
    customerName: "腾讯科技有限公司",
    productId: 3,
    productName: "产品C",
    quantity: 5,
    totalAmount: 7500.0,
    status: 3,
    remark: "已完成",
    createdAt: "2024-01-04 10:00:00",
    updatedAt: "2024-01-04 10:00:00"
  },
  {
    id: 5,
    orderNo: "SO202401050001",
    customerId: 4,
    customerName: "阿里巴巴集团",
    productId: 1,
    productName: "产品A",
    quantity: 30,
    totalAmount: 30000.0,
    status: 1,
    remark: "大客户订单",
    createdAt: "2024-01-05 10:00:00",
    updatedAt: "2024-01-05 10:00:00"
  }
]

export default [
  // 4.1 获取订单分页列表
  {
    url: "/api/order/page",
    method: "get",
    response: (request: { query: { pageNum?: string, pageSize?: string, orderNo?: string, customerId?: string, status?: string } }) => {
      const { pageNum = "1", pageSize = "10", orderNo, customerId, status } = request.query
      let filteredList = [...orders]
      if (orderNo) {
        filteredList = filteredList.filter(o => o.orderNo.includes(orderNo))
      }
      if (customerId) {
        filteredList = filteredList.filter(o => o.customerId === Number(customerId))
      }
      if (status) {
        filteredList = filteredList.filter(o => o.status === Number(status))
      }
      return resultSuccess(pagination(Number(pageNum), Number(pageSize), filteredList))
    }
  },
  // 4.2 获取订单详情
  {
    url: "/api/order/detail/:id",
    method: "get",
    response: (request: { query: { id: string } }) => {
      const order = orders.find(o => o.id === Number(request.query.id))
      if (order) {
        return resultSuccess(order)
      }
      return resultError("订单不存在", 404)
    }
  },
  // 4.3 新增订单
  {
    url: "/api/order/add",
    method: "post",
    response: (request: { body: { customerId: number, productId: number, quantity: number, remark?: string } }) => {
      const { customerId, productId, quantity, remark } = request.body
      const customer = { name: "华为技术有限公司" }
      const product = { productName: "产品A", price: 1000.0 }
      const newOrder = {
        id: orders.length + 1,
        orderNo: `SO${new Date().toISOString().slice(0, 10).replace(/-/g, "")}${String(orders.length + 1).padStart(4, "0")}`,
        customerId,
        customerName: customer.name,
        productId,
        productName: product.productName,
        quantity,
        totalAmount: quantity * product.price,
        status: 1,
        remark: remark || "无",
        createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
        updatedAt: new Date().toISOString().replace("T", " ").slice(0, 19)
      }
      orders.push(newOrder)
      return resultSuccess(newOrder)
    }
  },
  // 4.4 更新订单
  {
    url: "/api/order/update",
    method: "put",
    response: (request: { body: { id: number, quantity?: number, remark?: string } }) => {
      const { id, ...updateData } = request.body
      const index = orders.findIndex(o => o.id === id)
      if (index !== -1) {
        orders[index] = { ...orders[index], ...updateData, updatedAt: new Date().toISOString().replace("T", " ").slice(0, 19) }
        return resultSuccess(null)
      }
      return resultError("订单不存在", 404)
    }
  },
  // 4.5 删除订单
  {
    url: "/api/order/delete/:id",
    method: "delete",
    response: (request: { query: { id: string } }) => {
      const index = orders.findIndex(o => o.id === Number(request.query.id))
      if (index !== -1) {
        orders.splice(index, 1)
        return resultSuccess(null)
      }
      return resultError("订单不存在", 404)
    }
  },
  // 4.6 订单审核
  {
    url: "/api/order/audit/:id",
    method: "put",
    response: (request: { query: { id: string } }) => {
      const index = orders.findIndex(o => o.id === Number(request.query.id))
      if (index !== -1) {
        orders[index].status = 2
        orders[index].updatedAt = new Date().toISOString().replace("T", " ").slice(0, 19)
        return resultSuccess(null)
      }
      return resultError("订单不存在", 404)
    }
  }
] as MockMethod[]
