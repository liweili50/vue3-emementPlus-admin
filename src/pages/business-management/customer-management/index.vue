<script lang="ts" setup>
import type { FormRules } from "element-plus"
import type { CustomerAddRequestData, CustomerInfo, CustomerUpdateRequestData } from "@/api/customer/type"
import { usePagination } from "@@/composables/usePagination"
import { CirclePlus, Delete, Refresh, RefreshRight, Search } from "@element-plus/icons-vue"
import { cloneDeep } from "lodash-es"
import { addCustomerApi, deleteCustomerApi, getCustomerDetailApi, getCustomerPageApi, updateCustomerApi } from "@/api/customer"

defineOptions({
  name: "CustomerManagement"
})

const loading = ref<boolean>(false)

const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

// #region 增
const DEFAULT_FORM_DATA: CustomerAddRequestData = {
  name: "",
  contact: "",
  phone: "",
  email: "",
  address: "",
  industry: "",
  level: 1,
  status: 1,
  ownerId: 1
}

const dialogVisible = ref<boolean>(false)

const formRef = useTemplateRef("formRef")

const formData = ref<CustomerAddRequestData | CustomerUpdateRequestData>(cloneDeep(DEFAULT_FORM_DATA))

const formRules: FormRules = {
  name: [{ required: true, trigger: "blur", message: "请输入客户名称" }],
  contact: [{ required: true, trigger: "blur", message: "请输入联系人" }],
  level: [{ required: true, trigger: "blur", message: "请选择客户级别" }]
}

function handleCreateOrUpdate() {
  formRef.value?.validate((valid) => {
    if (!valid) {
      ElMessage.error("表单校验不通过")
      return
    }
    loading.value = true
    const api = "id" in formData.value ? updateCustomerApi : addCustomerApi
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
function handleDelete(row: CustomerInfo) {
  ElMessageBox.confirm(`正在删除客户：${row.name}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteCustomerApi(row.id).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
// #endregion

// #region 改
function handleUpdate(row: CustomerInfo) {
  dialogVisible.value = true
  getCustomerDetailApi(row.id).then(({ data }) => {
    formData.value = data
  })
}
// #endregion

// #region 查
const tableData = ref<CustomerInfo[]>([])

const searchFormRef = useTemplateRef("searchFormRef")

const searchData = reactive({
  name: "",
  industry: "",
  level: undefined as number | undefined,
  status: undefined as number | undefined
})

function getTableData() {
  loading.value = true
  getCustomerPageApi({
    pageNum: paginationData.currentPage,
    pageSize: paginationData.pageSize,
    name: searchData.name,
    industry: searchData.industry,
    level: searchData.level,
    status: searchData.status
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

// 监听分页参数的变化
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="name" label="客户名称">
          <el-input v-model="searchData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="industry" label="行业">
          <el-input v-model="searchData.industry" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="level" label="级别">
          <el-select v-model="searchData.level" placeholder="请选择" clearable>
            <el-option label="VIP客户" :value="1" />
            <el-option label="重要客户" :value="2" />
            <el-option label="普通客户" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select v-model="searchData.status" placeholder="请选择" clearable>
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="2" />
          </el-select>
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
            新增客户
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
          <el-table-column prop="name" label="客户名称" align="center" />
          <el-table-column prop="contact" label="联系人" align="center" />
          <el-table-column prop="phone" label="手机号" align="center" />
          <el-table-column prop="industry" label="行业" align="center" />
          <el-table-column prop="level" label="级别" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.level === 1" type="danger" effect="plain" disable-transitions>
                VIP客户
              </el-tag>
              <el-tag v-else-if="scope.row.level === 2" type="warning" effect="plain" disable-transitions>
                重要客户
              </el-tag>
              <el-tag v-else type="info" effect="plain" disable-transitions>
                普通客户
              </el-tag>
            </template>
          </el-table-column>
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
      :title="'id' in formData ? '修改客户' : '新增客户'"
      width="500px"
      @closed="resetForm"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="name" label="客户名称">
          <el-input v-model="formData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="contact" label="联系人">
          <el-input v-model="formData.contact" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="formData.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="formData.email" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="address" label="地址">
          <el-input v-model="formData.address" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="industry" label="行业">
          <el-input v-model="formData.industry" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="level" label="级别">
          <el-select v-model="formData.level" placeholder="请选择">
            <el-option label="VIP客户" :value="1" />
            <el-option label="重要客户" :value="2" />
            <el-option label="普通客户" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-radio-group v-model="formData.status">
            <el-radio :value="1">
              启用
            </el-radio>
            <el-radio :value="2">
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
