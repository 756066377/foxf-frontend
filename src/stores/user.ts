import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userApi } from '../api/user'
import { memberApi } from '../api/member'
import { useRouter } from 'vue-router'

interface MemberInfo {
  memberLevel: number    // 会员等级
  isMember: number      // 是否为会员 (0或1)
  macCount: number      // 设备绑定数
  isDisable: number     // 是否被禁用
  userLevelName: string // 会员等级名称
  appId: number         // 所属APPID
  fromTime: string      // 开通时间
  endTime: string       // 到期时间
  nickname: string      // 用户昵称
  growth: number        // 成长值
  id: number           // 会员ID
  username: string     // 会员用户名
}

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const token = ref('')
  const username = ref('')
  const memberInfo = ref<MemberInfo | null>(null)
  let heartbeatTimer: number | undefined // 添加心跳定时器变量

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)
  const isVip = computed(() => memberInfo.value?.isMember === 1)

  // 从本地存储加载用户信息
  const loadUserInfo = () => {
    console.log('尝试从本地存储加载用户信息')
    const savedToken = localStorage.getItem('token')
    const savedUsername = localStorage.getItem('username')
    
    if (savedToken && savedUsername) {
      console.log('找到本地存储的用户信息')
      token.value = savedToken
      username.value = savedUsername
      
      // 立即启动心跳
      startHeartbeat()
      
      // 立即获取会员信息，但不等待结果
      memberApi.getMemberInfo(savedToken)
        .then(response => {
          if (response.code === 1) {
            console.log('成功获取会员信息:', response.data)
            memberInfo.value = response.data
          }
        })
        .catch(error => {
          console.error('获取会员信息失败:', error)
        })
      
      return true
    }
    
    console.log('本地存储中没有用户信息')
    return false
  }

  // 保存用户信息到本地存储
  const saveUserInfo = (data: { token: string; username: string }) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('username', data.username)
    token.value = data.token
    username.value = data.username
  }

  // 清除用户信息
  const clearUserInfo = () => {
    stopHeartbeat()
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    token.value = ''
    username.value = ''
    memberInfo.value = null
  }

  // 设置心跳定时器
  const startHeartbeat = () => {
    stopHeartbeat() // 先清除可能存在的定时器
    heartbeatTimer = window.setInterval(async () => {
      await heartbeat()
    }, 10000)
  }

  // 停止心跳定时器
  const stopHeartbeat = () => {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
      heartbeatTimer = undefined
    }
  }

  // 登录
  const login = async (loginData: { username: string; password: string }) => {
    try {
      const response = await memberApi.login(loginData)
      console.log('登录响应:', response)

      if (response.code === 1) {
        saveUserInfo({
          token: response.data.token,
          username: loginData.username
        })
        startHeartbeat() // 登录成功后启动心跳
        return true
      } else {
        throw new Error(response.msg || '登录失败')
      }
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  // 登出
  const logout = async () => {
    try {
      console.log('开始登出操作')
      stopHeartbeat() // 先停止心跳
      
      const response = await memberApi.logout(token.value)
      console.log('登出响应:', response)

      if (response.code === 1) {
        console.log('登出成功，准备清理用户信息')
        clearUserInfo() // 清理用户信息
        console.log('用户信息已清理')
        return true
      }
      
      // 如果登出失败，重新启动心跳
      startHeartbeat()
      return false
    } catch (error) {
      console.error('登出操作出错:', error)
      // 如果出错，重新启动心跳
      startHeartbeat()
      return false
    }
  }

  // 检查登录状态
  const checkLogin = async () => {
    console.log('开始检查登录状态')
    console.log('当前 token:', token.value)
    
    if (!token.value) {
      console.log('尝试从本地存储加载用户信息')
      const loaded = loadUserInfo()
      console.log('加载结果:', loaded)
      if (!loaded) {
        console.log('本地无用户信息')
        return false
      }
    }

    try {
      console.log('发送心跳请求验证登录状态')
      const response = await memberApi.heart(token.value)
      console.log('心跳响应:', response)
      if (response.code === 1) {
        console.log('心跳成功，用户已登录')
        return true
      }
      console.log('心跳失败，清除用户信息')
      clearUserInfo()
      return false
    } catch (error) {
      console.error('检查登录状态失败:', error)
      clearUserInfo()
      return false
    }
  }

  // 心跳
  const heartbeat = async () => {
    if (!token.value) {
      console.warn('No token available for heartbeat')
      return null
    }

    try {
      const response = await memberApi.heart(token.value)
      console.log('心跳请求响应:', response)
      
      if (response.code === 1) {
        try {
          console.log('获取会员信息...')
          const memberResponse = await memberApi.getMemberInfo(token.value)
          console.log('会员信息响应:', memberResponse)
          
          if (memberResponse.code === 1) {
            console.log('更新会员信息:', memberResponse.data)
            memberInfo.value = memberResponse.data
          }
        } catch (error) {
          console.error('获取会员信息失败，但不影响心跳:', error)
        }
        return response
      }
      return null
    } catch (error) {
      console.error('心跳请求失败:', error)
      // 如果是网络错误或服务器错误，不要立即清除用户信息
      if (!error.message.includes('服务器返回格式错误') && 
          !error.message.includes('HTTP error')) {
        clearUserInfo()
      }
      return null
    }
  }

  // 修改密码
  const updatePassword = async (newPassword: string) => {
    try {
      const response = await memberApi.updatePassword({
        token: token.value,
        newPassword
      })
      return response.code === 1
    } catch (error) {
      console.error('修改密码失败:', error)
      return false
    }
  }

  return {
    token,
    username,
    memberInfo,
    isLoggedIn,
    isVip,
    login,
    logout,
    heartbeat,
    updatePassword,
    checkLogin,
    loadUserInfo,
    startHeartbeat, // 导出心跳控制方法
    stopHeartbeat
  }
}) 