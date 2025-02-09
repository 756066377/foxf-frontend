<template>
  <div class="toast toast-center z-[9999]">
    <div 
      class="alert rounded-[16px] shadow-neu-convex bg-neu-base border-none min-h-[56px] transform transition-all duration-200 ease-out animate-slide-up"
      :class="{
        'text-[#34D399]': success,
        'text-[#F87171]': !success
      }"
    >
      <div class="flex items-center gap-2">
        <svg 
          v-if="success" 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg 
          v-else 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span class="text-neu-text-primary text-[15px]">{{ message }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Toast',
  props: {
    message: {
      type: String,
      required: true
    },
    success: {
      type: Boolean,
      default: false
    }
  }
})
</script> 