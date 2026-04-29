import type { MockMethod } from "vite-plugin-mock"
import { pagination, resultError, resultSuccess } from "./_utils"

/** 内存角色数据 */
const roles: any[] = [
  {
    id: 1,
    roleName: "管理员",
    roleCode: "ADMIN",
    description: "系统管理员",
    status: 1,
    createdAt: "2024-01-01 10:00:00",
    updatedAt: "2024-01-01 10:00:00"
  },
  {
    id: 2,
    roleName: "普通用户",
    roleCode: "USER",
    description: "普通用户",
    status: 1,
    createdAt: "2024-01-02 10:00:00",
    updatedAt: "2024-01-02 10:00:00"
  },
  {
    id: 3,
    roleName: "销售主管",
    roleCode: "SALES_MANAGER",
    description: "销售部门主管",
    status: 1,
    createdAt: "2024-01-03 10:00:00",
    updatedAt: "2024-01-03 10:00:00"
  }
]

export default [
  // 6.1 获取角色分页列表
  {
    url: "/api/role/page",
    method: "get",
    response: (request: { query: { pageNum?: string, pageSize?: string, roleName?: string, roleCode?: string } }) => {
      const { pageNum = "1", pageSize = "10", roleName, roleCode } = request.query
      let filteredList = [...roles]
      if (roleName) {
        filteredList = filteredList.filter(r => r.roleName.includes(roleName))
      }
      if (roleCode) {
        filteredList = filteredList.filter(r => r.roleCode.includes(roleCode))
      }
      return resultSuccess(pagination(Number(pageNum), Number(pageSize), filteredList))
    }
  },
  // 6.2 获取角色列表(不分页)
  {
    url: "/api/role/list",
    method: "get",
    response: () => {
      const list = roles.map(r => ({
        id: r.id,
        roleName: r.roleName,
        roleCode: r.roleCode
      }))
      return resultSuccess(list)
    }
  },
  // 6.3 新增角色
  {
    url: "/api/role/add",
    method: "post",
    response: (request: { body: Record<string, unknown> }) => {
      const newRole = {
        id: roles.length + 1,
        ...request.body,
        createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
        updatedAt: new Date().toISOString().replace("T", " ").slice(0, 19)
      }
      roles.push(newRole)
      return resultSuccess(newRole)
    }
  },
  // 6.4 更新角色
  {
    url: "/api/role/update",
    method: "put",
    response: (request: { body: { id: number, [key: string]: unknown } }) => {
      const { id, ...updateData } = request.body
      const index = roles.findIndex(r => r.id === id)
      if (index !== -1) {
        roles[index] = { ...roles[index], ...updateData, updatedAt: new Date().toISOString().replace("T", " ").slice(0, 19) }
        return resultSuccess(null)
      }
      return resultError("角色不存在", 404)
    }
  },
  // 6.5 删除角色
  {
    url: "/api/role/delete/:id",
    method: "delete",
    response: (request: { query: { id: string } }) => {
      const index = roles.findIndex(r => r.id === Number(request.query.id))
      if (index !== -1) {
        roles.splice(index, 1)
        return resultSuccess(null)
      }
      return resultError("角色不存在", 404)
    }
  },
  // 6.6 分配权限
  {
    url: "/api/role/assign/:roleId",
    method: "post",
    response: (request: { query: { roleId: string }, body: { permissionIds: number[] } }) => {
      const roleId = Number(request.query.roleId)
      const { permissionIds } = request.body
      const role = roles.find(r => r.id === roleId)
      if (role) {
        // 这里只是模拟，实际应该存储权限分配关系
        console.log(`角色 ${roleId} 分配权限:`, permissionIds)
        return resultSuccess(null)
      }
      return resultError("角色不存在", 404)
    }
  }
] as MockMethod[]
