<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from './stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

onMounted(async () => {
  const success = await userStore.loadUserInfo()
  if (success) {
    console.log('自动登录成功')
    if (router.currentRoute.value.path === '/login') {
      router.push('/home')
    }
  } else {
    console.log('需要重新登录')
    if (router.currentRoute.value.meta.requiresAuth) {
      router.push('/login')
    }
  }
})
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
