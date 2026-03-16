<script setup lang="ts">
import type { Task, Column } from '../stores/taskStore'
import TaskCard from './TaskCard.vue'

const props = defineProps<{
  title: string
  column: Column
  tasks: Task[]
  color: string
}>()

const emit = defineEmits<{
  move: [id: string, direction: 'forward' | 'backward']
  delete: [id: string]
}>()
</script>

<template>
  <div class="flex flex-col gap-3 min-w-0">
    <!-- Column Header -->
    <div class="flex items-center justify-between px-1">
      <div class="flex items-center gap-2">
        <div :class="['w-2.5 h-2.5 rounded-full', color]"></div>
        <h2 class="text-gray-200 font-semibold text-sm uppercase tracking-wider">
          {{ title }}
        </h2>
      </div>
      <span class="text-xs bg-gray-700 text-gray-400 font-medium px-2 py-0.5 rounded-full">
        {{ tasks.length }}
      </span>
    </div>

    <!-- Column Body -->
    <div class="bg-gray-900 rounded-xl p-3 flex flex-col gap-3 min-h-96 border border-gray-800">
      <!-- Task Cards -->
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :isFirst="column === 'todo'"
        :isLast="column === 'done'"
        @move="(id, dir) => emit('move', id, dir)"
        @delete="(id) => emit('delete', id)"
      />

      <!-- Empty State -->
      <div
        v-if="tasks.length === 0"
        class="flex flex-col items-center justify-center flex-1 gap-2 py-12"
      >
        <div class="text-4xl opacity-20">📋</div>
        <p class="text-gray-600 text-xs">No tasks here</p>
      </div>
    </div>
  </div>
</template>