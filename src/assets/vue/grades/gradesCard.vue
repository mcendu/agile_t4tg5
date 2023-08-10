<script setup lang="ts">
import Module from '../../js/module';

const props = defineProps<{module: Module, selected: boolean }>();
const emit = defineEmits<{
  (e: 'addGrade'): void;
}>();

function addGrade(e: Event) {
  emit('addGrade');
}
</script>

<template>
  <li class="">
    <p>{{ module.name }}</p>
    <p>{{ module.code }}</p>
    <p>{{ module.grade }}</p>
    <button class="" @click="addGrade">
      Add
    </button>
  </li>
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
}

.sa-addwidget__icon {
  font-family: 'Material Symbols Outlined';
  font-size: 48px;
  margin-top: 0;
}

.sa-addwidget__text {
  margin-top: 0.5lh;
}
</style>
