<script setup lang="ts">
import { RouterLink } from 'vue-router'

const features = [
  {
    icon: '🎯',
    title: 'Task Management',
    description: 'Create and organise tasks across three stages — Todo, In Progress, and Done.',
  },
  {
    icon: '🏷️',
    title: 'Priority Levels',
    description: 'Tag tasks as High, Medium, or Low priority with colour-coded badges.',
  },
  {
    icon: '📝',
    title: 'Task Descriptions',
    description: 'Add optional descriptions to tasks and expand them when needed.',
  },
  {
    icon: '⚡',
    title: 'Instant Updates',
    description: 'Move tasks between columns instantly with no page reloads.',
  },
]

const techStack = [
  { name: 'Vue 3', description: 'Composition API with script setup' },
  { name: 'TypeScript', description: 'Fully typed components and store' },
  { name: 'Pinia', description: 'Global state management' },
  { name: 'Vue Router', description: 'Client-side routing' },
  { name: 'Tailwind CSS', description: 'Utility-first styling' },
  { name: 'Vite', description: 'Fast development and bundling' },
]
</script>

<template>
  <div class="min-h-screen bg-gray-950">
    <!-- Header -->
    <header class="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm"
          >
            V
          </div>
          <h1 class="text-gray-100 font-bold text-xl">Vueban</h1>
        </div>
        <RouterLink
          to="/"
          class="text-blue-400 hover:text-blue-300 text-sm transition-colors flex items-center gap-1"
        >
          ← Back to Board
        </RouterLink>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-16">
      <!-- Hero -->
      <div class="flex flex-col gap-4 text-center">
        <div
          class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto"
        >
          V
        </div>
        <h2 class="text-4xl font-bold text-gray-100">Vueban</h2>
        <p class="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
          A clean, professional Kanban board built to learn and demonstrate Vue 3 core concepts —
          from reactivity and components to global state management with Pinia.
        </p>
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors mx-auto"
        >
          Open Board →
        </RouterLink>
      </div>

      <!-- Features -->
      <div class="flex flex-col gap-6">
        <h3 class="text-gray-100 font-bold text-xl">Features</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-2"
          >
            <div class="text-2xl">{{ feature.icon }}</div>
            <h4 class="text-gray-100 font-semibold text-sm">{{ feature.title }}</h4>
            <p class="text-gray-500 text-sm leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="flex flex-col gap-6">
        <h3 class="text-gray-100 font-bold text-xl">Tech Stack</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            v-for="tech in techStack"
            :key="tech.name"
            class="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-1"
          >
            <h4 class="text-blue-400 font-semibold text-sm">{{ tech.name }}</h4>
            <p class="text-gray-500 text-xs">{{ tech.description }}</p>
          </div>
        </div>
      </div>

      <!-- Vue Concepts -->
      <div class="flex flex-col gap-6">
        <h3 class="text-gray-100 font-bold text-xl">Vue Concepts Covered</h3>
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              v-for="concept in [
                'Single File Components (.vue)',
                'Composition API with script setup',
                'ref and reactive for local state',
                'computed properties',
                'v-for list rendering',
                'v-if conditional rendering',
                'v-model two-way binding',
                'Props and Emits',
                'Pinia global state management',
                'Vue Router navigation',
                'TypeScript with Vue',
                'onMounted lifecycle hook',
              ]"
              :key="concept"
              class="flex items-center gap-2 text-sm text-gray-400"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
              {{ concept }}
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center text-gray-600 text-sm pb-8">
        Built with Vue 3 + TypeScript + Tailwind CSS + Pinia
      </div>
    </main>
  </div>
</template>