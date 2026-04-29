<script lang="ts" setup>
import type { FormRules } from "element-plus"
import type { RoleAddRequestData, RoleInfo, RoleUpdateRequestData } from "@/api/role/type"
import { usePagination } from "@@/composables/usePagination"
import { CirclePlus, Delete, Refresh, RefreshRight, Search, Setting } from "@element-plus/icons-vue"
import { cloneDeep } from "lodash-es"
import { addRoleApi, deleteRoleApi, getRolePageApi, updateRoleApi } from "@/api/role"

defineOptions({
  name: "RoleManagement"
})

const loading = ref<boolean>(false)

const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

// #region 增
const DEFAULT_FORM_DATA: RoleAddRequestData = {
  roleName: "",
  roleCode: "",
  description: "",
  status: 1
}

const dialogVisible = ref<boolean>(false)

const formRef = useTemplateRef("formRef")

const formData = ref<RoleAddRequestData | RoleUpdateRequestData>(cloneDeep(DEFAULT_FORM_DATA))

const formRules: FormRules = {
  roleName: [{ required: true, trigger: "blur", message: "请输入角色名称" }],
  roleCode: [{ required: true, trigger: "blur", message: "请输入角色编码" }]
}

function handleCreateOrUpdate() {
  formRef.value?.validate((valid) => {
    if (!valid) {
      ElMessage.error("表单校验不通过")
      return
    }
    loading.value = true
    const api = "id" in formData.value ? updateRoleApi : addRoleApi
    api(formData.value).then(() => {
      ElMessage.success("操作成功")
      dialogVisible.value = false
      getTableData()
    }).finally(() => {
      loading.value = false
    })
  })
}

function resetForm() {
  formRef.value?.clearValidate()
  formData.value = cloneDeep(DEFAULT_FORM_DATA)
}
// #endregion

// #region 删
function handleDelete(row: RoleInfo) {
  ElMessageBox.confirm(`正在删除角色：${row.roleName}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteRoleApi(row.id).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
// #endregion

// #region 改
function handleUpdate(row: RoleInfo) {
  dialogVisible.value = true
  formData.value = { ...row }
}
// #endregion

// #region 查
const tableData = ref<RoleInfo[]>([])

const searchFormRef = useTemplateRef("searchFormRef")

const searchData = reactive({
  roleName: "",
  roleCode: ""
})

function getTableData() {
  loading.value = true
  getRolePageApi({
    pageNum: paginationData.currentPage,
    pageSize: paginationData.pageSize,
    roleName: searchData.roleName,
    roleCode: searchData.roleCode
  }).then(({ data }) => {
    paginationData.total = data.total
    tableData.value = data.records
  }).catch(() => {
    tableData.value = []
  }).finally(() => {
    loading.value = false
  })
}

function handleSearch() {
  paginationData.currentPage === 1 ? getTableData() : (paginationData.currentPage = 1)
}

function resetSearch() {
  searchFormRef.value?.resetFields()
  handleSearch()
}
// #endregion

// #region 分配权限
const permissionDialogVisible = ref<boolean>(false)
const currentRoleId = ref<number>(0)
const permissionList = ref<{ id: number, permName: string, permCode: string }[]>([])
const selectedPermissions = ref<number[]>([])

function handleAssignPermission(row: RoleInfo) {
  currentRoleId.value = row.id
  permissionDialogVisible.value = true
  // 这里应该获取所有权限列表和当前角色已分配的权限
  getPermissionListApi().then(({ data }) => {
    permissionList.value = data
  })
}

function handleSavePermissions() {
  // 这里应该调用分配权限的 API
  ElMessage.success("权限分配成功")
  permissionDialogVisible.value = false
}
// #endregion

function getPermissionListApi() {
  return import("@/api/permission").then(module => module.getPermissionListApi())
}

// 监听分页参数的变化
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="roleName" label="角色名称">
          <el-input v-model="searchData.roleName" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="roleCode" label="角色编码">
          <el-input v-model="searchData.roleCode" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">
            查询
          </el-button>
          <el-button :icon="Refresh" @click="resetSearch">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">
            新增角色
          </el-button>
          <el-button type="danger" :icon="Delete">
            批量删除
          </el-button>
        </div>
        <div>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="getTableData" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="roleName" label="角色名称" align="center" />
          <el-table-column prop="roleCode" label="角色编码" align="center" />
          <el-table-column prop="description" label="描述" align="center" />
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status === 1" type="success" effect="plain" disable-transitions>
                启用
              </el-tag>
              <el-tag v-else type="danger" effect="plain" disable-transitions>
                禁用
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="创建时间" align="center" />
          <el-table-column fixed="right" label="操作" width="200" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">
                修改
              </el-button>
              <el-button type="warning" text bg size="small" @click="handleAssignPermission(scope.row)">
                <el-icon><Setting /></el-icon>
                权限
              </el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :current-page="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- 新增/修改 -->
    <el-dialog
      v-model="dialogVisible"
      :title="'id' in formData ? '修改角色' : '新增角色'"
      width="500px"
      @closed="resetForm"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="roleName" label="角色名称">
          <el-input v-model="formData.roleName" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="roleCode" label="角色编码">
          <el-input v-model="formData.roleCode" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="description" label="描述">
          <el-input v-model="formData.description" type="textarea" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-radio-group v-model="formData.status">
            <el-radio :value="1">
              启用
            </el-radio>
            <el-radio :value="0">
              禁用
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" :loading="loading" @click="handleCreateOrUpdate">
          确认
        </el-button>
      </template>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog
      v-model="permissionDialogVisible"
      title="分配权限"
      width="600px"
    >
      <el-transfer
        v-model="selectedPermissions"
        :data="permissionList"
        :props="{ key: 'id', label: 'permName' }"
        :titles="['待选权限', '已选权限']"
      />
      <template #footer>
        <el-button @click="permissionDialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleSavePermissions">
          确认
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
