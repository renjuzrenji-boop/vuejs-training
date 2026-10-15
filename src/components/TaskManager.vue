<template>
  <section class="task-manager" aria-labelledby="task-manager-title">
    <header class="task-heading">
      <div>
        <p class="eyebrow">TRANSITIONS · DIRECTIVES</p>
        <h1 id="task-manager-title">Task manager</h1>
        <p class="page-description">Keep a short list of what needs doing next.</p>
      </div>
      <div class="task-summary" aria-live="polite">
        <strong>{{ remainingCount }}</strong>
        <span>remaining</span>
      </div>
    </header>

    <form class="task-form" @submit.prevent="addTask">
      <label class="task-input-label" for="new-task">New task</label>
      <div class="task-entry">
        <input
          id="new-task"
          v-model="newTaskTitle"
          v-focus
          type="text"
          maxlength="120"
          placeholder="What needs to get done?"
          autocomplete="off"
        />
        <button type="submit" class="task-add" :disabled="!newTaskTitle.trim()">Add task</button>
      </div>
    </form>

    <p v-if="tasks.length === 0" class="task-empty">Nothing on the list. Add a task to get started.</p>

    <TransitionGroup v-else name="task" tag="ul" class="task-list" aria-label="Tasks">
      <li v-for="(task, index) in tasks" :key="task.id" class="task-item">
        <label class="task-complete-control">
          <input v-model="task.completed" type="checkbox" :aria-label="`Mark ${task.title} ${task.completed ? 'incomplete' : 'complete'}`" />
          <span :class="{ 'is-complete': task.completed }">{{ task.title }}</span>
        </label>

        <div class="task-actions" aria-label="Task actions">
          <button
            type="button"
            class="task-move"
            :aria-label="`Move ${task.title} up`"
            :disabled="index === 0"
            @click="moveTask(index, -1)"
          >
            <span aria-hidden="true">↑</span>
          </button>
          <button
            type="button"
            class="task-move"
            :aria-label="`Move ${task.title} down`"
            :disabled="index === tasks.length - 1"
            @click="moveTask(index, 1)"
          >
            <span aria-hidden="true">↓</span>
          </button>
          <button type="button" class="task-delete" :aria-label="`Delete ${task.title}`" @click="deleteTask(task.id)">
            Remove
          </button>
        </div>
      </li>
    </TransitionGroup>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";

const tasks = ref([
  { id: 1, title: "Review this week’s priorities", completed: false },
  { id: 2, title: "Share the project update", completed: false },
  { id: 3, title: "Organize the team notes", completed: true }
]);
const newTaskTitle = ref("");
let nextTaskId = 4;

const remainingCount = computed(() => tasks.value.filter((task) => !task.completed).length);

const vFocus = {
  mounted(element) {
    element.focus();
  }
};

function addTask() {
  const title = newTaskTitle.value.trim();
  if (!title) {
    return;
  }

  tasks.value.push({ id: nextTaskId, title, completed: false });
  nextTaskId += 1;
  newTaskTitle.value = "";
}

function deleteTask(taskId) {
  tasks.value = tasks.value.filter((task) => task.id !== taskId);
}

function moveTask(index, direction) {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= tasks.value.length) {
    return;
  }

  const [task] = tasks.value.splice(index, 1);
  tasks.value.splice(nextIndex, 0, task);
}
</script>

<style scoped>
.task-list {
  position: relative;
}

.task-move,
.task-delete,
.task-add {
  transition: background-color 150ms ease, color 150ms ease, opacity 150ms ease;
}

.task-enter-active,
.task-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.task-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.task-leave-to {
  opacity: 0;
  transform: translateX(12px);
}

.task-leave-active {
  position: absolute;
  right: 0;
  left: 0;
}

.task-move {
  transition: transform 220ms ease;
}

@media (prefers-reduced-motion: reduce) {
  .task-enter-active,
  .task-leave-active,
  .task-move {
    transition-duration: 0.01ms;
  }
}
</style>