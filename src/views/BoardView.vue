<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import KanbanColumn from '../components/KanbanColumn.vue'
import AddTaskModal from '../components/AddTaskModal.vue'

const store = useTaskStore()
const showModal = ref(false)
</script>

<template>
  <div class="min-h-screen bg-gray-950">
    <!-- Header -->
    <header class="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm"
          >
            V
          </div>
          <h1 class="text-gray-100 font-bold text-md">Vueban</h1>
          <div class="text-gray-100">|</div>
          <RouterLink
            to="/about"
            class="text-gray-100 hover:text-gray-300 text-md transition-colors hidden sm:block"
          >
            About
          </RouterLink>
        </div>

        <!-- Stats -->
        <div class="flex items-center gap-6">
          <div class="hidden sm:flex items-center gap-4 text-sm">
            <span class="text-gray-500">
              Total: <span class="text-gray-200 font-medium">{{ store.totalTasks }}</span>
            </span>
            <span class="text-gray-500">
              Done: <span class="text-green-400 font-medium">{{ store.completedCount }}</span>
            </span>
          </div>

          <button
            @click="showModal = true"
            class="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <span class="text-lg leading-none">+</span>
            Add Task
          </button>
        </div>
      </div>
    </header>

    <!-- Board -->
    <main class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KanbanColumn
          title="To Do"
          column="todo"
          color="bg-gray-400"
          :tasks="store.todoTasks"
          @move="store.moveTask"
          @delete="store.deleteTask"
        />

        <KanbanColumn
          title="In Progress"
          column="inprogress"
          color="bg-blue-500"
          :tasks="store.inProgressTasks"
          @move="store.moveTask"
          @delete="store.deleteTask"
        />

        <KanbanColumn
          title="Done"
          column="done"
          color="bg-green-500"
          :tasks="store.doneTasks"
          @move="store.moveTask"
          @delete="store.deleteTask"
        />
      </div>
    </main>

    <!-- Modal -->
    <AddTaskModal
      v-if="showModal"
      @close="showModal = false"
      @add="
        (task) => {
          store.addTask(task)
          showModal = false
        }
      "
    />
  </div>
</template>