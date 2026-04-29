<script lang="ts" setup>
import type { FormRules } from "element-plus"
import type { OrderAddRequestData, OrderInfo, OrderUpdateRequestData } from "@/api/order/type"
import { usePagination } from "@@/composables/usePagination"
import { Check, CirclePlus, Refresh, RefreshRight, Search } from "@element-plus/icons-vue"
import { cloneDeep } from "lodash-es"
import { addOrderApi, auditOrderApi, deleteOrderApi, getOrderDetailApi, getOrderPageApi, updateOrderApi } from "@/api/order"

defineOptions({
  name: "OrderManagement"
})

const loading = ref<boolean>(false)

const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

// #region 增
const DEFAULT_FORM_DATA: OrderAddRequestData = {
  customerId: 1,
  productId: 1,
  quantity: 1,
  remark: ""
}

const dialogVisible = ref<boolean>(false)

const formRef = useTemplateRef("formRef")

const formData = ref<OrderAddRequestData | OrderUpdateRequestData>(cloneDeep(DEFAULT_FORM_DATA))

const formRules: FormRules = {
  customerId: [{ required: true, trigger: "blur", message: "请选择客户" }],
  productId: [{ required: true, trigger: "blur", message: "请选择产品" }],
  quantity: [{ required: true, trigger: "blur", message: "请输入数量" }]
}

function handleCreateOrUpdate() {
  formRef.value?.validate((valid) => {
    if (!valid) {
      ElMessage.error("表单校验不通过")
      return
    }
    loading.value = true
    const api = "id" in formData.value ? updateOrderApi : addOrderApi
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
function handleDelete(row: OrderInfo) {
  ElMessageBox.confirm(`正在删除订单：${row.orderNo}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteOrderApi(row.id).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
// #endregion

// #region 改
function handleUpdate(row: OrderInfo) {
  dialogVisible.value = true
  getOrderDetailApi(row.id).then(({ data }) => {
    formData.value = data
  })
}

function handleAudit(row: OrderInfo) {
  ElMessageBox.confirm(`确认审核订单：${row.orderNo}？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    auditOrderApi(row.id).then(() => {
      ElMessage.success("审核成功")
      getTableData()
    })
  })
}
// #endregion

// #region 查
const tableData = ref<OrderInfo[]>([])

const searchFormRef = useTemplateRef("searchFormRef")

const searchData = reactive({
  orderNo: "",
  customerId: undefined as number | undefined,
  status: undefined as number | undefined
})

function getTableData() {
  loading.value = true
  getOrderPageApi({
    pageNum: paginationData.currentPage,
    pageSize: paginationData.pageSize,
    orderNo: searchData.orderNo,
    customerId: searchData.customerId,
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
        <el-form-item prop="orderNo" label="订单号">
          <el-input v-model="searchData.orderNo" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select v-model="searchData.status" placeholder="请选择" clearable>
            <el-option label="待审核" :value="1" />
            <el-option label="已审核" :value="2" />
            <el-option label="已完成" :value="3" />
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
            新增订单
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
          <el-table-column prop="orderNo" label="订单号" align="center" width="180" />
          <el-table-column prop="customerName" label="客户名称" align="center" />
          <el-table-column prop="productName" label="产品名称" align="center" />
          <el-table-column prop="quantity" label="数量" align="center" width="80" />
          <el-table-column prop="totalAmount" label="总金额" align="center">
            <template #default="scope">
              <span>¥{{ scope.row.totalAmount.toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status === 1" type="warning" effect="plain" disable-transitions>
                待审核
              </el-tag>
              <el-tag v-else-if="scope.row.status === 2" type="success" effect="plain" disable-transitions>
                已审核
              </el-tag>
              <el-tag v-else type="info" effect="plain" disable-transitions>
                已完成
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" align="center" />
          <el-table-column fixed="right" label="操作" width="200" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">
                修改
              </el-button>
              <el-button type="warning" text bg size="small" @click="handleAudit(scope.row)">
                <el-icon><Check /></el-icon>
                审核
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
      :title="'id' in formData ? '修改订单' : '新增订单'"
      width="500px"
      @closed="resetForm"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="customerId" label="客户">
          <el-input v-model="formData.customerId" type="number" placeholder="请输入客户ID" />
        </el-form-item>
        <el-form-item prop="productId" label="产品">
          <el-input v-model="formData.productId" type="number" placeholder="请输入产品ID" />
        </el-form-item>
        <el-form-item prop="quantity" label="数量">
          <el-input v-model="formData.quantity" type="number" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="remark" label="备注">
          <el-input v-model="formData.remark" type="textarea" placeholder="请输入" />
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
