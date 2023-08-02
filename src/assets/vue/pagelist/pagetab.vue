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
    <button class="sa-pagetab__button" :disabled="selected" @click="select">
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

<style lang="scss">
.sa-pagetab,
.sa-pagetab-like {
  display: flex;
  align-items: stretch;
  margin: 0;
  padding: 0 0.5em;
  height: 32px;

  border: 0;
  border-radius: 8px;
  background-color: transparent;
  font-size: 1em;

  &:hover {
    background-color: var(--c-bg-t);
  }

  &:active {
    background-color: var(--c-bg-ta);
  }

  &__button {
    flex-grow: 1;
    font-size: 1em;
    border: none;
    padding: 0 0.5em;
    background-color: transparent;

    display: flex;
    align-items: center;
  }

  &__edit {
    display: none;
    background-color: transparent;
    transition:
      color 0.2s,
      background-color 0.2s;
  }

  &--current {
    &,
    &:hover,
    &:active {
      background-color: var(--c-bg);
      box-shadow: var(--shadow);
    }

    .sa-pagetab__edit {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 2lh;
      padding: 0;

      font-size: 1em;
      border: none;
      color: var(--c-fg-t);

      &:active {
        color: var(--c-fg);
        background-color: var(--c-bg-ta);
      }
    }

    @media (hover: hover) {
      .sa-pagetab__edit {
        color: transparent;
      }

      &:hover .sa-pagetab__edit,
      &:focus-within .sa-pagetab__edit {
        color: var(--c-fg-t);

        &:hover {
          color: var(--c-fg);
        }
      }
    }
  }
}
</style>
