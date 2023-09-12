<script setup lang="ts">
import { ref } from 'vue';

import Module from '../../js/module';

const props = defineProps<{
  modules: Module[];
  points: number;
  completedPercent: number;
  weightedPercent: number;
  gradeAverage: number;
}>();
</script>

<template>
  <main class="sc-card">
    <p class="sc-card__text">Degree Credits: {{ points }}</p>
    <p class="sc-card__text">Completion: {{ completedPercent.toFixed(2) }}%</p>
    <p class="sc-card__text">
      Current Grade: {{ weightedPercent.toFixed(2) }}%
    </p>
    <p class="sc-card__text">Grade Average: {{ gradeAverage.toFixed(2) }}%</p>
  </main>
</template>

<style lang="scss">
.sc-card {
  text-align: left;
  width: 100%;
  padding: 1em;
  border-radius: 5px;
  background-color: var(--c-bg);
  box-shadow: var(--shadow);
  margin-bottom: 1.2em;

  &__text {
    margin-top: 0.5em;
    font-size: 1.1em;
    font-weight: bold;
    color: var(--c-fg-t);
  }

  &__table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;

    th,
    td {
      height: 32px;
      padding: 0 0.2em;
    }

    thead {
      font-weight: bold;

      th,
      td {
        border-bottom: 1px solid var(--c-fg-tl);
      }
    }

    tbody {
      th,
      td {
        text-transform: capitalize;
        font-size: smaller;
      }
    }

    tfoot {
      font-weight: bold;

      th,
      td {
        border-top: 1px solid var(--c-fg-tl);
      }
    }
  }

  &__table-data {
    text-align: right;
  }

  &__data-column {
    text-align: right;
    width: 5em;
  }

  &__action-column {
    width: 64px;
  }

  &__actions {
    display: flex;
    gap: 4px;
  }

  &__action {
    padding: 2px;
    border-radius: 4px;
  }
}
</style>
