<script setup lang="ts">
import AddWidget from './addwidget.vue';

import Page from '../../js/page';
import Widget from '../../../models/widget';
import widgetTable from '../widgets/index';
import { Ref, onBeforeMount, onBeforeUpdate, ref } from 'vue';

const props = defineProps<{ page?: Page }>();
const widgets: Ref<Widget[] | undefined> = ref(undefined);

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

  if (!widgets.value) {
    widgets.value = await controllers.page.show(props.page.id);
  }
}

async function updateWidget(w: Widget, data: object) {
  await controllers.widget.edit(w.id, data);
  w.data = data;
}

async function addWidget() {
  if (props.page === undefined) {
    return;
  }

  const w: Widget = {
    id: -1n,
    type: 'LinkWidget',
    data: {
      title: 'New link',
      target: 'https://example.com/',
    },
  };
  w.id = (await controllers.widget.add(props.page.id, w)).id;
  widgets.value?.push(w);
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
  <main class="sa-page sa-content" v-else>
    <component
      v-for="w of widgets"
      :is="getWidget(w.type)"
      :data="w.data"
      @update="(data: object) => updateWidget(w, data)"
    />
    <AddWidget @click="addWidget" />
  </main>
</template>

<style lang="scss">
@use '/css/stops';

.sa-page {
  height: 100%;
  background-color: var(--c-b1);
  grid-area: content;
}

.sa-content {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-auto-flow: column;
  grid-auto-columns: 12em;

  padding: 1em;

  @media (height > stops.$height-s) {
    grid-auto-columns: 16em;
  }

  @media (stops.$height-m <= height < stops.$height-l) {
    grid-template-rows: repeat(3, 1fr);
  }

  @media (height >= stops.$height-l) {
    grid-template-rows: repeat(4, 1fr);
  }

  @media (width < stops.$width-xs) {
    grid-auto-columns: calc(100vw - 2em);
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
