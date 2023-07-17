<script setup lang="ts">
import PageList from './pagelist/pagelist.vue';
import PageView from './page/page.vue';

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
  const page = pageRowToPage(await controllers.page.add());
  pages.value.push(page);
  currentPage.value = page;
}

function changePage(page: Page) {
  currentPage.value = page;
}

async function deletePage(page: Page) {
  const index = pages.value.indexOf(page);
  if (page === currentPage.value) {
    if (pages.value.length == 1) currentPage.value = undefined;
    else if (index == 0) currentPage.value = pages.value[index + 1];
    else currentPage.value = pages.value[index - 1];
  }
  await controllers.page.del(page.id);
  pages.value.splice(index, 1);
}
</script>

<template>
  <div class="sa-book">
    <PageList
      :pages="pages"
      :selected="currentPage"
      @page-selected="changePage"
      @page-deleted="deletePage"
      @new-page="newPage"
    />
    <PageView :page="currentPage" />
  </div>
</template>

<style>
.sa-book {
  display: grid;
  width: 100%;

  grid-template-columns: minmax(10em, 1fr) 3fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'tabs content';
}
</style>
