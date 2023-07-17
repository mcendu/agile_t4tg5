<script setup lang="ts">
import AddWidget from './addwidget.vue';

import Page from '../../js/page';
import WidgetRow from '../../../models/widget';
import widgetTable from '../widgets/index';
import { Ref, onBeforeMount, onBeforeUpdate, ref } from 'vue';

const props = defineProps<{ page?: Page }>();

function getWidget(type: string) {
  if (type in widgetTable) {
    return widgetTable[type];
  }
  console.warn(
    `An unknown widget of type "${type}" is found. The widget is not rendered.`,
  );
  return;
}

async function loadPage() {
  if (props.page === undefined) {
    return;
  }
  if (props.page.widgets === undefined)
    props.page.widgets = await controllers.page.show(props.page.id);
}

onBeforeMount(loadPage);
onBeforeUpdate(loadPage);
</script>

<template>
  <main class="sa-page sa-nopages" v-if="page === undefined">
    <p class="sa-nopages__text">No pages</p>
    <p class="sa-nopages__tip">
      Click &ldquo;Add a page&rdquo; on the left to create one.
    </p>
  </main>
  <main class="sa-page sa-page-content" v-else>
    <component
      v-for="w of page.widgets"
      :is="getWidget(w.type)"
      :data="w.data"
    />
    <AddWidget />
  </main>
</template>

<style>
.sa-page {
  height: 100%;
  background-color: var(--c-b1);
  grid-area: content;
}

.sa-page-content {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-auto-flow: column;
  grid-auto-columns: 12em;

  padding: 1em;
}

.sa-nopages {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: var(--c-a3);
}

.sa-nopages__text {
  font-size: 2em;
  font-weight: bold;
}

.sa-nopages__tip {
  margin-top: 1lh;
}
</style>
