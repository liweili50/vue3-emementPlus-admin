import type { MockMethod } from "vite-plugin-mock"
import { pagination, resultError, resultSuccess } from "./_utils"

/** 内存用户数据 */
const users: any[] = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    realName: "管理员",
    email: "admin@example.com",
    phone: "13800138000",
    roleId: 1,
    status: 1,
    createdAt: "2024-01-01 10:00:00",
    updatedAt: "2024-01-01 10:00:00"
  },
  {
    id: 2,
    username: "user001",
    password: "password123",
    realName: "张三",
    email: "zhangsan@example.com",
    phone: "13900139000",
    roleId: 2,
    status: 1,
    createdAt: "2024-01-02 10:00:00",
    updatedAt: "2024-01-02 10:00:00"
  },
  {
    id: 3,
    username: "user002",
    password: "password123",
    realName: "李四",
    email: "lisi@example.com",
    phone: "13900139001",
    roleId: 2,
    status: 1,
    createdAt: "2024-01-03 10:00:00",
    updatedAt: "2024-01-03 10:00:00"
  },
  {
    id: 4,
    username: "user003",
    password: "password123",
    realName: "王五",
    email: "wangwu@example.com",
    phone: "13900139002",
    roleId: 3,
    status: 0,
    createdAt: "2024-01-04 10:00:00",
    updatedAt: "2024-01-04 10:00:00"
  }
]

export default [
  // 2.1 用户登录
  {
    url: "/api/user/login",
    method: "post",
    response: (request: { body: { username: string, password: string } }) => {
      const { username, password } = request.body
      const user = users.find(u => u.username === username && u.password === password)
      if (user) {
        return resultSuccess({
          id: user.id,
          username: user.username,
          realName: user.realName,
          email: user.email,
          phone: user.phone,
          roleId: user.roleId,
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        })
      }
      return resultError("用户名或密码错误", 401)
    }
  },
  // 2.2 用户退出
  {
    url: "/api/user/logout",
    method: "post",
    response: () => {
      return resultSuccess(null)
    }
  },
  // 2.3 获取用户列表
  {
    url: "/api/user/list",
    method: "get",
    response: (request: { query: { pageNum?: string, pageSize?: string, username?: string, realName?: string } }) => {
      const { pageNum = "1", pageSize = "10", username, realName } = request.query
      let filteredList = [...users]
      if (username) {
        filteredList = filteredList.filter(u => u.username.includes(username))
      }
      if (realName) {
        filteredList = filteredList.filter(u => u.realName.includes(realName))
      }
      return resultSuccess(pagination(Number(pageNum), Number(pageSize), filteredList))
    }
  },
  // 2.4 获取用户详情
  {
    url: "/api/user/detail/:id",
    method: "get",
    response: (request: { query: { id: string } }) => {
      const user = users.find(u => u.id === Number(request.query.id))
      if (user) {
        return resultSuccess(user)
      }
      return resultError("用户不存在", 404)
    }
  },
  // 2.5 新增用户
  {
    url: "/api/user/add",
    method: "post",
    response: (request: { body: Record<string, unknown> }) => {
      const newUser = {
        id: users.length + 1,
        ...request.body,
        createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
        updatedAt: new Date().toISOString().replace("T", " ").slice(0, 19)
      }
      users.push(newUser)
      return resultSuccess(newUser)
    }
  },
  // 2.6 更新用户
  {
    url: "/api/user/update",
    method: "put",
    response: (request: { body: { id: number, [key: string]: unknown } }) => {
      const { id, ...updateData } = request.body
      const index = users.findIndex(u => u.id === id)
      if (index !== -1) {
        users[index] = { ...users[index], ...updateData, updatedAt: new Date().toISOString().replace("T", " ").slice(0, 19) }
        return resultSuccess(null)
      }
      return resultError("用户不存在", 404)
    }
  },
  // 2.7 删除用户
  {
    url: "/api/user/delete/:id",
    method: "delete",
    response: (request: { query: { id: string } }) => {
      const index = users.findIndex(u => u.id === Number(request.query.id))
      if (index !== -1) {
        users.splice(index, 1)
        return resultSuccess(null)
      }
      return resultError("用户不存在", 404)
    }
  }
] as MockMethod[]
