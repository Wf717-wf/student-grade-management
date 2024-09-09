<script setup>
import { reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'

import { addStudentAPI,editStudentByIdAPI } from '@/service/api/api.js'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  //弹窗状态 是否为新增
  isAdd: {
    type: Boolean,
    default: true
  },
  //编辑的学生
  student: {
    type: Object,
    default: {}
  }
})
const emit = defineEmits(['addStudent', 'update:open', 'finish'])
// 控制弹窗显示
const isOpenModal = ref(false)
// 表单组件实例
const formRef = ref(null)
// 表单对象
const formState = ref({
  name: '',
  gender: ''
})

// 表单验证规则
const rules = reactive({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }]
})

// 监听open属性
watch(
  () => props.open,
  (newVal) => {
    isOpenModal.value = newVal
  }
)

watch(
  () => props.student,
  (student) => {
    if (student.id) {
      // Object.assign(formState, student)   
 
      formState.value=student
    }
  },
  { deep: true }
)

// 添加学生
const handleAdd = async () => {
  debugger
  if (!formRef.value) return

  formRef.value.validate(async (valid) => {
    if (valid) {
      // 表单验证通过
      const res = await addStudentAPI(formState.value)
      if (res.code != 200) {
        // ElMessage.error(res.msg)
        ElMessage({
          message: res.msg,
          type: 'error'
        })
        return
      }
      // ElMessage.success('添加成功!')
      ElMessage({
        message: '操作成功',
        type: 'success'
      })
      // 发射确认事件
      onClose()
      //定义确认事件 和操作类型
      emit('finish','add')
      // 清空表单数据
      Object.assign(formState, { name: '', gender: '' })
    } else {
      ElMessage.error('请填写所有字段')
    }
  })
}

const handleEdit = async () => {
  const id=formState.value.id
  const params={
    name:formState.value.name,
    gender:formState.value.gender
  }
  const res= await editStudentByIdAPI(id,params)
  if(res.code!==200){
      ElMessage.error(res.msg)
      return
  }
  ElMessage.success('修改成功!')
  //定义确认事件和操作类型
  emit('finish','edit')
}

// 点击确认时
const onOk = () => {
  //新增时
  if (props.isAdd) {
    handleAdd()
  }
  //编辑时
  else {
    handleEdit()
  }
}

// 处理关闭弹窗事件
const onClose = () => {
  //重置表单
  resetForm()
  //更新弹窗打开状态
  emit('update:open', false)
}

//重置表单
const resetForm = () => {
  formState.name = ''
  formState.gender = ''
}

const options = reactive([
  { label: '男', value: 0 },
  { label: '女', value: 1 }
])
</script>

<template>
  <el-dialog
    :title="isAdd ? '新增学生' : '编辑学生'"
    :width="'30%'"
    draggable
    :close-on-click-modal="false"
    class="form-wrap"
    v-model="isOpenModal"
    @close="onClose"
    center
  >
    <el-form ref="formRef" :model="formState" :rules="rules" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formState.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="formState.gender" placeholder="请选择性别">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <div class="footer">
        <el-button type="primary" @click="onOk">确定</el-button>
        <el-button type="default" @click="onClose">取消</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<style scoped>
.form-wrap {
  padding: 10px;
}
.footer {
  text-align: center;
}
</style>
