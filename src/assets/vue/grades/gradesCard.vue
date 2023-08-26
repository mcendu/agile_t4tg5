<script setup lang="ts">
import Module from '../../js/module';
import Grade from '../../../models/grade';

const props = defineProps<{
  module: Module;
  selected: boolean;
}>();
const emit = defineEmits<{
  addGrade: [];
  editGrade: [grade: Grade];
  deleteGrade: [grade: Grade];
}>();

function addGrade(e: Event) {
  emit('addGrade');
}
</script>

<template>
  <div class="gc-card">
    <h3>{{ module.code }} {{ module.name }}</h3>
    <p>
      <table class="gc-card__table">
        <tbody>
          <tr v-for="grade in module.grades">
            <th>{{ grade.type }}</th>
            <td class="gc-card__table-data">{{ grade.grade }}</td>
            <td class="gc-card__table-data">{{ grade.weight }}</td>
            <td>
              <button class="btn btn-primary" @click="$emit('editGrade', grade)">
                Edit
              </button>
            </td>
            <td>
              <button
                class="btn btn-primary"
                @click="$emit('deleteGrade', grade)"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <td class="gc-card__table-data">{{ module.total?.grade }}</td>
            <td class="gc-card__table-data">{{ module.total?.weight }}</td>
          </tr>
        </tfoot>
      </table>
    </p>
    <p>
      <button class="form-button" @click="addGrade">Add grade</button>
    </p>
  </div>
</template>

<style lang="scss">
.gc-card {
  text-align: left;
  width: 100%;
  padding: 10px;
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
    border-collapse: collapse;

    th,
    td {
      padding: 0.5vh 0.2em;
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

  &__icon {
    font-family: 'Material Symbols Outlined';
    font-size: 48px;
    margin-top: 0;
  }

  &__divider {
    width: 100%;
    margin: 0;
    height: 0;
    border: 0;
    border-top: 2px solid var(--c-fg-tl);
    background-color: transparent;
  }
}
</style>
