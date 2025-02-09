import { md5 } from 'js-md5';
import { getMachineCode } from '../utils/device';
import request from '../utils/request'

interface LoginResponse {
  msg: string;
  code: number;
  data: {
    isVip: boolean;
    username: string;
    token: string;
  };
  signature: string;
  timestamp: string;
}

interface MemberInfoResponse {
  msg: string;
  code: number;
  data: {
    memberLevel: number;
    isMember: number;
    macCount: number;
    isDisable: number;
    userLevelName: string;
    appId: number;
    fromTime: string;
    endTime: string;
    nickname: string;
    growth: number;
    id: number;
    username: string;
  };
  signature: string;
  timestamp: string;
}

interface HeartbeatResponse {
  msg: string;
  code: number;
  data: {
    isVip: boolean;
  };
  signature: string;
  timestamp: string;
}

interface RechargeResponse {
  msg: string;
  code: number;
  signature: string;
  timestamp: string;
}

interface UpdatePasswordResponse {
  msg: string;
  code: number;
  signature: string;
  timestamp: string;
}

// 添加版本信息接口
interface VersionInfo {
  isDisable: number // 0-正常 1-禁用中
  developerId: number
  forced: number // 0-不强制 1-强制
  appId: number
  num: string
  name: string
  updateTime: string
  id: number
  addr: string
  content: string
}

interface VersionResponse {
  msg: string
  code: number
  data: VersionInfo
  signature: string
  timestamp: string
}

// 添加工单类型接口
interface WorkType {
  id: number
  name: string
  count?: number // 添加工单数量字段
}

interface WorkTypeResponse {
  msg: string
  code: number
  data: Array<WorkType>
  signature: string
  timestamp: string
}

// 修改解绑接口
interface UnbindResponse {
  msg: string
  code: number
  signature: string
  timestamp: string
}

const APP_KEY = 'r08urpht0vbhx2vt';
const APP_ID = 82;

// 修改通用的请求处理函数
const makeRequest = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    })

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`网络请求失败: ${response.status}`)
    }

    const text = await response.text()
    try {
      const data = JSON.parse(text)
      console.log('请求响应:', data)
      
      if (typeof data !== 'object' || data === null) {
        throw new Error('服务器响应格式错误')
      }

      // 处理业务错误码
      if (data.code !== 1 && data.msg) {
        console.warn('业务错误:', data.msg)
      }

      return data
    } catch (parseError) {
      console.error('JSON 解析失败:', parseError)
      console.error('原始响应:', text)
      throw new Error('服务器响应格式错误')
    }
  } catch (error) {
    console.error('请求失败:', error)
    throw error
  }
}

export const memberApi = {
  // 用户登录
  login: async (loginParams: {
    username: string;
    password: string;
  }): Promise<LoginResponse> => {
    const timestamp = Date.now().toString()
    const mac = getMachineCode()
    
    const signStr = `appId=${APP_ID}&mac=${mac}&password=${loginParams.password}&timestamp=${timestamp}&username=${loginParams.username}${APP_KEY}`
    const signature = md5(signStr)

    const searchParams = new URLSearchParams({
      appId: APP_ID.toString(),
      username: loginParams.username,
      password: loginParams.password,
      mac: mac,
      timestamp: timestamp,
      signature: signature
    })

    const response = await fetch(
      `/api/member/login?${searchParams.toString()}`,
      {
        method: 'GET',
      }
    )

    const data = await response.json()
    console.log('登录响应:', data)
    return data
  },

  // 注册
  register: async (params: {
    username: string;
    password: string;
    nickname: string;
  }) => {
    const timestamp = Date.now().toString()
    const mac = getMachineCode()
    
    const signStr = `appId=${APP_ID}&mac=${mac}&nickname=${params.nickname}&password=${params.password}&timestamp=${timestamp}&username=${params.username}${APP_KEY}`
    const signature = md5(signStr)

    const searchParams = new URLSearchParams({
      appId: APP_ID.toString(),
      username: params.username,
      password: params.password,
      nickname: params.nickname,
      mac: mac,
      timestamp: timestamp,
      signature: signature
    })

    const response = await fetch(
      `/api/member/register?${searchParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )

    return response.json()
  },

  // 修改解绑接口
  unbind: async (unbindParams: { username: string; password: string }) => {
    const timestamp = Date.now().toString()
    const mac = getMachineCode()
    
    const signStr = `appId=${APP_ID}&mac=${mac}&originalMac=${mac}&timestamp=${timestamp}&username=${unbindParams.username}${APP_KEY}`
    const signature = md5(signStr)

    const searchParams = new URLSearchParams({
      appId: APP_ID.toString(),
      username: unbindParams.username,
      originalMac: mac, // 添加原机器码参数
      mac: mac,
      timestamp: timestamp,
      signature: signature
    })

    try {
      const response = await makeRequest(`/api/member/unbind?${searchParams.toString()}`, {
        method: 'GET',
        credentials: 'include'
      }) as UnbindResponse

      if (response.code === 1) {
        return response
      }
      
      throw new Error(response.msg || '解绑失败')
    } catch (error) {
      console.error('解绑请求失败:', error)
      throw error
    }
  },

  // 获取会员信息
  getMemberInfo: async (token: string): Promise<MemberInfoResponse> => {
    const timestamp = Date.now().toString()
    const mac = getMachineCode()
    
    const signStr = `appId=${APP_ID}&mac=${mac}&timestamp=${timestamp}&token=${token}${APP_KEY}`
    const signature = md5(signStr)

    const searchParams = new URLSearchParams({
      appId: APP_ID.toString(),
      token: token,
      mac: mac,
      timestamp: timestamp,
      signature: signature
    })

    return makeRequest(`/api/member/info?${searchParams.toString()}`, {
      method: 'GET',
      credentials: 'include'
    })
  },

  // 用户心跳
  heart: async (token: string): Promise<HeartbeatResponse> => {
    const timestamp = Date.now().toString()
    const mac = getMachineCode()
    
    const signStr = `appId=${APP_ID}&mac=${mac}&timestamp=${timestamp}&token=${token}${APP_KEY}`
    const signature = md5(signStr)

    const searchParams = new URLSearchParams({
      appId: APP_ID.toString(),
      token: token,
      mac: mac,
      timestamp: timestamp,
      signature: signature
    })

    try {
      const response = await makeRequest(`/api/member/heart?${searchParams.toString()}`, {
        method: 'GET',
        credentials: 'include'
      }) as HeartbeatResponse

      // 根据 API 文档验证响应结构
      if (response.code === 1 && response.msg === "心跳成功") {
        return response
      }
      
      throw new Error(response.msg || '心跳请求失败')
    } catch (error) {
      console.error('心跳请求失败:', error)
      throw error
    }
  },

  // 用户登出
  logout: async (token: string) => {
    const timestamp = Date.now().toString()
    const mac = getMachineCode()
    
    const signStr = `appId=${APP_ID}&mac=${mac}&timestamp=${timestamp}&token=${token}${APP_KEY}`
    const signature = md5(signStr)

    const searchParams = new URLSearchParams({
      appId: APP_ID.toString(),
      token: token,
      mac: mac,
      timestamp: timestamp,
      signature: signature
    })

    try {
      const response = await makeRequest(`/api/member/logout?${searchParams.toString()}`, {
        method: 'GET',
        credentials: 'include'
      })

      if (response.code === 1) {
        return response
      }
      
      throw new Error(response.msg || '登出失败')
    } catch (error) {
      console.error('登出请求失败:', error)
      throw error
    }
  },

  // 修改密码
  updatePassword: async (params: { token: string; newPassword: string }) => {
    const timestamp = Date.now().toString()
    const mac = getMachineCode()
    
    const signStr = `appId=${APP_ID}&mac=${mac}&newPassword=${params.newPassword}&timestamp=${timestamp}&token=${params.token}${APP_KEY}`
    const signature = md5(signStr)

    const searchParams = new URLSearchParams({
      appId: APP_ID.toString(),
      token: params.token,
      newPassword: params.newPassword,
      mac: mac,
      timestamp: timestamp,
      signature: signature
    })

    try {
      const response = await makeRequest(`/api/member/update-pwd?${searchParams.toString()}`, {
        method: 'GET',
        credentials: 'include'
      }) as UpdatePasswordResponse

      if (response.code === 1) {
        return response
      }
      
      throw new Error(response.msg || '修改密码失败')
    } catch (error) {
      console.error('修改密码请求失败:', error)
      throw error
    }
  },

  // 心跳请求
  heartbeat: () => {
    return request.post('/member/heartbeat')
  },

  // 添加充值方法
  recharge: async (params: { username: string; card: string }) => {
    const timestamp = Date.now().toString()
    const mac = getMachineCode()
    
    const signStr = `appId=${APP_ID}&card=${params.card}&mac=${mac}&timestamp=${timestamp}&username=${params.username}${APP_KEY}`
    const signature = md5(signStr)

    const searchParams = new URLSearchParams({
      appId: APP_ID.toString(),
      username: params.username,
      card: params.card,
      mac: mac,
      timestamp: timestamp,
      signature: signature
    })

    try {
      const response = await makeRequest(`/api/member/recharge?${searchParams.toString()}`, {
        method: 'GET',
        credentials: 'include'
      }) as RechargeResponse

      if (response.code === 1) {
        return response
      }
      
      throw new Error(response.msg || '充值失败')
    } catch (error) {
      console.error('充值请求失败:', error)
      throw error
    }
  },

  // 添加获取最新版本方法
  getLatestVersion: async () => {
    const timestamp = Date.now().toString()
    const mac = getMachineCode()
    
    const signStr = `appId=${APP_ID}&mac=${mac}&timestamp=${timestamp}${APP_KEY}`
    const signature = md5(signStr)

    const searchParams = new URLSearchParams({
      appId: APP_ID.toString(),
      mac: mac,
      timestamp: timestamp,
      signature: signature
    })

    try {
      const response = await makeRequest(`/api/expand/new-ver?${searchParams.toString()}`, {
        method: 'GET',
        credentials: 'include'
      }) as VersionResponse

      if (response.code === 1) {
        return response.data
      }
      
      throw new Error(response.msg || '获取版本信息失败')
    } catch (error) {
      console.error('获取版本信息失败:', error)
      throw error
    }
  },

  // 添加获取工单类型方法
  getWorkTypes: async (token: string) => {
    const timestamp = Date.now().toString()
    const mac = getMachineCode()
    
    const signStr = `appId=${APP_ID}&mac=${mac}&timestamp=${timestamp}&token=${token}${APP_KEY}`
    const signature = md5(signStr)

    const searchParams = new URLSearchParams({
      appId: APP_ID.toString(),
      token: token,
      mac: mac,
      timestamp: timestamp,
      signature: signature
    })

    try {
      const response = await makeRequest(`/api/member/get-work-type?${searchParams.toString()}`, {
        method: 'GET',
        credentials: 'include'
      }) as WorkTypeResponse

      if (response.code === 1) {
        return response.data
      }
      
      throw new Error(response.msg || '获取工单类型失败')
    } catch (error) {
      console.error('获取工单类型失败:', error)
      throw error
    }
  }
}; 