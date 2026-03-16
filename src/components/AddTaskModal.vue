<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Priority } from '../stores/taskStore'

const emit = defineEmits<{
  close: []
  add: [task: { title: string; description: string; priority: Priority }]
}>()

// reactive — for objects with multiple fields
const form = reactive({
  title: '',
  description: '',
  priority: 'medium' as Priority,
})

const error = ref('')

const handleSubmit = () => {
  if (!form.title.trim()) {
    error.value = 'Title is required'
    return
  }
  emit('add', {
    title: form.title.trim(),
    description: form.description.trim(),
    priority: form.priority,
  })
  // Reset form
  form.title = ''
  form.description = ''
  form.priority = 'medium'
  error.value = ''
}
</script>

<template>
  <!-- Backdrop -->
  <div
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
    @click.self="emit('close')"
  >
    <!-- Modal -->
    <div class="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md shadow-2xl z-50">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-800">
        <h2 class="text-gray-100 font-bold text-lg">Add New Task</h2>
        <button
          @click="emit('close')"
          class="cursor-pointer text-gray-500 hover:text-gray-300 transition-colors text-xl"
        >
          ✕
        </button>
      </div>

      <!-- Form -->
      <div class="p-6 flex flex-col gap-4">
        <!-- Title -->
        <div class="flex flex-col gap-1.5">
          <label class="text-gray-400 text-sm font-medium">Title *</label>
          <input
            v-model="form.title"
            type="text"
            placeholder="What needs to be done?"
            class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <p v-if="error" class="text-red-400 text-xs">{{ error }}</p>
        </div>

        <!-- Description -->
        <div class="flex flex-col gap-1.5">
          <label class="text-gray-400 text-sm font-medium"
            >Description <span class="text-gray-600">(optional)</span></label
          >
          <textarea
            v-model="form.description"
            placeholder="Add more details..."
            rows="3"
            class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        <!-- Priority -->
        <div class="flex flex-col gap-1.5">
          <label class="text-gray-400 text-sm font-medium">Priority</label>
          <div class="flex gap-2">
            <button
              v-for="p in ['high', 'medium', 'low']"
              :key="p"
              @click="form.priority = p as Priority"
              :class="[
                'cursor-pointer flex-1 py-2 rounded-lg text-sm font-medium transition-colors capitalize',
                form.priority === p
                  ? p === 'high'
                    ? 'bg-red-500/30 text-red-400 border border-red-500/50'
                    : p === 'medium'
                    ? 'bg-amber-500/30 text-amber-400 border border-amber-500/50'
                    : 'bg-green-500/30 text-green-400 border border-green-500/50'
                  : 'bg-gray-800 text-gray-500 border border-gray-700 hover:border-gray-500',
              ]"
            >
              {{ p }}
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex gap-3 p-6 pt-0">
        <button
          @click="emit('close')"
          class="cursor-pointer flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          class="cursor-pointer flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          Add Task
        </button>
      </div>
    </div>
  </div>
</template>