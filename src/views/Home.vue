<template>
  <div class="min-h-screen bg-neu-base px-4 py-6 animate-fade-in">
    <!-- 顶部导航栏 -->
    <div class="flex justify-between items-center mb-6 relative z-50 animate-slide-down">
      <h1 class="text-[24px] font-medium leading-[1.2] tracking-[-0.5px]">
        <span class="relative inline-flex items-baseline logo-text">
          <span class="inline-block font-bold">
            <span class="text-neu-text-primary">Fox</span>
            <span class="text-neu-text-accent">F</span>
          </span>
          <span class="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#475569] to-[#334155] opacity-0 animate-line-expand"></span>
        </span>
      </h1>
      
      <!-- 头像和下拉菜单 -->
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle hover:rotate-12 transition-all duration-300">
          <div class="avatar online">
            <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 transition-all duration-300 hover:scale-110">
              <img 
                src="../assets/icons/骷髅小兔子.svg" 
                alt="avatar"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </label>
        <ul tabindex="0" class="dropdown-content z-[60] menu p-2 shadow-neu-convex bg-neu-base rounded-box w-52 mt-4 animate-slide-up">
          <li>
            <a class="text-neu-text-primary hover:translate-x-1 transition-all duration-300" @click="showRechargeModal = true">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              充值
            </a>
          </li>
          <li>
            <a class="text-neu-text-primary hover:translate-x-1 transition-all duration-300" @click="handleUnbind">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
              </svg>
              解绑账号
            </a>
          </li>
          <li>
            <a class="text-neu-text-primary hover:translate-x-1 transition-all duration-300" @click="showPasswordModal = true">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              修改密码
            </a>
          </li>
          <div class="divider my-1"></div>
          <li>
            <a class="text-neu-text-primary hover:translate-x-1 transition-all duration-300" @click="handleLogout">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              退出登录
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- 信息卡片 -->
    <div class="space-y-4 mb-6 relative z-40 animate-slide-up animation-delay-100">
      <div class="card bg-neu-base shadow-neu-convex rounded-[20px] p-6 transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
        <!-- 装饰泡泡 -->
        <div class="bubble-container">
          <div class="bubble bubble-1"></div>
          <div class="bubble bubble-2"></div>
          <div class="bubble bubble-3"></div>
        </div>
        <!-- 卡片内容 -->
        <div class="relative z-10">
          <h2 class="text-[20px] font-medium text-neu-text-primary mb-4">设备信息</h2>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-neu-text-secondary">手机内核</span>
              <span class="text-neu-text-primary">{{ deviceInfo.kernel }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-neu-text-secondary">SELinux状态</span>
              <span 
                class="px-2 py-1 rounded-full text-sm"
                :class="deviceInfo.selinux === 'Enforcing' ? 'bg-[#F87171]/10 text-[#F87171]' : 'bg-[#34D399]/10 text-[#34D399]'"
              >
                {{ deviceInfo.selinux }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-neu-text-secondary">安卓版本</span>
              <span class="text-neu-text-primary">{{ deviceInfo.androidVersion }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-neu-text-secondary">系统指纹</span>
              <span class="text-neu-text-primary text-xs">{{ deviceInfo.fingerprint }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-neu-base shadow-neu-convex rounded-[20px] p-6 transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
        <!-- 装饰泡泡 -->
        <div class="bubble-container">
          <div class="bubble bubble-4"></div>
          <div class="bubble bubble-5"></div>
          <div class="bubble bubble-6"></div>
        </div>
        <!-- 卡片内容 -->
        <div class="relative z-10">
          <h2 class="text-[20px] font-medium text-neu-text-primary mb-4">会员状态</h2>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-neu-text-secondary">会员等级</span>
              <div class="badge" :class="memberInfo?.memberLevel > 0 ? 'badge-primary' : 'badge-ghost'">
                {{ memberInfo?.userLevelName || '普通用户' }}
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-neu-text-secondary">会员状态</span>
              <div 
                class="badge" 
                :class="memberInfo?.isMember === 1 ? 'badge-success' : 'badge-warning'"
              >
                {{ memberInfo?.isMember === 1 ? '已开通' : '未开通' }}
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-neu-text-secondary">开通时间</span>
              <span class="text-neu-text-primary">{{ memberInfo?.fromTime || '未开通' }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-neu-text-secondary">到期时间</span>
              <span 
                :class="[
                  'text-neu-text-primary',
                  memberInfo?.isMember === 1 ? (isNearExpire(memberInfo.endTime) ? 'text-warning' : '') : 'text-error'
                ]"
              >
                {{ memberInfo?.endTime || '未开通' }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-neu-text-secondary">成长值</span>
              <span class="text-neu-text-primary">{{ memberInfo?.growth || 0 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能按钮 -->
    <div class="grid grid-cols-2 gap-4 animate-slide-up animation-delay-200">
      <button 
        class="btn h-[80px] normal-case rounded-[16px] bg-neu-base shadow-neu-convex hover:shadow-neu-flat active:shadow-neu-pressed transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]"
        @click="handleDriverFlash"
        :disabled="!canFlashDriver"
      >
        <div class="flex flex-col items-center">
          <span class="text-neu-text-primary text-[16px] mb-1">驱动刷入</span>
          <span class="text-neu-text-secondary text-[12px]">
            {{ isVip ? '无限制' : '今日剩余次数：' + remainingFlashes }}
          </span>
        </div>
      </button>

      <button 
        class="btn h-[80px] normal-case rounded-[16px] bg-neu-base shadow-neu-convex hover:shadow-neu-flat active:shadow-neu-pressed transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]"
        :disabled="!isVip"
      >
        <div class="flex flex-col items-center">
          <span class="text-neu-text-primary text-[16px] mb-1">全功能开启</span>
          <span class="text-neu-text-secondary text-[12px]">会员专享</span>
        </div>
      </button>

      <button 
        class="btn h-[80px] normal-case rounded-[16px] bg-neu-base shadow-neu-convex hover:shadow-neu-flat active:shadow-neu-pressed transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]"
      >
        <div class="flex flex-col items-center">
          <span class="text-neu-text-primary text-[16px] mb-1">单透开启</span>
          <span class="text-neu-text-secondary text-[12px]">免费功能</span>
        </div>
      </button>
    </div>

    <Toast v-if="showToast" :message="toastMessage" :success="toastSuccess" />

    <!-- 添加模态框 -->
    <Modal :show="showRechargeModal" title="充值" @close="showRechargeModal = false">
      <!-- 充值表单 -->
      <div class="form-control">
        <label class="label">
          <span class="label-text text-neu-text-secondary">充值金额</span>
        </label>
        <input 
          type="number" 
          v-model="rechargeAmount"
          placeholder="请输入充值金额"
          class="input input-bordered w-full bg-neu-base shadow-neu-flat focus:shadow-neu-pressed transition-all duration-300"
        />
        <button 
          class="btn mt-6 bg-neu-base shadow-neu-convex hover:shadow-neu-flat active:shadow-neu-pressed transition-all duration-300"
          @click="handleRecharge"
        >
          确认充值
        </button>
      </div>
    </Modal>

    <Modal :show="showPasswordModal" title="修改密码" @close="showPasswordModal = false">
      <form @submit.prevent="handleUpdatePassword" class="space-y-4">
        <!-- 添加隐藏的用户名字段以满足可访问性要求 -->
        <input 
          type="hidden"
          :value="username"
          name="username"
          autocomplete="username"
        />
        
        <div class="form-control">
          <label class="label">
            <span class="label-text text-neu-text-secondary">新密码</span>
          </label>
          <input 
            type="password" 
            v-model="newPassword"
            name="new-password"
            autocomplete="new-password"
            placeholder="请输入新密码"
            class="input input-bordered w-full bg-neu-base shadow-neu-flat focus:shadow-neu-pressed transition-all duration-300"
          />
        </div>
        <button 
          type="submit"
          class="btn w-full bg-neu-base shadow-neu-convex hover:shadow-neu-flat active:shadow-neu-pressed transition-all duration-300"
        >
          确认修改
        </button>
      </form>
    </Modal>

    <!-- 确认退出对话框 -->
    <Modal :show="showLogoutConfirm" title="确认退出" @close="showLogoutConfirm = false">
      <div class="text-center">
        <p class="text-neu-text-primary mb-6">确定要退出登录吗？</p>
        <div class="flex justify-center gap-4">
          <button 
            class="btn bg-neu-base shadow-neu-flat hover:shadow-neu-pressed transition-all duration-300"
            @click="showLogoutConfirm = false"
          >
            取消
          </button>
          <button 
            class="btn bg-[#F87171] text-white hover:bg-[#F87171]/90 transition-all duration-300"
            @click="confirmLogout"
          >
            确认退出
          </button>
        </div>
      </div>
    </Modal>

    <!-- 确认解绑对话框 -->
    <Modal :show="showUnbindConfirm" title="确认解绑" @close="showUnbindConfirm = false">
      <div class="text-center">
        <p class="text-neu-text-primary mb-2">确定要解绑当前账号吗？</p>
        <p class="text-neu-text-secondary text-sm mb-6">解绑后需要重新登录</p>
        <div class="flex justify-center gap-4">
          <button 
            class="btn bg-neu-base shadow-neu-flat hover:shadow-neu-pressed transition-all duration-300"
            @click="showUnbindConfirm = false"
          >
            取消
          </button>
          <button 
            class="btn bg-[#F87171] text-white hover:bg-[#F87171]/90 transition-all duration-300"
            @click="confirmUnbind"
          >
            确认解绑
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { memberApi } from '../api/member'
import Toast from '../components/Toast.vue'
import Modal from '../components/Modal.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Toast,
    Modal
  },
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    const showToast = ref(false)
    const toastMessage = ref('')
    const toastSuccess = ref(false)
    const remainingFlashes = ref(1) // 非会员每天可用次数
    let heartbeatTimer: number

    // 添加设备信息
    const deviceInfo = ref({
      kernel: '',
      selinux: '',
      androidVersion: '',
      fingerprint: ''
    })

    // 从 userStore 获取会员信息
    const memberInfo = computed(() => userStore.memberInfo)
    const isVip = computed(() => memberInfo.value?.isMember === 1)
    const maxDevices = computed(() => memberInfo.value?.memberLevel > 0 ? 3 : 1)
    const canFlashDriver = computed(() => isVip.value || remainingFlashes.value > 0)

    // 格式化到期时间
    const formatEndTime = (endTime?: string) => {
      if (!endTime) return '未开通会员'
      // 将时间戳转换为日期字符串
      const date = new Date(endTime)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    // 判断是否接近到期（7天内）
    const isNearExpire = (endTime?: string) => {
      if (!endTime) return false
      const endDate = new Date(endTime)
      const now = new Date()
      const diffDays = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      return diffDays <= 7 && diffDays > 0
    }

    // 显示提示信息
    const showToastMessage = (message: string, success: boolean) => {
      toastMessage.value = message
      toastSuccess.value = success
      showToast.value = true
      setTimeout(() => {
        showToast.value = false
      }, 3000)
    }

    // 添加确认对话框的状态
    const showLogoutConfirm = ref(false)
    const showUnbindConfirm = ref(false)
    const showUnbindModal = ref(false)
    const unbindUsername = ref('')
    const unbindPassword = ref('')

    // 修改原有的登出处理函数
    const handleLogout = () => {
      showLogoutConfirm.value = true
    }

    // 添加确认登出函数
    const confirmLogout = async () => {
      try {
        console.log('开始执行登出')
        const success = await userStore.logout()
        if (success) {
          console.log('登出成功，准备跳转')
          showToastMessage('退出成功', true)
          // 使用 replace 而不是 push，避免历史记录堆积
          await router.replace('/login')
        } else {
          console.log('登出失败')
          showToastMessage('退出失败，请重试', false)
        }
      } catch (error) {
        console.error('登出过程出错:', error)
        showToastMessage('退出失败，请重试', false)
      } finally {
        showLogoutConfirm.value = false
      }
    }

    // 处理驱动刷入
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

    // 获取设备信息
    onMounted(async () => {
      // 检查用户是否已登录
      if (!userStore.isLoggedIn) {
        const loaded = userStore.loadUserInfo()
        if (!loaded) {
          router.push('/login')
          return
        }
      }

      try {
        // 立即获取一次会员信息
        console.log('初始化获取会员信息')
        const response = await memberApi.getMemberInfo(userStore.token)
        if (response.code === 1) {
          console.log('初始会员信息:', response.data)
          userStore.$patch(state => {
            state.memberInfo = response.data
          })
        }
      } catch (error) {
        console.error('获取初始会员信息失败:', error)
      }

      // 模拟获取设备信息
      deviceInfo.value = {
        kernel: 'Linux 4.19.157',
        selinux: 'Permissive',
        androidVersion: 'Android 12',
        fingerprint: 'google/coral/coral:12/SP1A.210812.016.C2'
      }

      // 延迟 2 秒后开始心跳检测
      setTimeout(() => {
        // 立即执行一次心跳并打印响应
        userStore.heartbeat().then(response => {
          console.log('心跳响应:', response)
          if (response?.data) {
            console.log('心跳返回的会员信息:', response.data)
          }
        })

        // 设置定时器，每10秒执行一次心跳
        heartbeatTimer = window.setInterval(async () => {
          // 检查用户是否仍然登录
          if (userStore.isLoggedIn) {
            const response = await userStore.heartbeat()
            if (!response) {
              // 心跳失败，强制退出但不清除用户信息
              if (heartbeatTimer) {
                clearInterval(heartbeatTimer)
              }
              showToastMessage('登录已过期，请重新登录', false)
              router.push('/login')
            }
          } else {
            // 如果用户未登录，清除定时器并跳转到登录页
            if (heartbeatTimer) {
              clearInterval(heartbeatTimer)
            }
            router.push('/login')
          }
        }, 10000)
      }, 2000) // 延迟 2 秒

      // 添加详细的调试输出
      console.log('Member Info 详细信息:')
      console.log('会员等级:', memberInfo.value?.memberLevel)
      console.log('是否是会员:', memberInfo.value?.isMember)
      console.log('设备绑定数:', memberInfo.value?.macCount)
      console.log('会员等级名称:', memberInfo.value?.userLevelName)
      console.log('开通时间:', memberInfo.value?.fromTime)
      console.log('到期时间:', memberInfo.value?.endTime)
      console.log('用户昵称:', memberInfo.value?.nickname)
      console.log('成长值:', memberInfo.value?.growth)
    })

    // 清理定时器
    onUnmounted(() => {
      if (heartbeatTimer) {
        clearInterval(heartbeatTimer)
      }
    })

    // 添加新的响应式变量
    const showRechargeModal = ref(false)
    const showPasswordModal = ref(false)
    const rechargeAmount = ref('')
    const newPassword = ref('')

    // 处理充值
    const handleRecharge = () => {
      // TODO: 实现充值逻辑
      showToastMessage('充值成功', true)
      showRechargeModal.value = false
      rechargeAmount.value = ''
    }

    // 处理修改密码
    const handleUpdatePassword = async () => {
      if (!newPassword.value) {
        showToastMessage('请输入新密码', false)
        return
      }

      try {
        const success = await userStore.updatePassword(newPassword.value)
        if (success) {
          showToastMessage('密码修改成功', true)
          showPasswordModal.value = false
          newPassword.value = ''
        } else {
          showToastMessage('密码修改失败', false)
        }
      } catch (error) {
        showToastMessage('密码修改失败', false)
      }
    }

    // 修改原有的解绑处理函数
    const handleUnbind = () => {
      showUnbindConfirm.value = true
    }

    // 添加确认解绑函数
    const confirmUnbind = async () => {
      if (!unbindUsername.value || !unbindPassword.value) {
        showToastMessage('请填写完整信息', false)
        return
      }

      try {
        const response = await memberApi.unbind({
          username: unbindUsername.value,
          password: unbindPassword.value,
        })

        if (response.code === 1) {
          showToastMessage('解绑成功', true)
          showUnbindConfirm.value = false
          showUnbindModal.value = false
          // 清空表单
          unbindUsername.value = ''
          unbindPassword.value = ''
          // 解绑成功后退出登录
          router.push('/login')
        } else {
          showToastMessage(response.msg, false)
        }
      } catch (error) {
        console.error('解绑失败:', error)
        showToastMessage('解绑失败，请稍后重试', false)
      }
    }

    return {
      deviceInfo,
      memberInfo,
      maxDevices,
      isVip,
      remainingFlashes,
      canFlashDriver,
      showToast,
      toastMessage,
      toastSuccess,
      showRechargeModal,
      showPasswordModal,
      rechargeAmount,
      newPassword,
      handleRecharge,
      handleUpdatePassword,
      username: computed(() => userStore.username),
      showLogoutConfirm,
      showUnbindConfirm,
      showUnbindModal,
      unbindUsername,
      unbindPassword,
      handleLogout,
      confirmLogout,
      handleUnbind,
      confirmUnbind,
      formatEndTime,
      isNearExpire,
      handleDriverFlash
    }
  }
})
</script>

<style scoped>
/* 添加新的动画关键帧 */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 添加动画类 */
.animate-slide-down {
  animation: slideDown 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animate-slide-up {
  animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animate-fade-in {
  animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* 添加动画延迟类 */
.animation-delay-100 {
  animation-delay: 0.1s;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

/* 优化过渡效果 */
.transition-all {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 卡片和按钮悬停效果 */
.card, .btn {
  will-change: transform;
  backface-visibility: hidden;
}

/* 菜单项悬停效果 */
.menu li a {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu li a:hover svg {
  transform: scale(1.1);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 泡泡基础样式 */
.bubble-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.bubble {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3));
  backdrop-filter: blur(5px);
  animation: float 20s linear infinite;
}

/* 泡泡大小和位置 */
.bubble-1 {
  width: 60px;
  height: 60px;
  top: -20px;
  right: 10%;
  animation-delay: 0s;
}

.bubble-2 {
  width: 40px;
  height: 40px;
  bottom: 20px;
  left: 15%;
  animation-delay: -5s;
}

.bubble-3 {
  width: 30px;
  height: 30px;
  top: 40%;
  right: 20%;
  animation-delay: -10s;
}

.bubble-4 {
  width: 50px;
  height: 50px;
  top: 10%;
  left: 10%;
  animation-delay: -2s;
}

.bubble-5 {
  width: 35px;
  height: 35px;
  bottom: 30%;
  right: 15%;
  animation-delay: -7s;
}

.bubble-6 {
  width: 45px;
  height: 45px;
  top: 50%;
  left: 20%;
  animation-delay: -12s;
}

/* 泡泡动画 */
@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 0.8;
  }
  33% {
    transform: translateY(-20px) rotate(120deg) scale(1.1);
    opacity: 0.6;
  }
  66% {
    transform: translateY(10px) rotate(240deg) scale(0.9);
    opacity: 0.4;
  }
  100% {
    transform: translateY(0) rotate(360deg) scale(1);
    opacity: 0.8;
  }
}

/* 卡片悬停时泡泡效果增强 */
.card:hover .bubble {
  animation-duration: 10s;
  backdrop-filter: blur(10px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.4));
}
</style> 