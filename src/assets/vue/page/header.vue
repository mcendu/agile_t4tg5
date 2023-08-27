<script setup lang="ts">
import '../../css/form.scss';
import 'material-symbols';
import Page from '../../js/page';

const props = defineProps<{
  page?: Page;
}>();
const emit = defineEmits<{
  menu: [];
}>();
</script>

<template>
  <header class="sa-page-header">
    <button
      class="icon-button sa-page-header__menubutton"
      @click="$emit('menu')"
    >
      <span class="material-symbols-outlined">menu</span>
    </button>
    <h1 class="sa-page-header__title">{{ page?.name }}</h1>
  </header>
</template>

<style lang="scss">
@use '/css/stops.scss';
@use '/css/dark' as *;

.sa-page-header {
  display: flex;
  align-items: center;
  padding: 4px;
  gap: 8px;

  background-color: var(--c-l2);

  @include dark {
    background-color: var(--c-l7);
  }

  @media (width >= stops.$width-s) {
    display: none;
  }

  &__menubutton {
    padding: 4px;
    border-radius: 5px;
  }

  &__title {
    margin: 0;
    border: 0;
    font-size: 1.2em;
  }
}
</style>
