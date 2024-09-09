<template>
  <div class="container">
    <div class="table-wrap">
      <el-table
        v-loading="loading"
        :data="studentDataSource"
        :height="'70vh'"
        header-cell-class-name="table-header-col"
      >
        <el-table-column
          v-for="column in columnDefs"
          :key="column.prop"
          header-align="center"
          align="center"
          :prop="column.prop"
          :label="column.label"
        >
        </el-table-column>
        <el-table-column align="center" prop="prop" label="操作">
          <template #default="scope">
            <el-button type="danger" @click="onDelete(scope.row.id)">删除</el-button>
            <el-button type="success" @click="onEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="footer">
        <el-pagination
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[5, 10, 30]"
          :layout="'total, sizes, prev, pager, next, jumper'"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div> -->
  </div>
</template>

<script setup>
import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, defineProps, defineEmits, watch } from 'vue'
import { deleteStudentByIdAPI, editStudentByIdAPI } from '@/service/api/api.js'

const props = defineProps({
  studentDataSource: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: () => false
  }
})

const emit = defineEmits(['row-delete', 'row-edit'])

const columnDefs = ref([
  { label: '姓名', prop: 'name' },
  { label: '性别', prop: 'gender_display' }
])

const currentPage = ref(props.page)
const pageSize = ref(props.pageSize)

// 监听 props 更新
watch(() => props.page, (newPage) => {
  currentPage.value = newPage
})

watch(() => props.pageSize, (newPageSize) => {
  pageSize.value = newPageSize
})

// 删除时
const onDelete = async (id) => {
  try {
    await ElMessageBox.confirm('确认删除此学生吗？', '删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await handleDelete(id)
  } catch (err) {
    ElMessage.error(err)
  }
}

// 编辑时
const onEdit = async (params) => {
  emit('row-edit', params)
}

const handleDelete = async (id) => {
  // 用户确认删除后执行删除操作
  const res = await deleteStudentByIdAPI(id)
  if (res.code !== 200) {
    ElMessage.error(res.msg)
    return
  }
  ElMessage.success('删除成功!')
  emit('row-delete')
}

// 处理页码改变
const handleCurrentChange = (page) => {
  currentPage.value = page
  // TODO: 重新加载数据，例如调用 API
}

// 处理页码大小改变
const handleSizeChange = (size) => {
  pageSize.value = size
  // TODO: 重新加载数据，例如调用 API
}
</script>

<style lang="less" scoped>
.table-wrap {
  padding: 10px;
  :deep(.table-header-col) {
    background-color: #fafafa;
  }
}
.footer{
  text-align: center;
  display: flex;
  justify-content: center;
}



</style>
