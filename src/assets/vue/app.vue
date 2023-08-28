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
@use '../css/stops';

.sa-book {
  display: grid;
  width: 100%;

  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'tabs content';

  @media (width < stops.$width-s) {
    grid-template-columns: 1fr;
    grid-template-areas: 'content';
  }

  @media (stops.$width-s <= width < stops.$width-m) {
    grid-template-columns: 1fr 2fr;
  }

  @media (stops.$width-m <= width < stops.$width-l) {
    grid-template-columns: 1fr 3fr;
  }

  @media (width >= stops.$width-l) {
    grid-template-columns: 240px 1fr;
  }
}
</style>
