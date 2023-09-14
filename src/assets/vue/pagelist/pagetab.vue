<script setup lang="ts">
import Page from '../../js/page';
const props = defineProps<{
  page: Page;
  editable?: boolean;
  selected?: boolean;
}>();
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
    <button
      data-testlabel="name"
      class="sa-pagetab__button"
      :disabled="selected"
      @click="select"
    >
      {{ page.name }}
    </button>

    <template v-if="editable">
      <button
        data-testlabel="edit"
        class="icon-button sa-pagetab__edit"
        aria-label="rename"
        @click="$emit('edit')"
        :aria-hidden="!selected"
      >
        <span class="material-symbols-outlined">edit</span>
      </button>
      <button
        data-testlabel="delete"
        class="icon-button sa-pagetab__edit"
        aria-label="delete"
        @click="$emit('delete')"
        :aria-hidden="!selected"
      >
        <span class="material-symbols-outlined">close</span>
      </button>
    </template>
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

  transition:
    background-color 0.2s,
    box-shadow 0.2s;

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
      width: 2lh;
      padding: 0;
    }

    @media (hover: hover) {
      .sa-pagetab__edit {
        opacity: 0;
      }

      &:hover .sa-pagetab__edit,
      &:focus-within .sa-pagetab__edit {
        opacity: 1;
      }
    }
  }
}
</style>
