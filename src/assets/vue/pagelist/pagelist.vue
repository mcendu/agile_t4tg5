<script setup lang="ts">
import Page from '../../js/page';
import Pagetab from './pagetab.vue';
const props = defineProps<{ pages: ReadonlyArray<Page>; selected?: Page }>();
defineEmits<{
  (e: 'pageSelect', page: Page): void;
  (e: 'newPage'): void;
}>();
</script>

<template>
  <nav class="sa-pagebar">
    <menu class="sa-pagelist">
      <Pagetab
        v-for="page in pages"
        :page="page"
        :selected="page === selected"
        @select="$emit('pageSelect', page)"
      />
    </menu>
    <hr class="sa-pagebar__divider" />
    <div class="sa-pagetab-like sa-newtab">
      <button class="sa-newtab__button" @click="$emit('newPage')">
        Add a page
      </button>
    </div>
  </nav>
</template>

<style>
.sa-pagebar {
  display: flex;
  flex-direction: column;
  align-items: stretch;

  margin: 0;
  padding: 0;

  font-size: 0.75em;

  grid-area: 'tabs';
}

.sa-pagebar__divider {
  height: 0;
  border: 0;
  border-top: 1px solid var(--c-text);
  background-color: transparent;
  margin: 0.2lh 1em;
}

.sa-pagelist {
  margin: 0;
  padding: 0;
}

.sa-newtab__button {
  width: 100%;
  height: 100%;
  padding: 0 1em;

  display: flex;
  align-items: center;

  /* override UA button styles */
  border: none;
  background-color: transparent;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  text-align: left;
}
</style>
