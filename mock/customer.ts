import type { MockMethod } from "vite-plugin-mock"
import { pagination, resultError, resultSuccess } from "./_utils"

/** 内存客户数据 */
const customers: any[] = [
  {
    id: 1,
    name: "华为技术有限公司",
    contact: "王先生",
    phone: "13800138001",
    email: "wang@huawei.com",
    address: "深圳市南山区",
    industry: "通信",
    level: 1,
    status: 1,
    ownerId: 1,
    createdAt: "2024-01-01 10:00:00",
    updatedAt: "2024-01-01 10:00:00"
  },
  {
    id: 2,
    name: "小米科技有限责任公司",
    contact: "李先生",
    phone: "13800138002",
    email: "li@xiaomi.com",
    address: "北京市海淀区",
    industry: "消费电子",
    level: 1,
    status: 1,
    ownerId: 1,
    createdAt: "2024-01-02 10:00:00",
    updatedAt: "2024-01-02 10:00:00"
  },
  {
    id: 3,
    name: "腾讯科技有限公司",
    contact: "马先生",
    phone: "13800138003",
    email: "ma@tencent.com",
    address: "深圳市南山区",
    industry: "互联网",
    level: 2,
    status: 1,
    ownerId: 2,
    createdAt: "2024-01-03 10:00:00",
    updatedAt: "2024-01-03 10:00:00"
  },
  {
    id: 4,
    name: "阿里巴巴集团",
    contact: "张先生",
    phone: "13800138004",
    email: "zhang@alibaba.com",
    address: "杭州市西湖区",
    industry: "互联网",
    level: 2,
    status: 1,
    ownerId: 2,
    createdAt: "2024-01-04 10:00:00",
    updatedAt: "2024-01-04 10:00:00"
  },
  {
    id: 5,
    name: "百度科技有限公司",
    contact: "李女士",
    phone: "13800138005",
    email: "li@baidu.com",
    address: "北京市海淀区",
    industry: "互联网",
    level: 3,
    status: 2,
    ownerId: 3,
    createdAt: "2024-01-05 10:00:00",
    updatedAt: "2024-01-05 10:00:00"
  }
]

export default [
  // 3.1 获取客户分页列表
  {
    url: "/api/customer/page",
    method: "get",
    response: (request: { query: { pageNum?: string, pageSize?: string, name?: string, industry?: string, level?: string, status?: string } }) => {
      const { pageNum = "1", pageSize = "10", name, industry, level, status } = request.query
      let filteredList = [...customers]
      if (name) {
        filteredList = filteredList.filter(c => c.name.includes(name))
      }
      if (industry) {
        filteredList = filteredList.filter(c => c.industry === industry)
      }
      if (level) {
        filteredList = filteredList.filter(c => c.level === Number(level))
      }
      if (status) {
        filteredList = filteredList.filter(c => c.status === Number(status))
      }
      return resultSuccess(pagination(Number(pageNum), Number(pageSize), filteredList))
    }
  },
  // 3.2 获取客户详情
  {
    url: "/api/customer/detail/:id",
    method: "get",
    response: (request: { query: { id: string } }) => {
      const customer = customers.find(c => c.id === Number(request.query.id))
      if (customer) {
        return resultSuccess(customer)
      }
      return resultError("客户不存在", 404)
    }
  },
  // 3.3 新增客户
  {
    url: "/api/customer/add",
    method: "post",
    response: (request: { body: Record<string, unknown> }) => {
      const newCustomer = {
        id: customers.length + 1,
        ...request.body,
        createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
        updatedAt: new Date().toISOString().replace("T", " ").slice(0, 19)
      }
      customers.push(newCustomer)
      return resultSuccess(newCustomer)
    }
  },
  // 3.4 更新客户
  {
    url: "/api/customer/update",
    method: "put",
    response: (request: { body: { id: number, [key: string]: unknown } }) => {
      const { id, ...updateData } = request.body
      const index = customers.findIndex(c => c.id === id)
      if (index !== -1) {
        customers[index] = { ...customers[index], ...updateData, updatedAt: new Date().toISOString().replace("T", " ").slice(0, 19) }
        return resultSuccess(null)
      }
      return resultError("客户不存在", 404)
    }
  },
  // 3.5 删除客户
  {
    url: "/api/customer/delete/:id",
    method: "delete",
    response: (request: { query: { id: string } }) => {
      const index = customers.findIndex(c => c.id === Number(request.query.id))
      if (index !== -1) {
        customers.splice(index, 1)
        return resultSuccess(null)
      }
      return resultError("客户不存在", 404)
    }
  }
] as MockMethod[]
