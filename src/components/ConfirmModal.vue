<script setup lang="ts">
defineProps<{
  message: string
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <div
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    @click.self="emit('cancel')"
  >
    <div
      class="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-sm shadow-2xl p-6 flex flex-col gap-6"
    >
      <!-- Icon + Message -->
      <div class="flex flex-col items-center gap-3 text-center">
        <div class="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-2xl">
          🗑️
        </div>
        <h3 class="text-gray-100 font-bold text-lg">Delete Task</h3>
        <p class="text-gray-400 text-sm">{{ message }}</p>
      </div>

      <!-- Buttons -->
      <div class="flex gap-3">
        <button
          @click="emit('cancel')"
          class="cursor-pointer flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          @click="emit('confirm')"
          class="cursor-pointer flex-1 bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>