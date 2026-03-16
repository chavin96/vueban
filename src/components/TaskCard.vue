<script setup lang="ts">
import { ref } from 'vue'
import type { Task } from '../stores/taskStore'
import ConfirmModal from './ConfirmModal.vue'

const props = defineProps<{
  task: Task
  isFirst: boolean
  isLast: boolean
}>()

const emit = defineEmits<{
  move: [id: string, direction: 'forward' | 'backward']
  delete: [id: string]
}>()

const expanded = ref(false)
const showConfirm = ref(false)

const priorityConfig = {
  high: { label: 'High', class: 'bg-red-500/20 text-red-400 border border-red-500/30' },
  medium: { label: 'Medium', class: 'bg-amber-500/20 text-amber-400 border border-amber-500/30' },
  low: { label: 'Low', class: 'bg-green-500/20 text-green-400 border border-green-500/30' },
}

const handleConfirm = () => {
  emit('delete', props.task.id)
  showConfirm.value = false
}
</script>

<template>
  <div
    class="bg-gray-800 rounded-lg p-4 flex flex-col gap-3 border border-gray-700 hover:border-blue-500/50 transition-colors"
  >
    <!-- Top row — priority badge + delete -->
    <div class="flex items-center justify-between">
      <span
        :class="[
          'text-xs font-medium px-2 py-0.5 rounded-full',
          priorityConfig[task.priority].class,
        ]"
      >
        {{ priorityConfig[task.priority].label }}
      </span>
      <button
        @click="showConfirm = true"
        class="cursor-pointer text-gray-600 hover:text-red-400 transition-colors text-lg leading-none"
      >
        ✕
      </button>
    </div>

    <!-- Title -->
    <h3 class="text-gray-100 font-semibold text-sm leading-snug">
      {{ task.title }}
    </h3>

    <!-- Description toggle -->
    <div v-if="task.description">
      <p v-if="expanded" class="text-gray-400 text-xs leading-relaxed">
        {{ task.description }}
      </p>
      <button
        @click="expanded = !expanded"
        class="cursor-pointer text-blue-400 hover:text-blue-300 text-xs transition-colors"
      >
        {{ expanded ? 'Show less ↑' : 'Show more ↓' }}
      </button>
    </div>

    <!-- Move buttons -->
    <div class="flex gap-2 mt-1">
      <button
        v-if="!isFirst"
        @click="emit('move', task.id, 'backward')"
        class="cursor-pointer flex-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 py-1.5 rounded transition-colors"
      >
        ← Back
      </button>
      <button
        v-if="!isLast"
        @click="emit('move', task.id, 'forward')"
        class="cursor-pointer flex-1 text-xs bg-blue-600 hover:bg-blue-500 text-white py-1.5 rounded transition-colors"
      >
        Forward →
      </button>
    </div>
  </div>

  <!-- Confirm Delete Modal -->
  <ConfirmModal
    v-if="showConfirm"
    message="Are you sure you want to delete this task? This cannot be undone."
    @confirm="handleConfirm"
    @cancel="showConfirm = false"
  />
</template>