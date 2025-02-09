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
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // 尝试解析 JSON，不管 Content-Type
    try {
      const data = await response.json()
      console.log('请求响应:', data)
      return data
    } catch (error) {
      console.error('JSON 解析失败:', error)
      // 如果 JSON 解析失败，再检查 Content-Type
      const contentType = response.headers.get('content-type')
      console.error('响应类型:', contentType)
      const text = await response.text()
      console.error('响应内容:', text)
      throw new Error('响应格式错误')
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

  // 解绑设备
  unbind: async (unbindParams: { username: string; password: string }) => {
    const timestamp = Date.now().toString()
    const mac = getMachineCode()
    
    const signStr = `appId=${APP_ID}&mac=${mac}&password=${unbindParams.password}&timestamp=${timestamp}&username=${unbindParams.username}${APP_KEY}`
    const signature = md5(signStr)

    const searchParams = new URLSearchParams({
      appId: APP_ID.toString(),
      username: unbindParams.username,
      password: unbindParams.password,
      mac: mac,
      timestamp: timestamp,
      signature: signature
    })

    const response = await fetch(
      `/api/member/unbind?${searchParams.toString()}`,
      {
        method: 'GET',
      }
    )

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return response.json()
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
  heart: async (token: string) => {
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

    return makeRequest(`/api/member/heart?${searchParams.toString()}`, {
      method: 'GET',
      credentials: 'include'
    })
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

    const response = await fetch(
      `/api/member/logout?${searchParams.toString()}`,
      {
        method: 'GET'
      }
    )

    return response.json()
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

    const response = await fetch(
      `/api/member/update-pwd?${searchParams.toString()}`,
      {
        method: 'GET'
      }
    )

    return response.json()
  },

  // 心跳请求
  heartbeat: () => {
    return request.post('/member/heartbeat')
  }
}; 