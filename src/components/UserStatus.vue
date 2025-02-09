<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-neu-text-primary">会员状态</h2>
      <div class="stats stats-vertical shadow w-full">
        <div class="stat">
          <div class="stat-title">会员等级</div>
          <div class="stat-value text-base">
            <div class="badge badge-primary">{{ memberInfo?.userLevelName || '普通用户' }}</div>
          </div>
        </div>
        
        <div class="stat">
          <div class="stat-title">到期时间</div>
          <div class="stat-value text-base">{{ memberInfo?.endTime || '未开通会员' }}</div>
        </div>
        
        <div class="stat">
          <div class="stat-title">设备绑定数</div>
          <div class="stat-value text-base">
            <div class="badge badge-secondary">{{ memberInfo?.macCount || 0 }}/{{ maxDevices }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useUserStore } from '../stores/user'

export default defineComponent({
  name: 'UserStatus',
  setup() {
    const userStore = useUserStore()
    const memberInfo = computed(() => userStore.memberInfo)
    const maxDevices = computed(() => memberInfo.value?.memberLevel === 2 ? 3 : 1)

    return {
      memberInfo,
      maxDevices
    }
  }
})
</script> 