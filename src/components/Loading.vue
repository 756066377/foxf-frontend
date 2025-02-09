<template>
  <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-neu-dark/20 backdrop-blur-[2px] transition-all duration-200 ease-out">
    <div class="relative transform transition-all duration-200 ease-out">
      <div class="w-16 h-16 rounded-full bg-neu-base shadow-neu-convex flex items-center justify-center animate-fade-in">
        <div class="w-12 h-12 rounded-full border-4 border-neu-text-secondary/20 border-t-neu-text-primary animate-spin transition-all duration-200 ease-out"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'Loading',
  setup() {
    const progress = ref(0)
    
    onMounted(() => {
      const interval = setInterval(() => {
        if (progress.value < 100) {
          progress.value += 5
        } else {
          clearInterval(interval)
        }
      }, 50)

      return () => clearInterval(interval)
    })

    return {
      progress
    }
  }
})
</script> 