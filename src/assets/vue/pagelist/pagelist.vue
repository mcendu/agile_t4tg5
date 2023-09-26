<!--
Copyright (C) 2023 Goldsmiths, University of London.
All rights reserved.
-->

<script setup lang="ts">
import { Ref, inject, onBeforeMount, ref, watch } from 'vue';
import Page from '../../js/page';
import PageRow from '../../../models/page';

import Edit from './edit.vue';
import Pagetab from './pagetab.vue';
import Module, { enabledModulesKey } from '../../js/module';

const props = defineProps<{
  modelValue?: Page;
  visible?: boolean;
}>();
const emit = defineEmits<{
  'update:modelValue': [value: Page | undefined];
  close: [];
}>();

const homePage = new Page(BigInt(-1), 'Home', true);
const gradesPage = new Page(BigInt(-2), 'Grades', true);

const pages: Ref<Page[]> = ref([]);
const editDialog: Ref<InstanceType<typeof Edit> | null> = ref(null);
const user_pages: Ref<Page[]> = ref([]);

function pageRowToPage(row: PageRow): Page {
  return new Page(row.id, row.name);
}

async function getModulePages() {
  const rows = await controllers.page.indexAppCreated();
  pages.value = rows.map(pageRowToPage);
}

async function getUserPages() {
  const user_rows = await controllers.page.indexUserCreated();
  user_pages.value = user_rows.map(pageRowToPage);
}

const enabledModules: Ref<Module[]> = inject(enabledModulesKey, ref([]));
watch(enabledModules, getModulePages);

onBeforeMount(() => {
  changePage(homePage);
  return Promise.all([getModulePages(), getUserPages()]);
});

async function newPage() {
  const page = pageRowToPage(await controllers.page.add());
  user_pages.value.push(page);
  emit('update:modelValue', page);
  emit('close');
}

function changePage(page: Page) {
  emit('update:modelValue', page);
  emit('close');
}

function isSelectedPage(page: Page) {
  if (props.modelValue === undefined) return false;
  return page.id === props.modelValue.id;
}

async function renamePage(page: Page, name: string) {
  await controllers.page.rename(page.id, name);
  page.name = name;
}

async function deletePage(page: Page) {
  const index = user_pages.value.indexOf(page);
  if (page === props.modelValue) {
    if (user_pages.value.length == 1) {
      emit('update:modelValue', undefined);
    } else if (index == 0) {
      emit('update:modelValue', user_pages.value[index + 1]);
    } else {
      emit('update:modelValue', user_pages.value[index - 1]);
    }
  }
  await controllers.page.del(page.id);
  user_pages.value.splice(index, 1);
}
</script>

<template>
  <div
    class="sa-pagebar__backdrop"
    :class="{
      'sa-pagebar__backdrop--visible': visible,
    }"
    @click="$emit('close')"
  ></div>
  <nav
    class="sa-pagebar"
    :class="{
      'sa-pagebar--visible': visible,
    }"
    v-bind="$attrs"
  >
    <!-- Mobile -->
    <section class="sa-pagebar__section sa-pagebar__mobile-controls">
      <button class="sa-pagetab-like sa-menutab" @click="$emit('close')">
        <span class="material-symbols-outlined">close</span>
        Close
      </button>
      <hr class="sa-pagebar__divider" />
    </section>
    <menu class="sa-pagebar__section">
      <Pagetab
        :page="homePage"
        :selected="isSelectedPage(homePage)"
        @select="changePage(homePage)"
      />
      <Pagetab
        :page="gradesPage"
        :selected="isSelectedPage(gradesPage)"
        @select="changePage(gradesPage)"
      />
    </menu>
    <hr class="sa-pagebar__divider" />
    <menu class="sa-pagebar__section">
      <Pagetab
        v-for="page in pages"
        :page="page"
        :selected="isSelectedPage(page)"
        @select="changePage(page)"
      />
    </menu>
    <hr class="sa-pagebar__divider" />
    <menu class="sa-pagebar__section">
      <Pagetab
        v-for="page in user_pages"
        editable
        :page="page"
        :selected="isSelectedPage(page)"
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
@use '/css/dark' as *;

.sa-pagebar {
  height: 100vh;
  margin: 0;
  padding: 1em;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 5px;

  background-color: var(--c-l2);
  font-size: 0.75em;

  grid-area: tabs;

  @include dark {
    background-color: var(--c-l7);
  }

  @media (width < stops.$width-s) {
    grid-area: content;
    position: absolute;
    left: -100vw;
    z-index: 50;

    width: 90vw;
    max-width: 400px;
    opacity: 0;
    box-shadow: var(--shadow);

    transition:
      opacity 0.4s,
      left 0.4s cubic-bezier(0.125, 0.75, 0.375, 1);

    @media (prefers-reduced-motion) {
      transition: opacity 0.4s;
    }

    &--visible {
      opacity: 1;
      left: 0vw;
    }
  }

  &__section {
    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__divider {
    margin: 0;
    height: 0;
    border: 0;
    border-top: 1px solid var(--c-fg-tl);
    background-color: transparent;
  }

  &__backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 100vh;
    background-color: var(--c-td);
    z-index: 40;

    opacity: 0;
    transition:
      opacity 0.2s,
      width 0.2s step-end;

    &--visible {
      opacity: 1;
      width: 100vw;
      transition:
        opacity 0.4s,
        width 0s step-start;
    }
  }

  @media (width >= stops.$width-s) {
    &__backdrop {
      display: none;
    }
    &__mobile-controls {
      display: none;
    }
  }
}

.sa-menutab {
  display: flex;
  align-items: center;
  gap: 0.5em;
}
</style>
