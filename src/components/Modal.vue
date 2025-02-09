<template>
  <div 
    v-if="show" 
    class="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in"
  >
    <!-- 背景遮罩 -->
    <div 
      class="absolute inset-0 animate-fade-in"
      style="background: radial-gradient(circle at center, rgba(163, 207, 187, 0.15), rgba(106, 90, 205, 0.15)); backdrop-filter: blur(8px);"
      @click="$emit('close')"
    ></div>
    
    <!-- 模态框内容 -->
    <div 
      class="relative z-[201] rounded-[20px] w-full max-w-md max-h-[80vh] flex flex-col animate-modal-show"
    >
      <!-- 模态框背景 -->
      <div class="absolute inset-0 rounded-[20px] overflow-hidden">
        <!-- 主渐变背景 -->
        <div class="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85"></div>
        <!-- 装饰性渐变光效 -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#A3CFBB]/20 to-[#7DCEA0]/20 blur-2xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#B0C4DE]/20 to-[#87CEEB]/20 blur-2xl transform -translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      <!-- 模态框内容容器 -->
      <div class="relative z-[202] flex flex-col w-full h-full border border-white/50 rounded-[20px] shadow-xl bg-white/95">
        <!-- 标题栏 -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-[#E6F4F1]">
          <h3 class="text-[20px] font-medium flex-1 text-center text-[#6A5ACD]">{{ title }}</h3>
          <button 
            @click="$emit('close')"
            class="absolute right-4 text-[#A3CFBB] hover:text-[#7DCEA0] hover:rotate-90 transition-all duration-300"
          >
            <span class="sr-only">关闭</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 内容区域 -->
        <div class="px-6 py-5 overflow-y-auto custom-scrollbar animate-content-show">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  emits: ['close']
})
</script>

<style scoped>
/* 模态框动画 */
@keyframes modalShow {
  from {
    opacity: 0;
    transform: scale(0.98) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes contentShow {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-modal-show {
  animation: modalShow 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.animate-content-show {
  animation: contentShow 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards;
}

/* 淡入动画 */
.animate-fade-in {
  animation: fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 自定义滚动条样式 */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #A3CFBB transparent;
  overflow-y: auto;
  max-height: calc(80vh - 120px); /* 减去标题栏和内边距的高度 */
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 3px;
  background-color: rgba(163, 207, 187, 0.1);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(163, 207, 187, 0.5);
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: background-color 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(163, 207, 187, 0.8);
  border-color: rgba(255, 255, 255, 0.5);
}

/* 滚动条角落样式 */
.custom-scrollbar::-webkit-scrollbar-corner {
  background-color: transparent;
}

/* 防止背景滚动 */
:deep(body.modal-open) {
  overflow: hidden;
}

/* 表单输入框样式 */
:deep(.input) {
  @apply w-full h-[40px] min-h-[40px] bg-white/50 hover:bg-white/60 focus:bg-white/70 px-4;
  @apply border border-[#B0C4DE]/30 focus:border-[#A3CFBB]/50;
  @apply rounded-[10px] shadow-sm hover:shadow-md;
  @apply transition-all duration-300;
  @apply text-[#3B3B3B] placeholder:text-[#5A5A5A]/60;
}

/* 按钮样式 */
:deep(.btn) {
  @apply h-[40px] min-h-[40px] px-6;
  @apply bg-gradient-to-r from-[#A3CFBB] to-[#7DCEA0];
  @apply hover:from-[#B4D7A7] hover:to-[#92C392];
  @apply text-white font-medium;
  @apply border-none rounded-[10px];
  @apply shadow-md hover:shadow-lg;
  @apply transition-all duration-300;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

/* 错误提示样式 */
:deep(.error-text) {
  @apply text-sm text-[#FF6B6B];
  @apply flex items-center gap-1;
  @apply animate-shake;
}

/* 抖动动画 */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

.animate-shake {
  animation: shake 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

/* 链接按钮样式 */
:deep(.btn-link) {
  @apply text-[#4682B4] hover:text-[#87CEEB];
  @apply transition-colors duration-300;
  @apply no-underline hover:no-underline;
}

/* 标签样式 */
:deep(.label) {
  @apply text-sm text-[#708090];
  @apply mb-1 ml-1;
}

/* 分割线样式 */
:deep(.divider) {
  @apply my-4 border-t border-[#E6F4F1];
}

/* 列表样式 */
:deep(.list-item) {
  @apply flex items-center gap-2 py-2;
  @apply text-[#3B3B3B];
  @apply transition-colors duration-300;
  @apply hover:bg-[#F0FFF0]/30;
  @apply rounded-md px-2;
}
</style> 