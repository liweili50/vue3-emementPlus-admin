<script lang="ts" setup>
import type { FormRules } from "element-plus"
import type { ProductAddRequestData, ProductInfo, ProductUpdateRequestData } from "@/api/product/type"
import { usePagination } from "@@/composables/usePagination"
import { CirclePlus, Delete, Refresh, RefreshRight, Search } from "@element-plus/icons-vue"
import { cloneDeep } from "lodash-es"
import { addProductApi, deleteProductApi, getProductDetailApi, getProductPageApi, updateProductApi } from "@/api/product"

defineOptions({
  name: "ProductManagement"
})

const loading = ref<boolean>(false)

const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

// #region 增
const DEFAULT_FORM_DATA: ProductAddRequestData = {
  productCode: "",
  productName: "",
  category: "",
  unit: "个",
  price: 0,
  stock: 0
}

const dialogVisible = ref<boolean>(false)

const formRef = useTemplateRef("formRef")

const formData = ref<ProductAddRequestData | ProductUpdateRequestData>(cloneDeep(DEFAULT_FORM_DATA))

const formRules: FormRules = {
  productCode: [{ required: true, trigger: "blur", message: "请输入产品编码" }],
  productName: [{ required: true, trigger: "blur", message: "请输入产品名称" }],
  category: [{ required: true, trigger: "blur", message: "请输入产品类别" }],
  price: [{ required: true, trigger: "blur", message: "请输入价格" }]
}

function handleCreateOrUpdate() {
  formRef.value?.validate((valid) => {
    if (!valid) {
      ElMessage.error("表单校验不通过")
      return
    }
    loading.value = true
    const api = "id" in formData.value ? updateProductApi : addProductApi
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
function handleDelete(row: ProductInfo) {
  ElMessageBox.confirm(`正在删除产品：${row.productName}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteProductApi(row.id).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
// #endregion

// #region 改
function handleUpdate(row: ProductInfo) {
  dialogVisible.value = true
  getProductDetailApi(row.id).then(({ data }) => {
    formData.value = data
  })
}
// #endregion

// #region 查
const tableData = ref<ProductInfo[]>([])

const searchFormRef = useTemplateRef("searchFormRef")

const searchData = reactive({
  productCode: "",
  productName: "",
  category: ""
})

function getTableData() {
  loading.value = true
  getProductPageApi({
    pageNum: paginationData.currentPage,
    pageSize: paginationData.pageSize,
    productCode: searchData.productCode,
    productName: searchData.productName,
    category: searchData.category
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
        <el-form-item prop="productCode" label="产品编码">
          <el-input v-model="searchData.productCode" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="productName" label="产品名称">
          <el-input v-model="searchData.productName" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="category" label="类别">
          <el-input v-model="searchData.category" placeholder="请输入" />
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
            新增产品
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
          <el-table-column prop="productCode" label="产品编码" align="center" />
          <el-table-column prop="productName" label="产品名称" align="center" />
          <el-table-column prop="category" label="类别" align="center" />
          <el-table-column prop="unit" label="单位" align="center" width="80" />
          <el-table-column prop="price" label="价格" align="center">
            <template #default="scope">
              <span>¥{{ scope.row.price.toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="stock" label="库存" align="center" />
          <el-table-column prop="createdAt" label="创建时间" align="center" />
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
      :title="'id' in formData ? '修改产品' : '新增产品'"
      width="500px"
      @closed="resetForm"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="productCode" label="产品编码">
          <el-input v-model="formData.productCode" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="productName" label="产品名称">
          <el-input v-model="formData.productName" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="category" label="类别">
          <el-input v-model="formData.category" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="unit" label="单位">
          <el-input v-model="formData.unit" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="price" label="价格">
          <el-input v-model="formData.price" type="number" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="stock" label="库存">
          <el-input v-model="formData.stock" type="number" placeholder="请输入" />
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
