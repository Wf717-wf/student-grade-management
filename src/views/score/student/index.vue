<template>
  <div class="student-wrap">
    <el-card>
      <el-row class="btn-wrap" style="margin: 20px auto">
        <el-col :span="6">
          <el-button type="primary" @click="handleOpenAddDialog">新增 </el-button>
        </el-col>
      </el-row>
      <!-- 弹出层  新增/编辑 -->
      <ModalForm
        :open="isOpenModal"
        :student="student"
        :isAdd="isAdd"
        @update:open="updateOpen"
        @finish="handleFinish"
      />
      <!-- 表格 -->
      <PanelTable
        :loading="loading"
        :studentDataSource="studentDataSource"
        v-model:page="params.page"
        v-model:pageSize="params.pageSize"
        v-model:total="total"
        @row-delete="getStudentList"
        @row-edit="handleOpenEditDialog"
      />
      <Pagination
        :currentPage="params.page"
        :pageSize="params.pageSize"
        :total="total"
        @update:currentPage="handlePageChange"
        @update:pageSize="handleSizeChange"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import PanelTable from './components/PanelTable.vue'
import ModalForm from './components/ModalForm.vue'
import { getStudentListAPI, editStudentByIdAPI } from '@/service/api/api.js'
import { ElMessage } from 'element-plus'
import Pagination from '@/components/pagination/index.vue'

const studentDataSource = ref([]) //表格数据源
const params=reactive({
  page:1,
  pageSize:10
})//分页参数
const total = ref(0) //数量
const isOpenModal = ref(false) //弹窗打开状态
const loading = ref(false) //表格加载效果
const isAdd = ref(true) //弹窗状态 是否新增
const student = ref({})

const handleFinish = () => {
  isOpenModal.value = false
  getStudentList()
}

//查询学生
const getStudentList = async () => {
  try {
    loading.value = true
    const res = await getStudentListAPI(params)
    if (res.code !== 200) {
      alert(res.msg)
      return
    }
    loading.value = false
    studentDataSource.value = res.data.data
    total.value = res.data.total
  } catch (error) {
    console.error('Failed to fetch student list', error)
  }
}
//打开新增弹窗
const handleOpenAddDialog = () => {
  isAdd.value = true
  isOpenModal.value = true
}
//更新弹窗打开状态
const updateOpen = (value) => {
  isOpenModal.value = value
}
//打开编辑弹窗
const handleOpenEditDialog = async (params) => {
  student.value = params
  isAdd.value = false
  isOpenModal.value = true
}

const handlePageChange = (page) => {
  params.page = page
  getStudentList()
}

const handleSizeChange = (size) => {
  params.pageSize= size
  getStudentList()
}



onMounted(() => {
  getStudentList()
})
</script>

<style scoped>
.student-wrap {
  padding: 20px;
}
</style>
