<template>
  <div class="about">
    <h2>介绍</h2>
    <div>这是一个使用 vue3 js vite的后台模板，帮助你快速搭建后台项目。</div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import {getStudentListAPI} from "@/service/api/api.js"


const getStudentList=()=>{
  getStudentListAPI()
}


onMounted(()=>{

  // getStudentListApi()
  getStudentList()
})

</script>

<style lang="less" scoped>
.about {
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  // background-color: #000;
}
</style>
