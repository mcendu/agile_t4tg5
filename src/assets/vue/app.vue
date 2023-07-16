<script setup lang="ts">
import PageList from './pagelist.vue';

import Page from '../js/page';
import PageRow from '../../models/page';
import { Ref, onBeforeMount, ref } from 'vue';

const pages: Ref<Page[]> = ref([]);
const currentPage: Ref<Page | undefined> = ref(undefined);

function pageRowToPage(row: PageRow): Page {
  return new Page(row.id, row.name);
}

onBeforeMount(async () => {
  const rows = await controllers.page.index();
  pages.value = rows.map(pageRowToPage);
  if (rows.length) currentPage.value = pages.value[0];
});

async function newPage() {
  const openNewPage = pages.value.length == 0;
  const page = pageRowToPage(await controllers.page.add());
  pages.value.push(page);
  if (openNewPage) currentPage.value = page;
}

function changePage(page: Page) {
  currentPage.value = page;
}
</script>

<template>
  <div class="sa-book">
    <PageList
      :pages="pages"
      :selected="currentPage"
      @page-select="changePage"
      @new-page="newPage"
    />
  </div>
</template>

<style>
.sa-book {
  display: grid;
  width: 100%;
  height: 100%;

  grid-template-columns: 10em 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'tabs content';
}
</style>
