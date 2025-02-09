<template>
  <div class="min-h-screen bg-neu-base">
    <!-- 顶部导航栏 -->
    <nav class="navbar bg-base-100/80 backdrop-blur-sm shadow-xl sticky top-0 z-50">
      <div class="container mx-auto px-4">
        <!-- Logo 部分 -->
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <img src="../assets/icons/logo.svg" alt="FoxF" class="h-8 w-8" />
            <span class="text-xl font-bold text-primary">FoxF</span>
          </div>
        </div>

        <!-- 用户信息部分 -->
        <div class="flex items-center gap-4">
          <!-- 通知按钮容器 -->
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost btn-circle">
              <div class="indicator">
                <i class="mdi mdi-bell text-2xl"></i>
                <span class="indicator-item badge badge-primary badge-sm">{{ unreadNoticeCount }}</span>
              </div>
            </label>

            <!-- 通知面板 - 修改为页面水平居中 -->
            <div tabindex="0" 
              class="dropdown-content z-[100] card bg-base-100 shadow-2xl w-80 mt-2 fixed left-1/2 -translate-x-1/2"
              style="top: 4rem;"
            >
              <div class="card-body p-4">
                <div class="flex justify-between items-center mb-2">
                  <h3 class="font-bold">通知消息</h3>
                  <button class="btn btn-ghost btn-xs" @click="clearNotifications">
                    <i class="mdi mdi-check-all"></i>
                    全部已读
                  </button>
                </div>
                
                <div class="divider my-0"></div>
                
                <div class="space-y-2 max-h-64 overflow-y-auto">
                  <div v-for="(notice, index) in notifications" 
                    :key="notice.id"
                    class="flex items-start gap-3 p-2 hover:bg-base-200 rounded-lg cursor-pointer"
                    :class="{'opacity-50': notice.read}"
                    @click="handleNoticeClick(notice)"
                  >
                    <div class="indicator">
                      <i :class="['mdi text-lg', notice.icon, notice.color]"></i>
                      <span v-if="!notice.read" class="indicator-item badge badge-xs badge-primary"></span>
                    </div>
                    <div class="flex-1">
                      <div class="font-medium">{{ notice.title }}</div>
                      <div class="text-sm opacity-70">{{ notice.time }}</div>
                    </div>
                  </div>
                </div>
                
                <div v-if="notifications.length === 0" class="py-8 text-center opacity-50">
                  <i class="mdi mdi-bell-off text-2xl mb-2"></i>
                  <div>暂无通知</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 用户头像和菜单 -->
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar online">
              <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img 
                  :src="userAvatar" 
                  @error="handleAvatarError"
                  @load="handleAvatarLoad"
                  :class="{ 'opacity-0': !isAvatarLoaded }"
                  alt="avatar"
                />
                <div v-show="!isAvatarLoaded" class="absolute inset-0 flex items-center justify-center bg-base-200">
                  <i class="mdi mdi-account text-base-content/50 text-2xl"></i>
                </div>
              </div>
            </label>
            <ul tabindex="0" class="dropdown-content z-[1] menu menu-sm p-2 shadow-lg bg-base-100 rounded-box w-52">
              <!-- 个人信息不可点击 -->
              <li class="menu-title">
                <span class="flex justify-between items-center">
                  个人信息
                  <span class="badge badge-primary">VIP</span>
                </span>
              </li>
              
              <!-- 充值会员 -->
              <li><a @click="showRechargeModal = true">充值卡充值</a></li>
              
              <!-- 修改密码 -->
              <li><a @click="showPasswordModal = true">修改密码</a></li>
              
              <!-- 解绑设备 -->
              <li><a @click="showUnbindConfirmModal = true">解绑设备</a></li>
              
              <div class="divider my-0"></div>
              
              <!-- 退出登录 -->
              <li><a @click="showLogoutConfirmModal = true" class="text-error">退出登录</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main class="container mx-auto p-4 space-y-6">
      <!-- 欢迎卡片 - 只在非会员时显示 -->
      <div v-if="!isVip" class="card bg-base-100/80 backdrop-blur-sm shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl">欢迎回来, {{ memberInfo?.nickname || '用户' }}!</h2>
          <p>开通会员享受更多特权</p>
          <div class="card-actions justify-end">
            <button class="btn btn-secondary btn-sm" @click="showRechargeModal = true">
              立即充值
            </button>
          </div>
        </div>
      </div>

      <!-- 状态卡片区域 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 设备信息卡片 -->
        <div class="card bg-base-100/80 backdrop-blur-sm shadow-xl">
          <div class="card-body">
            <h2 class="card-title">
              <i class="mdi mdi-cellphone-link text-primary"></i>
              设备信息
            </h2>
            <div class="stats stats-vertical bg-base-200/50 shadow">
              <div class="stat">
                <div class="stat-title">手机内核</div>
                <div class="stat-value text-lg">{{ deviceInfo.kernel }}</div>
              </div>
              
              <div class="stat">
                <div class="stat-title">SELinux状态</div>
                <div class="stat-value text-lg">
                  <div class="badge" :class="deviceInfo.selinux === 'Enforcing' ? 'badge-error' : 'badge-success'">
                    {{ deviceInfo.selinux }}
                  </div>
                </div>
              </div>
              
              <div class="stat">
                <div class="stat-title">安卓版本</div>
                <div class="stat-value text-lg">{{ deviceInfo.androidVersion }}</div>
              </div>

              <div class="stat">
                <div class="stat-title">软件版本</div>
                <div class="stat-value text-lg flex items-center gap-2">
                  <span>{{ currentVersion }}</span>
                  <div v-if="latestVersion && latestVersion.num !== currentVersion" 
                    class="badge badge-primary badge-sm cursor-pointer"
                    @click="showUpdateModal"
                  >
                    有新版本
                  </div>
                </div>
                <div v-if="latestVersion && latestVersion.num !== currentVersion" class="stat-desc text-primary">
                  可更新至 {{ latestVersion.num }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 会员状态卡片 -->
        <div class="card bg-base-100/80 backdrop-blur-sm shadow-xl">
          <div class="card-body">
            <h2 class="card-title">
              <i class="mdi mdi-account-check text-primary"></i>
              会员状态
            </h2>
            <div class="stats stats-vertical bg-base-200/50 shadow">
              <div class="stat">
                <div class="stat-title">会员等级</div>
                <div class="stat-value text-lg">
                  <div class="badge badge-primary">{{ memberInfo?.userLevelName || '普通用户' }}</div>
                </div>
              </div>
              
              <div class="stat">
                <div class="stat-title">到期时间</div>
                <div class="stat-value text-lg" :class="{'text-error': !memberInfo?.isMember}">
                  {{ formatEndTime }}
                </div>
                <div class="stat-desc" v-if="memberInfo?.isMember">
                  开通时间: {{ formatFromTime }}
                </div>
              </div>
              
              <div class="stat">
                <div class="stat-title">成长值</div>
                <div class="stat-value text-lg">{{ memberInfo?.growth || 0 }}</div>
                <progress 
                  class="progress progress-primary w-full" 
                  :value="memberInfo?.growth || 0" 
                  max="100"
                ></progress>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 功能按钮区域 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="(btn, index) in functionButtons" 
          :key="index" 
          class="card shadow-xl transition-all hover:shadow-2xl backdrop-blur-sm"
          :class="[
            btn.disabled ? 'opacity-60 cursor-not-allowed bg-base-100/60' : 'bg-base-100/80',
          ]"
        >
          <div class="card-body items-center text-center">
            <i :class="['mdi text-4xl mb-2', btn.icon]"></i>
            <h2 class="card-title">{{ btn.title }}</h2>
            <p>{{ btn.description }}</p>
            <div class="card-actions justify-end">
              <button 
                class="btn btn-sm glass"
                :disabled="btn.disabled"
                @click="btn.handler"
              >
                立即使用
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 模态框示例 -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">标题</h3>
        <!-- 内容 -->
        <div class="flex justify-end space-x-2">
          <button 
            class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            @click="showModal = false"
          >
            取消
          </button>
          <button 
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            @click="handleConfirm"
          >
            确认
          </button>
        </div>
      </div>
    </div>

    <!-- 添加充值卡模态框 -->
    <dialog :class="{'modal modal-open': showRechargeModal}" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">充值卡充值</h3>
        <div class="py-4 space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">充值卡卡号</span>
            </label>
            <input 
              type="text" 
              v-model="rechargeCode"
              placeholder="请输入16-32位充值卡卡号"
              class="input input-bordered w-full"
              :class="{'input-error': rechargeCode && (rechargeCode.length < 16 || rechargeCode.length > 32)}"
            />
            <label class="label" v-if="rechargeCode && (rechargeCode.length < 16 || rechargeCode.length > 32)">
              <span class="label-text-alt text-error">充值码长度应在16-32之间</span>
            </label>
          </div>
          <div class="alert alert-info shadow-lg">
            <i class="mdi mdi-information"></i>
            <span>充值成功后会自动刷新会员状态</span>
          </div>
        </div>
        <div class="modal-action">
          <button class="btn" @click="showRechargeModal = false">取消</button>
          <button 
            class="btn btn-primary" 
            @click="handleRecharge"
            :disabled="!rechargeCode || rechargeCode.length < 16 || rechargeCode.length > 32"
          >
            确认充值
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="showRechargeModal = false">关闭</button>
      </form>
    </dialog>

    <!-- 修改密码模态框 -->
    <dialog :class="{'modal modal-open': showPasswordModal}" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">修改密码</h3>
        <div class="py-4 space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">原密码</span>
            </label>
            <input 
              type="password" 
              v-model="oldPassword"
              placeholder="请输入原密码"
              class="input input-bordered w-full"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">新密码</span>
            </label>
            <input 
              type="password" 
              v-model="newPassword"
              placeholder="请输入新密码"
              class="input input-bordered w-full"
              :class="{'input-error': newPassword && newPassword.length < 6}"
            />
            <label class="label" v-if="newPassword && newPassword.length < 6">
              <span class="label-text-alt text-error">密码长度不能小于6位</span>
            </label>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">确认新密码</span>
            </label>
            <input 
              type="password" 
              v-model="confirmPassword"
              placeholder="请确认新密码"
              class="input input-bordered w-full"
              :class="{'input-error': confirmPassword && confirmPassword !== newPassword}"
            />
            <label class="label" v-if="confirmPassword && confirmPassword !== newPassword">
              <span class="label-text-alt text-error">两次输入的密码不一致</span>
            </label>
          </div>
          <div class="alert alert-info shadow-lg">
            <i class="mdi mdi-information"></i>
            <span>修改密码后需要重新登录</span>
          </div>
        </div>
        <div class="modal-action">
          <button class="btn" @click="showPasswordModal = false">取消</button>
          <button 
            class="btn btn-primary" 
            @click="handleUpdatePassword"
            :disabled="!oldPassword || !newPassword || !confirmPassword || 
                      newPassword.length < 6 || newPassword !== confirmPassword"
          >
            确认修改
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="showPasswordModal = false">关闭</button>
      </form>
    </dialog>

    <!-- 解绑确认模态框 -->
    <dialog :class="{'modal modal-open': showUnbindConfirmModal}" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg text-warning">解绑确认</h3>
        <p class="py-4">解绑设备后需要重新登录，确定要继续吗？</p>
        <div class="modal-action">
          <button class="btn" @click="showUnbindConfirmModal = false">取消</button>
          <button class="btn btn-warning" @click="handleUnbind">确认解绑</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="showUnbindConfirmModal = false">关闭</button>
      </form>
    </dialog>

    <!-- 退出确认模态框 -->
    <dialog :class="{'modal modal-open': showLogoutConfirmModal}" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg text-error">退出确认</h3>
        <p class="py-4">确定要退出登录吗？</p>
        <div class="modal-action">
          <button class="btn" @click="showLogoutConfirmModal = false">取消</button>
          <button class="btn btn-error" @click="handleLogout">确认退出</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="showLogoutConfirmModal = false">关闭</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { memberApi } from '../api/member'
import skullRabbit from '../assets/icons/骷髅小兔子.svg'

const router = useRouter()
const userStore = useUserStore()

// 添加工单检查定时器变量
let workCheckInterval: number | undefined

// 简化状态管理
const deviceInfo = ref({
  kernel: '',
  selinux: '',
  androidVersion: ''
})

const memberInfo = computed(() => userStore.memberInfo)
const isVip = computed(() => userStore.isVip)
const remainingFlashes = ref(3)
const username = computed(() => userStore.username)

// UI 状态控制
const showToast = ref(false)
const toastMessage = ref('')
const toastSuccess = ref(false)
const showRechargeModal = ref(false)
const showPasswordModal = ref(false)
const showUnbindConfirmModal = ref(false)
const showLogoutConfirmModal = ref(false)

// 表单数据
const rechargeCode = ref('')
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

// 计算属性
const canFlashDriver = computed(() => isVip.value || remainingFlashes.value > 0)
const formatEndTime = computed(() => {
  if (!memberInfo.value?.endTime) return '未开通'
  return formatDateTime(memberInfo.value.endTime)
})
const formatFromTime = computed(() => {
  if (!memberInfo.value?.fromTime) return ''
  return formatDateTime(memberInfo.value.fromTime)
})
const isNearExpire = computed(() => {
  if (!memberInfo.value?.endTime) return false
  const endDate = new Date(memberInfo.value.endTime)
  const now = new Date()
  const diffDays = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diffDays <= 7 && diffDays > 0
})

// 充值选项
const rechargeOptions = [
  { amount: 30, description: '月卡会员' },
  { amount: 80, description: '季卡会员' },
  { amount: 150, description: '半年卡会员' },
  { amount: 280, description: '年卡会员' }
]

// 数据就绪状态
const isDataReady = ref(false)

// 功能按钮配置
const functionButtons = computed(() => [
  {
    title: '驱动刷入',
    icon: 'mdi-flash',
    description: isVip.value ? '无限制使用' : `今日剩余次数：${remainingFlashes.value}`,
    bgClass: 'bg-primary text-primary-content',
    disabled: !canFlashDriver.value,
    handler: handleDriverFlash
  },
  {
    title: '全功能开启',
    icon: 'mdi-star',
    description: '会员专享功能',
    bgClass: 'bg-secondary text-secondary-content',
    disabled: !isVip.value,
    handler: () => {}
  },
  {
    title: '单透开启',
    icon: 'mdi-eye',
    description: '免费功能',
    bgClass: 'bg-accent text-accent-content',
    disabled: false,
    handler: () => {}
  }
])

// 方法定义
const showToastMessage = (message: string, success: boolean) => {
  toastMessage.value = message
  toastSuccess.value = success
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// 修改头像相关的状态
const isAvatarLoaded = ref(false)
const avatarLoadError = ref(false)

// 修改 userAvatar 计算属性
const userAvatar = computed(() => {
  if (avatarLoadError.value) {
    return skullRabbit
  }
  return memberInfo.value?.avatar || skullRabbit
})

// 修改头像错误处理函数
const handleAvatarError = () => {
  avatarLoadError.value = true
  isAvatarLoaded.value = false
}

// 修改头像加载完成处理函数
const handleAvatarLoad = () => {
  isAvatarLoaded.value = true
}

// 在组件卸载时重置状态
onUnmounted(() => {
  isAvatarLoaded.value = false
  avatarLoadError.value = false
  // 清理定时器
  if (workCheckInterval) {
    clearInterval(workCheckInterval)
    workCheckInterval = undefined
  }
})

const handleError = (error: unknown) => {
  console.error('操作失败:', error)
  showToastMessage('操作失败，请稍后重试', false)
}

// 修改充值处理函数
const handleRecharge = async () => {
  if (!rechargeCode.value) {
    showToastMessage('请输入充值卡卡号', false)
    return
  }

  if (rechargeCode.value.length < 16 || rechargeCode.value.length > 32) {
    showToastMessage('充值码长度应在16-32之间', false)
    return
  }

  try {
    const response = await memberApi.recharge({
      username: username.value,
      card: rechargeCode.value
    })

    if (response.code === 1) {
      showToastMessage('充值成功', true)
      showRechargeModal.value = false
      rechargeCode.value = ''
      
      // 刷新会员信息
      await userStore.loadUserInfo()
    } else {
      showToastMessage(response.msg || '充值失败', false)
    }
  } catch (error) {
    console.error('充值失败:', error)
    if (error instanceof Error) {
      showToastMessage(error.message, false)
    } else {
      showToastMessage('充值失败，请稍后重试', false)
    }
  }
}

// 修改密码处理函数
const handleUpdatePassword = async () => {
  if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
    showToastMessage('请填写完整信息', false)
    return
  }

  if (newPassword.value.length < 6) {
    showToastMessage('新密码长度不能小于6位', false)
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    showToastMessage('两次输入的新密码不一致', false)
    return
  }

  try {
    const result = await userStore.updatePassword({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    })
    
    if (result.success) {
      showToastMessage(result.message, true)
      showPasswordModal.value = false
      // 清空表单
      oldPassword.value = ''
      newPassword.value = ''
      confirmPassword.value = ''
      // 修改密码成功后跳转到登录页
      setTimeout(() => {
        userStore.logout()
        router.push('/login')
      }, 1500)
    } else {
      showToastMessage(result.message, false)
    }
  } catch (error) {
    console.error('修改密码失败:', error)
    showToastMessage('修改密码失败，请稍后重试', false)
  }
}

// 修改解绑处理函数
const handleUnbind = async () => {
  try {
    const result = await userStore.unbind()
    if (result.success) {
      showToastMessage('解绑成功', true)
      showUnbindConfirmModal.value = false
      router.push('/login')
    } else {
      showToastMessage(result.message, false)
    }
  } catch (error) {
    console.error('解绑错误:', error)
    showToastMessage('解绑失败，请稍后重试', false)
  }
}

// 修改登出处理函数
const handleLogout = async () => {
  try {
    const result = await userStore.logout()
    if (result.success) {
      showToastMessage('已安全退出', true)
      showLogoutConfirmModal.value = false
      router.push('/login')
    } else {
      showToastMessage(result.message, false)
    }
  } catch (error) {
    console.error('登出错误:', error)
    showToastMessage('登出失败，请重试', false)
  }
}

const handleDriverFlash = () => {
  if (!canFlashDriver.value) {
    showToastMessage('今日次数已用完，开通会员享无限次数', false)
    return
  }

  // TODO: 实现驱动刷入逻辑
  if (!isVip.value) {
    remainingFlashes.value--
  }
  showToastMessage('驱动刷入成功', true)
}

// 修改版本相关的状态
const currentVersion = ref('1.1') // 从 1.0 改为 1.1

// 添加版本号比较函数
const compareVersions = (v1: string, v2: string) => {
  const normalize = (v: string) => {
    // 将版本号标准化，例如 "1.0" 转换为 "1.0.0"
    const parts = v.split('.')
    while (parts.length < 3) parts.push('0')
    return parts.map(Number)
  }

  const v1Parts = normalize(v1)
  const v2Parts = normalize(v2)

  for (let i = 0; i < 3; i++) {
    if (v1Parts[i] !== v2Parts[i]) {
      return v1Parts[i] - v2Parts[i]
    }
  }
  return 0
}

// 修改工单相关状态
const workTypes = ref<Array<WorkType>>([])
const lastWorkCount = ref(0) // 添加上次工单数量记录

// 添加已读通知存储
const readNoticeIds = ref<Set<string>>(new Set(JSON.parse(localStorage.getItem('readNotices') || '[]')))

// 修改通知类型
interface Notice {
  id: string      // 添加唯一标识
  title: string
  time: string
  icon: string
  color: string
  read: boolean
  onClick?: () => void
}

// 修改通知列表状态
const notifications = ref<Notice[]>([])

// 修改更新通知列表函数
const updateNotifications = async () => {
  const noticeList: Notice[] = []
  
  // 会员到期提醒
  if (memberInfo.value?.endTime) {
    const endDate = new Date(memberInfo.value.endTime)
    const now = new Date()
    const diffDays = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays <= 7 && diffDays > 0) {
      const id = `expire_${memberInfo.value.endTime}`
      noticeList.push({
        id,
        title: `会员即将在${diffDays}天后到期`,
        time: '重要提醒',
        icon: 'mdi-clock-alert',
        color: 'text-warning',
        read: readNoticeIds.value.has(id)
      })
    }
  }

  // 工单提醒
  try {
    if (userStore.token) {
      const types = await memberApi.getWorkTypes(userStore.token)
      if (types && types.length > 0) {
        const totalCount = types.reduce((sum, type) => sum + (type.count || 0), 0)
        const id = `work_${totalCount}`
        
        if (totalCount > lastWorkCount.value || lastWorkCount.value === 0) {
          noticeList.push({
            id,
            title: `您有 ${totalCount} 个待处理工单`,
            time: '工单提醒',
            icon: 'mdi-ticket',
            color: 'text-info',
            read: readNoticeIds.value.has(id),
            onClick: () => showWorkTypesModal(types)
          })
        }
        
        workTypes.value = types
        lastWorkCount.value = totalCount
      }
    }
  } catch (error) {
    console.error('获取工单类型失败:', error)
  }

  notifications.value = noticeList
}

// 添加更新模态框
const showUpdateModal = () => {
  if (!latestVersion.value) return
  
  const modal = document.createElement('dialog')
  modal.className = 'modal modal-open'
  modal.innerHTML = `
    <div class="modal-box">
      <h3 class="font-bold text-lg">发现新版本 ${latestVersion.value.num}</h3>
      <div class="py-4 space-y-4">
        <div class="space-y-2">
          <div class="font-medium">${latestVersion.value.name}</div>
          <div class="whitespace-pre-line text-sm opacity-70">${latestVersion.value.content}</div>
        </div>
        ${latestVersion.value.forced === 1 ? `
          <div class="alert alert-error">
            <i class="mdi mdi-alert"></i>
            <span>此版本为强制更新，请尽快更新</span>
          </div>
        ` : ''}
      </div>
      <div class="modal-action">
        ${latestVersion.value.forced === 0 ? `
          <button class="btn" onclick="this.closest('dialog').close()">暂不更新</button>
        ` : ''}
        <a 
          href="${latestVersion.value.addr}" 
          target="_blank" 
          class="btn btn-primary"
        >
          立即更新
        </a>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>关闭</button>
    </form>
  `
  document.body.appendChild(modal)
  modal.showModal()
  
  modal.addEventListener('close', () => {
    document.body.removeChild(modal)
  })
}

// 在初始化函数中添加版本检查
const initializeData = async () => {
  try {
    // 检查登录状态
    if (!userStore.isLoggedIn) {
      const success = await userStore.loadUserInfo()
      if (!success) {
        router.push('/login')
        return
      }
    }

    // 并行加载数据
    await Promise.all([
      // 获取设备信息
      new Promise(resolve => {
        deviceInfo.value = {
          kernel: 'Linux 5.10.101',
          selinux: 'Permissive',
          androidVersion: 'Android 12'
        }
        resolve(true)
      }),
      // 获取会员信息
      (async () => {
        if (!memberInfo.value) {
          await userStore.loadUserInfo()
        }
      })(),
      // 检查版本更新
      updateNotifications()
    ])

    // 所有数据加载完成后设置状态
    isDataReady.value = true
  } catch (error) {
    console.error('初始化失败:', error)
    showToastMessage('加载数据失败，请刷新重试', false)
  }
}

// 生命周期钩子
onMounted(async () => {
  if (!userStore.isLoggedIn) {
    const success = await userStore.loadUserInfo()
    if (!success) {
      router.push('/login')
      return
    }
  }

  // 设置设备信息
  deviceInfo.value = {
    kernel: 'Linux 5.10.101',
    selinux: 'Permissive',
    androidVersion: 'Android 12'
  }

  // 添加定时检查工单
  workCheckInterval = window.setInterval(() => {
    updateNotifications()
  }, 30000) // 每30秒检查一次
})

// 通知相关状态
const showNotifications = ref(false)

// 修改通知数量显示
const unreadNoticeCount = computed(() => {
  return notifications.value.filter(notice => !notice.read).length
})

// 格式化时间的工具函数
const formatDateTime = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 修改清除所有通知函数
const clearNotifications = () => {
  // 将所有通知标记为已读
  notifications.value.forEach(notice => {
    notice.read = true
    readNoticeIds.value.add(notice.id)
  })
  
  // 保存到本地存储
  localStorage.setItem('readNotices', JSON.stringify([...readNoticeIds.value]))
}

// 添加单个通知标记为已读的函数
const markAsRead = (notice: Notice) => {
  notice.read = true
  readNoticeIds.value.add(notice.id)
  localStorage.setItem('readNotices', JSON.stringify([...readNoticeIds.value]))
}

// 修改通知点击处理
const handleNoticeClick = (notice: Notice) => {
  if (!notice.read) {
    markAsRead(notice)
  }
  notice.onClick?.()
}

// 添加工单详情模态框
const showWorkTypesModal = (types: WorkType[]) => {
  const modal = document.createElement('dialog')
  modal.className = 'modal modal-open'
  modal.innerHTML = `
    <div class="modal-box">
      <h3 class="font-bold text-lg">工单列表</h3>
      <div class="py-4">
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>工单类型</th>
                <th>待处理数量</th>
              </tr>
            </thead>
            <tbody>
              ${types.map(type => `
                <tr>
                  <td>${type.name}</td>
                  <td>${type.count || 0}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-action">
        <button class="btn" onclick="this.closest('dialog').close()">关闭</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>关闭</button>
    </form>
  `
  document.body.appendChild(modal)
  modal.showModal()
  
  modal.addEventListener('close', () => {
    document.body.removeChild(modal)
  })
}
</script>

<style scoped>
/* 修改卡片悬浮效果 */
.card {
  @apply transition-all duration-300 ease-in-out;
}

.card:hover:not(.cursor-not-allowed) {
  @apply transform -translate-y-1 shadow-2xl;
  background-color: theme('colors.base-100');
}

/* 修改状态卡片样式 */
.stats {
  @apply rounded-box backdrop-blur-sm;
}

.stat:hover {
  @apply bg-base-200/80;
}

/* 修改通知面板样式 */
.dropdown-content {
  @apply transition-all duration-200;
  transform-origin: top center;
}
</style> 