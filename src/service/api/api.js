import { gsRequest } from '../index'
 
//获取学生
export function getStudentListAPI(params) {
  return gsRequest.get({
    url: '/score/students',
    params:params
  })
}

// 添加学生
export function addStudentAPI(params) {
  debugger
  return gsRequest.post({
    url: '/score/students/',
    data:params
  })
}

// 删除学生
export function deleteStudentByIdAPI(id) {
  return gsRequest.delete({
    url: `/score/students/${id}/`
  })
}

// 编辑学生
export function editStudentByIdAPI(id,params) {
  return gsRequest.put({
    url: `/score/students/${id}/`,
    data:params
  })
}


 
