<script setup lang="ts">
import Module from '../../js/module';

const props = defineProps<{module: Module, selected: boolean }>();
const emit = defineEmits<{
  (e: 'addGrade'): void;
  (e: 'getGrades'): void;
}>();

function addGrade(e: Event) {
  emit('addGrade');
}

function getGrades(e: Event) {
  emit('getGrades');
}
</script>

<template>
  <main class="gc-card gc-card__text">
    <p>{{ module.name }} - {{ module.code }}</p>
    <p>{{ module.grades }}</p>
    <button class="" @click="addGrade">
      Add
    </button>
    <button class="" @click="getGrades">
      get
    </button>
  </main>
</template>

<style lang="scss">
.gc-card {
  text-align: center;
  border: 2px solid var(--c-fg-tl);
  border-radius: 5px;
  color: var(--c-fg-tl);

  &__text {
    margin-top: 0;
    font-size: 1em;
    font-weight: bold;
    color: white;
  }
}

.gc-card__icon {
  font-family: 'Material Symbols Outlined';
  font-size: 48px;
  margin-top: 0;
}

.gc-card__text {
  margin-top: 0.5lh;
}
</style>
