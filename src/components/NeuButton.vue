<template>
  <button 
    :type="type"
    :disabled="disabled"
    class="btn w-full bg-neu-base shadow-neu-convex hover:shadow-neu-flat active:shadow-neu-pressed transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0 hover:scale-[1.02] active:scale-[0.98]"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NeuButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped>
.btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.btn:active {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style> 