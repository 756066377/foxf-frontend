<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-neu-text-primary">设备信息</h2>
      <div class="stats stats-vertical shadow w-full">
        <div class="stat">
          <div class="stat-title">手机内核</div>
          <div class="stat-value text-base">{{ deviceInfo.kernel }}</div>
        </div>
        
        <div class="stat">
          <div class="stat-title">SELinux状态</div>
          <div class="stat-value text-base">
            <div class="badge" :class="deviceInfo.selinux === 'Enforcing' ? 'badge-error' : 'badge-success'">
              {{ deviceInfo.selinux }}
            </div>
          </div>
        </div>
        
        <div class="stat">
          <div class="stat-title">安卓版本</div>
          <div class="stat-value text-base">{{ deviceInfo.androidVersion }}</div>
        </div>
        
        <div class="stat">
          <div class="stat-title">系统指纹</div>
          <div class="stat-value text-xs">{{ deviceInfo.fingerprint }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'DeviceInfo',
  setup() {
    const deviceInfo = ref({
      kernel: '',
      selinux: '',
      androidVersion: '',
      fingerprint: ''
    })

    // TODO: 从设备获取实际信息
    onMounted(() => {
      // 模拟获取设备信息
      deviceInfo.value = {
        kernel: 'Linux 4.19.157',
        selinux: 'Permissive',
        androidVersion: 'Android 12',
        fingerprint: 'google/coral/coral:12/SP1A.210812.016.C2'
      }
    })

    return {
      deviceInfo
    }
  }
})
</script> 