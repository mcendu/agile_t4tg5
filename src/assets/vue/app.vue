<script setup lang="ts">
import PageList from './pagelist/pagelist.vue';
import PageView from './page/page.vue';

import Page from '../js/page';
import Module from '../js/module';
import { Ref, onBeforeMount, provide, ref, watchEffect } from 'vue';

const currentPage: Ref<Page | undefined> = ref(undefined);
const enabledModules: Ref<Module[]> = ref([]);

onBeforeMount(async () => {
  enabledModules.value = await controllers.module.indexEnabled();
});

const menuVisible = ref(false);

provide('enabledModules', enabledModules);
</script>

<template>
  <div class="sa-book">
    <PageList
      v-model="currentPage"
      :visible="menuVisible"
      @close="menuVisible = false"
    />
    <PageView :page="currentPage" @menu="menuVisible = true" />
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
