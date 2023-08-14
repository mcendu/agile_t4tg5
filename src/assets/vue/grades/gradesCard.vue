<script setup lang="ts">
import Module from '../../js/module';

const props = defineProps<{
  module: Module;
  selected: boolean;
}>();
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
    <table>
      <tr v-for="row in module.grades">
        <td>{{ row.type }}</td>
        <td>{{ row.grade }}</td>
        <td>{{ row.weight }}</td>
        <td>{{ row.id }}</td>
      </tr>
    </table>
    <button class="btn btn-primary" @click="addGrade">Add</button>
    <button class="btn btn-primary" @click="getGrades">get</button>
  </main>
</template>

<style lang="scss">
.gc-card {
  text-align: left;
  margin: 10px;
  padding: 10px;
  border: 2px solid var(--c-fg-tl);
  border-radius: 5px;
  color: var(--c-fg-tl);
  background-color: var(--c-bg);

  &__text {
    margin-top: 0;
    font-size: 1em;
    font-weight: bold;
    color: white;
  }

  &__table {
    width: 100%;
  }

  &__table td {
    width: 25%;
    background-color: grey;
  }

  &__icon {
    font-family: 'Material Symbols Outlined';
    font-size: 48px;
    margin-top: 0;
  }
}
</style>
