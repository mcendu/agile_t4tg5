<script setup lang="ts">
import MobileHeader from './header.vue';
import HomePage from '../home/home.vue';
import GradesPage from '../grades/grades.vue';
import AddWidget from './addwidget.vue';
	@@ -10,8 +9,6 @@ import widgetTable from '../widgets/index';
import { Ref, onBeforeMount, ref, watch } from 'vue';
const props = defineProps<{ page?: Page }>();
const emit = defineEmits<{ menu: [] }>();
const widgets: Ref<Widget[] | undefined> = ref(undefined);
function getWidget(type: string) {
	@@ -68,56 +65,49 @@ watch(() => props.page?.id, loadPage);
</script>

<template>
  <main class="sa-page">
    <MobileHeader :page="page" @menu="$emit('menu')" />
    <article class="sa-nopages" v-if="page === undefined">
      <p class="sa-nopages__text">No pages</p>
      <p class="sa-nopages__tip">
        Click &ldquo;Add a page&rdquo; on the left to create one.
      </p>
    </article>
    <template v-else-if="page.special === true">
      <HomePage v-if="page.name == 'Home'" @reload="loadPage" />
      <GradesPage v-else-if="page.name == 'Grades'" />
    </template>
    <article class="sa-content" v-else>
      <component
        v-for="w of widgets"
        :is="getWidget(w.type)"
        :data="w.data"
        @update="(data: object) => updateWidget(w, data)"
        @delete="() => deleteWidget(w)"
      />
      <AddWidget @click="addWidget" />
    </article>
  </main>
</template>

<style lang="scss">
@use '/css/stops';
.sa-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: var(--c-b1);
  grid-area: content;
}
.sa-content {
  height: 100vh;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-auto-flow: column;
  grid-auto-columns: 12em;
  gap: 8px;
  padding: 1em;
  overflow: auto;
  @media (height >= stops.$height-s) {
    grid-auto-columns: 16em;
  }
	@@ -132,10 +122,14 @@ watch(() => props.page?.id, loadPage);
  @media (width < stops.$width-xs) {
    grid-auto-columns: calc(100vw - 2em);
  }
  @media (width < stops.$width-s) {
    height: calc(100vh - 40px);
  }
}
.sa-nopages {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: var(--c-fg-tl);

  &__text {
    margin-top: 0;
    font-size: 2em;
    font-weight: bold;
  }

  &__tip {
    margin-top: 1lh;
  }
}
</style>
