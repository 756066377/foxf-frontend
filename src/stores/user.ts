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
  const vipStatus = ref(false)  // 新增 VIP 状态的响应式引用
  let heartbeatTimer: number | undefined // 添加心跳定时器变量

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)
  const isVip = computed(() => vipStatus.value)  // 使用 vipStatus 的计算属性

  // 从本地存储加载用户信息
  const loadUserInfo = async () => {
    console.log('尝试从本地存储加载用户信息')
    const savedToken = localStorage.getItem('FOXF_TOKEN')
    const savedUsername = localStorage.getItem('FOXF_USERNAME')
    
    if (savedToken && savedUsername) {
      console.log('找到本地存储的用户信息')
      token.value = savedToken
      username.value = savedUsername
      
      try {
        // 验证 token 有效性
        const response = await memberApi.heart(savedToken)
        if (response.code === 1) {
          console.log('Token 验证成功')
          vipStatus.value = response.data.isVip
          
          // 获取会员信息
          const memberResponse = await memberApi.getMemberInfo(savedToken)
          if (memberResponse.code === 1) {
            memberInfo.value = memberResponse.data
          }
          
          // 启动心跳
          startHeartbeat()
          return true
        } else {
          console.warn('Token 已失效')
          clearUserInfo()
        }
      } catch (error) {
        console.error('验证 token 失败:', error)
        clearUserInfo()
      }
    }
    
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
    token.value = ''
    username.value = ''
    memberInfo.value = null
    vipStatus.value = false
    
    // 清除本地存储（注意不要清除 machine_code）
    localStorage.removeItem('FOXF_TOKEN')
    localStorage.removeItem('FOXF_USERNAME')
    
    stopHeartbeat()
  }

  // 设置心跳定时器
  const startHeartbeat = () => {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
    }

    // 立即执行一次心跳
    heartbeat().catch(console.error)

    // 设置定时器，每30秒执行一次心跳
    heartbeatTimer = setInterval(() => {
      heartbeat().catch(console.error)
    }, 30000)
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
        token.value = response.data.token
        username.value = response.data.username
        vipStatus.value = response.data.isVip
        
        localStorage.setItem('FOXF_TOKEN', response.data.token)
        localStorage.setItem('FOXF_USERNAME', response.data.username)
        
        startHeartbeat()
        return { success: true, message: '登录成功' }
      }
      
      // 处理特定的错误码
      switch (response.code) {
        case -1:
          return { success: false, message: '用户名或密码错误' }
        case -2:
          return { success: false, message: '账号已被禁用' }
        case -3:
          return { success: false, message: '当前设备已被绑定，请先解绑' }
        case -4:
          return { success: false, message: '设备数量超出限制，请先解绑其他设备' }
        default:
          return { success: false, message: response.msg || '登录失败' }
      }
    } catch (error) {
      console.error('登录失败:', error)
      return { 
        success: false, 
        message: error instanceof Error ? error.message : '网络错误，请稍后重试'
      }
    }
  }

  // 登出
  const logout = async () => {
    try {
      if (token.value) {
        // 调用登出 API
        const response = await memberApi.logout(token.value)
        console.log('登出响应:', response)
        
        if (response.code !== 1) {
          throw new Error(response.msg || '登出失败')
        }
      }
      
      // 无论 API 调用是否成功，都清除本地状态
      clearUserInfo()
      router.push('/login')
      return { success: true, message: '已安全退出' }
    } catch (error) {
      console.error('登出错误:', error)
      // 即使 API 调用失败，也要清除本地状态
      clearUserInfo()
      router.push('/login')
      return { 
        success: false, 
        message: error instanceof Error ? error.message : '登出失败，请重试'
      }
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
      console.log('心跳响应:', response)
      
      // 根据 API 文档，code=1 表示成功
      if (response.code === 1) {
        // 更新 VIP 状态
        vipStatus.value = response.data.isVip  // 使用 vipStatus 而不是 isVip
        
        // 获取最新的会员信息
        try {
          const memberResponse = await memberApi.getMemberInfo(token.value)
          if (memberResponse.code === 1) {
            memberInfo.value = memberResponse.data
          }
        } catch (error) {
          console.error('获取会员信息失败，但不影响心跳:', error)
        }
        
        return response
      }
      
      // 处理特定错误码
      if (response.code === -1) {
        clearUserInfo()
        router.push('/login')
      }
      
      return null
    } catch (error) {
      console.error('心跳请求失败:', error)
      // 网络错误时继续保持心跳
      if (error instanceof Error && 
          (error.message.includes('Network') || error.message.includes('timeout'))) {
        console.warn('网络错误，继续保持心跳')
        return null
      }
      clearUserInfo()
      return null
    }
  }

  // 修改密码
  const updatePassword = async (params: { oldPassword: string; newPassword: string }) => {
    try {
      if (!token.value) {
        throw new Error('未登录状态')
      }

      const response = await memberApi.updatePassword({
        token: token.value,
        newPassword: params.newPassword
      })

      if (response.code === 1) {
        return { success: true, message: '密码修改成功' }
      }

      // 处理特定的错误码
      switch (response.code) {
        case -1:
          return { success: false, message: '原密码错误' }
        case -2:
          return { success: false, message: '账号已被禁用' }
        default:
          return { success: false, message: response.msg || '修改密码失败' }
      }
    } catch (error) {
      console.error('修改密码失败:', error)
      return { 
        success: false, 
        message: error instanceof Error ? error.message : '修改密码失败，请稍后重试'
      }
    }
  }

  // 添加解绑方法
  const unbind = async (unbindParams: { username: string; password: string }) => {
    try {
      const response = await memberApi.unbind(unbindParams)
      console.log('解绑响应:', response)
      
      if (response.code === 1) {
        // 解绑成功后清除用户信息
        clearUserInfo()
        return { success: true, message: '解绑成功' }
      }
      
      // 处理特定的错误码
      switch (response.code) {
        case -1:
          return { success: false, message: '用户名或密码错误' }
        case -2:
          return { success: false, message: '账号已被禁用' }
        default:
          return { success: false, message: response.msg || '解绑失败' }
      }
    } catch (error) {
      console.error('解绑失败:', error)
      return { 
        success: false, 
        message: error instanceof Error ? error.message : '解绑失败，请稍后重试'
      }
    }
  }

  return {
    token,
    username,
    memberInfo,
    isLoggedIn,
    isVip,
    vipStatus,
    login,
    logout,
    unbind,
    heartbeat,
    updatePassword,
    checkLogin,
    loadUserInfo,
    startHeartbeat,
    stopHeartbeat
  }
}) 