export interface PermissionInfo {
  id: number
  permName: string
  permCode: string
  url: string
  method: string
  parentId: number
}

export type PermissionAddRequestData = {
  permName: string
  permCode: string
  url: string
  method: string
  parentId: number
}

export type PermissionUpdateRequestData = Partial<Omit<PermissionAddRequestData, "permName">> & { id: number }
