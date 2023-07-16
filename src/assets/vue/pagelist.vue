<script setup lang="ts">
import Page from '../js/components/page';
const props = defineProps<{ pages: ReadonlyArray<Page>; selected?: Page }>();
defineEmits(['pageSelect', 'newPage']);
</script>

<template>
  <nav class="sa-pagebar">
    <menu class="sa-pagelist">
      <li
        v-for="page of props.pages"
        class="sa-pagetab"
        :class="{ 'sa-pagetab--current': page === props.selected }"
      >
        <button @click="$emit('pageSelect', page)">
          {{ page.name }}
        </button>
      </li>
    </menu>
    <hr class="sa-pagebar__divider" />
    <div class="sa-pagetab sa-newtab">
      <button class="" @click="$emit('newPage')">Add a page</button>
    </div>
  </nav>
</template>

<style>
.sa-pagebar {
  display: flex;
  flex-direction: column;
  align-items: stretch;

  margin: 0;
  padding: 0;

  grid-area: 'tabs';
}

.sa-pagebar__divider {
  height: 0;
  border: 1px solid var(--c-f3);
  margin: 0.2lh 1em;
}

.sa-pagelist {
  margin: 0;
  padding: 0;
}

.sa-pagetab {
  display: block;
  margin: 0;
  height: 2lh;
  border-radius: 8px 0 0 8px;
  transition: background-color 333ms;
  background-color: transparent;
}

.sa-pagetab:hover {
  background-color: var(--c-h0);
}

.sa-pagetab:active {
  background-color: var(--c-b1);
}

.sa-pagetab.sa-pagetab--current {
  transition: none;
  background-color: var(--c-b1);
}

.sa-pagetab > button {
  width: 100%;
  height: 100%;
  padding: 0.5lh 1em;

  display: flex;
  align-items: center;

  /* override UA button styles */
  border: none;
  background-color: transparent;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  text-align: left;
}
</style>
