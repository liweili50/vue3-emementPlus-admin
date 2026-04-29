<script lang="ts" setup>
import type { FormRules } from "element-plus"
import type { PermissionAddRequestData, PermissionInfo, PermissionUpdateRequestData } from "@/api/permission/type"
import { CirclePlus, RefreshRight } from "@element-plus/icons-vue"
import { cloneDeep } from "lodash-es"
import { addPermissionApi, deletePermissionApi, getPermissionListApi, updatePermissionApi } from "@/api/permission"

defineOptions({
  name: "PermissionManagement"
})

const loading = ref<boolean>(false)

// #region 增
const DEFAULT_FORM_DATA: PermissionAddRequestData = {
  permName: "",
  permCode: "",
  url: "",
  method: "GET",
  parentId: 0
}

const dialogVisible = ref<boolean>(false)

const formRef = useTemplateRef("formRef")

const formData = ref<PermissionAddRequestData | PermissionUpdateRequestData>(cloneDeep(DEFAULT_FORM_DATA))

const formRules: FormRules = {
  permName: [{ required: true, trigger: "blur", message: "请输入权限名称" }],
  permCode: [{ required: true, trigger: "blur", message: "请输入权限编码" }],
  url: [{ required: true, trigger: "blur", message: "请输入URL" }],
  method: [{ required: true, trigger: "blur", message: "请选择请求方法" }]
}

function handleCreateOrUpdate() {
  formRef.value?.validate((valid) => {
    if (!valid) {
      ElMessage.error("表单校验不通过")
      return
    }
    loading.value = true
    const api = "id" in formData.value ? updatePermissionApi : addPermissionApi
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
function handleDelete(row: PermissionInfo) {
  ElMessageBox.confirm(`正在删除权限：${row.permName}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deletePermissionApi(row.id).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
// #endregion

// #region 改
function handleUpdate(row: PermissionInfo) {
  dialogVisible.value = true
  formData.value = { ...row }
}
// #endregion

// #region 查
const tableData = ref<PermissionInfo[]>([])

function getTableData() {
  loading.value = true
  getPermissionListApi().then(({ data }) => {
    tableData.value = data
  }).catch(() => {
    tableData.value = []
  }).finally(() => {
    loading.value = false
  })
}

function _handleSearch() {
  getTableData()
}

function _resetSearch() {
  getTableData()
}
// #endregion

// 初始化
getTableData()
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">
            新增权限
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
          <el-table-column prop="permName" label="权限名称" align="center" />
          <el-table-column prop="permCode" label="权限编码" align="center" />
          <el-table-column prop="url" label="URL" align="center" />
          <el-table-column prop="method" label="请求方法" align="center" width="120">
            <template #default="scope">
              <el-tag v-if="scope.row.method === 'GET'" type="success" effect="plain" disable-transitions>
                GET
              </el-tag>
              <el-tag v-else-if="scope.row.method === 'POST'" type="warning" effect="plain" disable-transitions>
                POST
              </el-tag>
              <el-tag v-else-if="scope.row.method === 'PUT'" type="primary" effect="plain" disable-transitions>
                PUT
              </el-tag>
              <el-tag v-else type="danger" effect="plain" disable-transitions>
                DELETE
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="parentId" label="父级ID" align="center" width="100" />
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">
                修改
              </el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- 新增/修改 -->
    <el-dialog
      v-model="dialogVisible"
      :title="'id' in formData ? '修改权限' : '新增权限'"
      width="500px"
      @closed="resetForm"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="permName" label="权限名称">
          <el-input v-model="formData.permName" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="permCode" label="权限编码">
          <el-input v-model="formData.permCode" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="url" label="URL">
          <el-input v-model="formData.url" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="method" label="请求方法">
          <el-select v-model="formData.method" placeholder="请选择">
            <el-option label="GET" value="GET" />
            <el-option label="POST" value="POST" />
            <el-option label="PUT" value="PUT" />
            <el-option label="DELETE" value="DELETE" />
          </el-select>
        </el-form-item>
        <el-form-item prop="parentId" label="父级ID">
          <el-input v-model="formData.parentId" type="number" placeholder="请输入" />
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
  </div>
</template>

<style lang="scss" scoped>
.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}
</style>
