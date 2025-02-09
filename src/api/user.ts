import request from '../utils/request'

export const userApi = {
  // 用户登录
  login: (data: { username: string; password: string }) => {
    return request.post('/user/login', data)
  },

  // 用户登出
  logout: () => {
    return request.post('/user/logout')
  },

  // 修改密码
  updatePassword: (data: { password: string }) => {
    return request.post('/user/updatePassword', data)
  }
} 