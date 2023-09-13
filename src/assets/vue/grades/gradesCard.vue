<script setup lang="ts">
import { ref } from 'vue';

import Module from '../../js/module';
import Grade from '../../../models/grade';

const props = defineProps<{
  module: Module;
  passed?: boolean;
  selected: boolean;
}>();
const emit = defineEmits<{
  addGrade: [];
  editGrade: [grade: Grade];
  deleteGrade: [grade: Grade];
}>();

const editing = ref(false);

function colorTotal() {
  const weight = props.module.total?.weight;
  if (weight != 100) return '';

  return props.passed
    ? 'gc-card__total-grade--passed'
    : 'gc-card__total-grade--failed';
}
</script>

<template>
  <div class="gc-card">
    <h6>{{ module.code }} {{ module.name }}</h6>
    <table class="gc-card__table">
      <thead>
        <tr>
          <th></th>
          <th class="gc-card__data-column">Grade</th>
          <th class="gc-card__data-column">Weight</th>
          <th class="gc-card__action-column" v-show="editing"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="grade in module.grades">
          <th>{{ grade.type }}</th>
          <td class="gc-card__table-data">{{ grade.grade }}</td>
          <td class="gc-card__table-data">{{ grade.weight }}</td>
          <td v-show="editing">
            <div class="gc-card__actions">
              <button
                class="icon-button gc-card__action"
                @click="$emit('editGrade', grade)"
              >
                <span class="material-symbols-outlined">edit</span>
              </button>
              <button
                class="icon-button gc-card__action"
                @click="$emit('deleteGrade', grade)"
              >
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <td
            class="gc-card__table-data gc-card__total-grade"
            :class="colorTotal()"
          >
            {{ module.total?.grade }}
          </td>
          <td class="gc-card__table-data">{{ module.total?.weight }}</td>
          <td v-show="editing"></td>
        </tr>
      </tfoot>
    </table>
    <p class="sa-form-actions">
      <button
        class="form-button"
        :class="{
          submit: editing,
        }"
        @click="editing = !editing"
      >
        {{ editing ? 'Done' : 'Edit' }}
      </button>
      <button class="form-button" v-show="editing" @click="$emit('addGrade')">
        Add grade
      </button>
    </p>
  </div>
</template>

<style lang="scss">
@use '../../css/dark' as *;

.gc-card {
  text-align: left;
  width: 100%;
  padding: 1em;
  border-radius: 5px;
  background-color: var(--c-bg);
  box-shadow: var(--shadow);

  &__text {
    margin-top: 0;
    font-size: 1em;
    font-weight: bold;
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

  &__total-grade {
    &--passed {
      color: hsl(120deg 80% 40%);
    }

    &--failed {
      color: hsl(2deg 80% 50%);
    }
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
