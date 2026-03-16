import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type Priority = 'high' | 'medium' | 'low'
export type Column = 'todo' | 'inprogress' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  priority: Priority
  column: Column
  createdAt: Date
}

export const useTaskStore = defineStore('tasks', () => {
  // State
  const tasks = ref<Task[]>([
    {
      id: '1',
      title: 'Design the homepage layout',
      description: 'Create wireframes and high fidelity designs for the new homepage.',
      priority: 'high',
      column: 'todo',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Set up CI/CD pipeline',
      description: 'Configure AWS DevOps pipeline for automated testing and deployment.',
      priority: 'medium',
      column: 'inprogress',
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Write component documentation',
      description: 'Document all components in Storybook with usage examples.',
      priority: 'low',
      column: 'done',
      createdAt: new Date(),
    },
  ])

  // Getters (computed)
  const todoTasks = computed(() => tasks.value.filter((t) => t.column === 'todo'))
  const inProgressTasks = computed(() => tasks.value.filter((t) => t.column === 'inprogress'))
  const doneTasks = computed(() => tasks.value.filter((t) => t.column === 'done'))
  const totalTasks = computed(() => tasks.value.length)
  const completedCount = computed(() => tasks.value.filter((t) => t.column === 'done').length)

  // Actions
  function addTask(task: Omit<Task, 'id' | 'createdAt' | 'column'>) {
    tasks.value.push({
      ...task,
      id: Date.now().toString(),
      column: 'todo',
      createdAt: new Date(),
    })
  }

  function moveTask(id: string, direction: 'forward' | 'backward') {
    const task = tasks.value.find((t) => t.id === id)
    if (!task) return

    const columns: Column[] = ['todo', 'inprogress', 'done']
    const currentIndex = columns.indexOf(task.column)

    if (direction === 'forward' && currentIndex < 2) {
      task.column = columns[currentIndex + 1] as Column
    }
    if (direction === 'backward' && currentIndex > 0) {
      task.column = columns[currentIndex - 1] as Column
    }
  }

  function deleteTask(id: string) {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  return {
    tasks,
    todoTasks,
    inProgressTasks,
    doneTasks,
    totalTasks,
    completedCount,
    addTask,
    moveTask,
    deleteTask,
  }
})
