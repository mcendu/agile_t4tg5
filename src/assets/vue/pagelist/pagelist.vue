<script setup lang="ts">
import { Ref, onBeforeMount, ref } from 'vue';
import Page from '../../js/page';
import PageRow from '../../../models/page';

import Edit from './edit.vue';
import Pagetab from './pagetab.vue';

const props = defineProps<{ modelValue?: Page }>();
const emit = defineEmits<{ 'update:modelValue': [value: Page | undefined] }>();

const pages: Ref<Page[]> = ref([]);
const editDialog: Ref<InstanceType<typeof Edit> | null> = ref(null);

function pageRowToPage(row: PageRow): Page {
  return new Page(row.id, row.name);
}

onBeforeMount(async () => {
  const rows = await controllers.page.index();
  pages.value = rows.map(pageRowToPage);
  if (rows.length) emit('update:modelValue', pages.value[0]);
});

async function newPage() {
  const page = pageRowToPage(await controllers.page.add());
  pages.value.push(page);
  emit('update:modelValue', page);
}

function changePage(page: Page) {
  emit('update:modelValue', page);
}

async function renamePage(page: Page, name: string) {
  await controllers.page.rename(page.id, name);
  page.name = name;
}

async function deletePage(page: Page) {
  const index = pages.value.indexOf(page);
  if (page === props.modelValue) {
    if (pages.value.length == 1) {
      emit('update:modelValue', undefined);
    } else if (index == 0) {
      emit('update:modelValue', pages.value[index + 1]);
    } else {
      emit('update:modelValue', pages.value[index - 1]);
    }
  }
  await controllers.page.del(page.id);
  pages.value.splice(index, 1);
}
</script>

<template>
  <nav class="sa-pagebar" v-bind="$attrs">
    <menu class="sa-pagelist">
      <Pagetab
        v-for="page in pages"
        :page="page"
        :selected="page === modelValue"
        @select="changePage(page)"
        @edit="editDialog?.showModal()"
        @delete="deletePage(page)"
      />
    </menu>
    <hr class="sa-pagebar__divider" />
    <button class="sa-pagetab-like sa-menutab" @click="newPage">
      <span class="material-symbols-outlined">add</span>
      Add a page
    </button>
  </nav>
  <Edit ref="editDialog" :page="modelValue" @submit="renamePage" />
</template>

<style lang="scss">
@use '/css/stops.scss';
@use '/css/colors.scss';

.sa-pagebar {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 5px;
  margin: 0;
  padding: 1em;

  background-color: var(--c-l2);
  font-size: 0.75em;

  grid-area: tabs;

  @media (width < stops.$width-s) {
    grid-area: content;
    position: absolute;
    left: -100vw;
    width: 90vw;
    box-shadow: var(--shadow);
  }

  &__divider {
    margin: 0;
    height: 0;
    border: 0;
    border-top: 1px solid var(--c-fg-t);
    background-color: transparent;
  }
}

.sa-pagelist {
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 5px;
}

.sa-menutab {
  display: flex;
  align-items: center;
  gap: 0.5em;
}
</style>
