<script setup lang="ts">
import Page from '../../js/page';
import WidgetRow from '../../../models/widget';
import widgetTable from '../widgets/index';
import { Ref, onBeforeMount, onBeforeUpdate, ref } from 'vue';

const props = defineProps<{ page?: Page }>();

const widgets: Ref<WidgetRow[]> = ref([]);

function getWidget(type: string) {
  if (type in widgetTable) {
    return widgetTable[type];
  }
  console.warn(
    `An unknown widget of type "${type}" is found. It is not rendered.`,
  );
  return;
}

async function loadPage() {
  if (props.page === undefined) {
    widgets.value = [];
    return;
  }
  if (props.page.widgets === undefined)
    props.page.widgets = await controllers.page.show(props.page.id);
  widgets.value = props.page.widgets;
}

onBeforeMount(loadPage);
onBeforeUpdate(loadPage);
</script>

<template>
  <main class="sa-page sa-nopages" v-if="page === undefined">
    <p class="sa-nopages__text">No pages</p>
    <p class="sa-nopages__tip">
      Click &ldquo;Add a page&rdquo; at the left to create one.
    </p>
  </main>
  <main class="sa-page sa-page-content" v-else>
    <component v-for="w of widgets" :is="getWidget(w.type)" :data="w.data" />
  </main>
</template>

<style></style>
