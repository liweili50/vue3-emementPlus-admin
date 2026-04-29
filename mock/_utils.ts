import type { MockMethod } from "vite-plugin-mock"

/** 成功响应 */
export function resultSuccess<T = unknown>(data: T, message = "success") {
  return {
    code: 200,
    message,
    data
  }
}

/** 错误响应 */
export function resultError(message = "错误描述", code = 400) {
  return {
    code,
    message,
    data: null
  }
}

/** 分页处理 */
export function pagination(pageNum = 1, pageSize = 10, list: unknown[]) {
  const start = (pageNum - 1) * pageSize
  const end = start + pageSize
  return {
    records: list.slice(start, end),
    total: list.length,
    pageNum,
    pageSize
  }
}

export type { MockMethod }
