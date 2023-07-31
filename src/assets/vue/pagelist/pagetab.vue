<script setup lang="ts">
import Page from '../../js/page';
const props = defineProps<{ page: Page; selected: boolean }>();
const emit = defineEmits<{
  (e: 'select'): void;
  (e: 'edit'): void;
  (e: 'delete'): void;
}>();

function select(e: Event) {
  if (!props.selected) emit('select');
}
</script>

<template>
  <li class="sa-pagetab" :class="{ 'sa-pagetab--current': selected }">
    <button class="sa-pagetab__button" @click="select">
      {{ page.name }}
    </button>
    <button
      class="sa-pagetab__edit"
      aria-label="rename"
      @click="$emit('edit')"
      :aria-hidden="!selected"
    >
      <span class="material-symbols-outlined">edit</span>
    </button>
    <button
      class="sa-pagetab__edit"
      aria-label="delete"
      @click="$emit('delete')"
      :aria-hidden="!selected"
    >
      <span class="material-symbols-outlined">close</span>
    </button>
  </li>
</template>

<style>
.sa-pagetab,
.sa-pagetab-like {
  display: flex;
  align-items: stretch;
  margin: 0;
  height: 2lh;
  border-radius: 8px 0 0 8px;
  background-color: transparent;
}

.sa-pagetab:hover,
.sa-pagetab-like:hover {
  background-color: var(--c-h0);
}

.sa-pagetab:active,
.sa-pagetab-like:active {
  background-color: var(--c-a1);
}

.sa-pagetab--current,
.sa-pagetab--current:hover,
.sa-pagetab--current:active {
  background-color: var(--c-b1);
}

.sa-pagetab__button {
  padding: 0 1em;
  flex-grow: 1;

  display: flex;
  align-items: center;
}

.sa-pagetab__edit {
  display: none;
}

.sa-pagetab--current > .sa-pagetab__edit {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2lh;
  padding: 0;
}

.sa-pagetab__edit:hover {
  background-color: var(--c-h0);
}

.sa-pagetab__edit:active {
  background-color: var(--c-a2);
}
</style>
