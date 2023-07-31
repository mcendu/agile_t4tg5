<script setup lang="ts">
import { Ref, ref } from 'vue';
import Page from '../../js/page';
import Edit from './edit.vue';
import Pagetab from './pagetab.vue';
const props = defineProps<{ pages: ReadonlyArray<Page>; selected?: Page }>();
const emit = defineEmits<{
  (e: 'pageSelected', page: Page): void;
  (e: 'pageDeleted', page: Page): void;
  (e: 'pageRenamed', page: Page, name: string): void;
  (e: 'newPage'): void;
}>();

const editDialog: Ref<InstanceType<typeof Edit> | null> = ref(null);

function renamePage(page: Page, name: string) {
  emit('pageRenamed', page, name);
}
</script>

<template>
  <nav class="sa-pagebar">
    <menu class="sa-pagelist">
      <Pagetab
        v-for="page in pages"
        :page="page"
        :selected="page === selected"
        @select="$emit('pageSelected', page)"
        @edit="editDialog?.showModal()"
        @delete="$emit('pageDeleted', page)"
      />
    </menu>
    <hr class="sa-pagebar__divider" />
    <div class="sa-pagetab-like sa-newtab">
      <button class="sa-newtab__button" @click="$emit('newPage')">
        Add a page
      </button>
    </div>
    <Edit ref="editDialog" :page="selected" @submit="renamePage" />
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
