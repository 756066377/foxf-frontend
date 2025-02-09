<template>
  <div class="w-[100px] h-[100px] bg-white shadow-xl rounded-lg flex items-center justify-center">
    <div class="relative w-[42px] h-[44px]">
      <div class="absolute inset-0 bg-accent"></div>
      <div class="grid grid-cols-4 grid-rows-3 gap-[1px] absolute inset-0">
        <div v-for="i in 12" :key="i" 
          class="border border-white opacity-80"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Logo'
})
</script> 