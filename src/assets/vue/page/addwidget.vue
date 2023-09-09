<script setup lang="ts">
import { ref } from 'vue';
import Widget from '../../../models/widget';

const showIcons = ref(false);

const emit = defineEmits<{
  addWidget: [w: Widget];
}>();

function addLinkWidget() {
  emit('addWidget', {
    id: -1n,
    type: 'LinkWidget',
    data: {
      title: 'New link',
      target: 'https://example.com/',
    },
  });
}

function addTodoWidget() {
  emit('addWidget', {
    id: -1n,
    type: 'TodoListWidget',
    data: {
       title: 'My To-Do List',
        items: [
          { description: 'Example Task', completed: false },
        ],
    },
  });
}

function addDeadlineWidget() {
  const week = 7 * 24 * 60 * 60 * 1000;
  emit('addWidget', {
    id: -1n,
    type: 'DeadlineWidget',
    data: {
      title: 'Deadline Title',
      start: new Date(),
      deadline: new Date(new Date().valueOf() + week),
    },
  });
}
</script>

<template>
  <button class="sa-addwidget" aria-label="Create a new widget" @mouseover="showIcons = true"
    @mouseout="showIcons = false">
    <p class="sa-addwidget__icon" :class="{ 'show-icons': showIcons }">add</p>
    <div class="sa-addwidget__div" :class="{ 'show-icons': showIcons }">
      <p class="sa-addwidget__icon" @click="addLinkWidget">captive_portal</p>
      <p class="sa-addwidget__icon" @click="addTodoWidget">checklist</p>
      <p class="sa-addwidget__icon" @click="addDeadlineWidget">event</p>
    </div>
    <p class="sa-addwidget__text">Create a new widget</p>
  </button>
</template>

<style lang="scss">
.sa-addwidget {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 4px dashed var(--c-fg-tl);
  border-radius: 8px;
  color: var(--c-fg-tl);
  position: relative;
}

.sa-addwidget__div {
  display: none;
  align-items: center;
  justify-content: center;
  position: relative;
}

.sa-addwidget__div.show-icons {
  display: flex;
}

.sa-addwidget__icon {
  font-family: 'Material Symbols Outlined';
  font-size: 48px;
  margin: 0;
}

.sa-addwidget__icon.show-icons {
  display: none;
}

.sa-addwidget__text {
  margin-top: 0.5lh;
}
</style>
