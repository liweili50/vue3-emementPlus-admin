import type { MockMethod } from "vite-plugin-mock"
import { resultError, resultSuccess } from "./_utils"

/** 内存权限数据 */
const permissions: any[] = [
  {
    id: 1,
    permName: "客户管理",
    permCode: "customer:manage",
    url: "/customer",
    method: "GET",
    parentId: 0
  },
  {
    id: 2,
    permName: "客户新增",
    permCode: "customer:add",
    url: "/customer/add",
    method: "POST",
    parentId: 1
  },
  {
    id: 3,
    permName: "客户更新",
    permCode: "customer:update",
    url: "/customer/update",
    method: "PUT",
    parentId: 1
  },
  {
    id: 4,
    permName: "客户删除",
    permCode: "customer:delete",
    url: "/customer/delete",
    method: "DELETE",
    parentId: 1
  },
  {
    id: 5,
    permName: "订单管理",
    permCode: "order:manage",
    url: "/order",
    method: "GET",
    parentId: 0
  },
  {
    id: 6,
    permName: "订单新增",
    permCode: "order:add",
    url: "/order/add",
    method: "POST",
    parentId: 5
  },
  {
    id: 7,
    permName: "订单更新",
    permCode: "order:update",
    url: "/order/update",
    method: "PUT",
    parentId: 5
  },
  {
    id: 8,
    permName: "订单删除",
    permCode: "order:delete",
    url: "/order/delete",
    method: "DELETE",
    parentId: 5
  },
  {
    id: 9,
    permName: "订单审核",
    permCode: "order:audit",
    url: "/order/audit",
    method: "PUT",
    parentId: 5
  },
  {
    id: 10,
    permName: "产品管理",
    permCode: "product:manage",
    url: "/product",
    method: "GET",
    parentId: 0
  }
]

export default [
  // 7.1 获取权限列表
  {
    url: "/api/permission/list",
    method: "get",
    response: () => {
      return resultSuccess(permissions)
    }
  },
  // 7.2 新增权限
  {
    url: "/api/permission/add",
    method: "post",
    response: (request: { body: Record<string, unknown> }) => {
      const newPermission = {
        id: permissions.length + 1,
        ...request.body,
        createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
        updatedAt: new Date().toISOString().replace("T", " ").slice(0, 19)
      }
      permissions.push(newPermission)
      return resultSuccess(newPermission)
    }
  },
  // 7.3 更新权限
  {
    url: "/api/permission/update",
    method: "put",
    response: (request: { body: { id: number, [key: string]: unknown } }) => {
      const { id, ...updateData } = request.body
      const index = permissions.findIndex(p => p.id === id)
      if (index !== -1) {
        permissions[index] = { ...permissions[index], ...updateData, updatedAt: new Date().toISOString().replace("T", " ").slice(0, 19) }
        return resultSuccess(null)
      }
      return resultError("权限不存在", 404)
    }
  },
  // 7.4 删除权限
  {
    url: "/api/permission/delete/:id",
    method: "delete",
    response: (request: { query: { id: string } }) => {
      const index = permissions.findIndex(p => p.id === Number(request.query.id))
      if (index !== -1) {
        permissions.splice(index, 1)
        return resultSuccess(null)
      }
      return resultError("权限不存在", 404)
    }
  }
] as MockMethod[]
