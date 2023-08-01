<script setup lang="ts">
import PageList from './pagelist/pagelist.vue';
import PageView from './page/page.vue';

import Page from '../js/page';
import { Ref, ref } from 'vue';

const currentPage: Ref<Page | undefined> = ref(undefined);
</script>

<template>
  <div class="sa-book">
    <PageList v-model="currentPage" />
    <PageView :page="currentPage" />
  </div>
</template>

<style lang="scss">
.sa-book {
  display: grid;
  width: 100%;

  grid-template-columns: minmax(10em, 1fr) 3fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'tabs content';
}
</style>
