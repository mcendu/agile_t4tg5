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
}>();

function addGrade(e: Event) {
  emit('addGrade');
}

async function deleteGrade(id: bigint) {
  const resp = await controllers.grade.deleteGrade(id);
}
</script>

<template>
  <main class="gc-card gc-card__text">
    <p>{{ module.name }} - {{ module.code }}</p>
    <table>
      <tr v-for="grade in module.grades">
        <td>{{ grade.type }}</td>
        <td>{{ grade.grade }}</td>
        <td>{{ grade.weight }}</td>
        <td>{{ grade.id }}</td>
        <td>
          <button class="btn btn-primary" @click="$emit('editGrade', grade)">
            Edit
          </button>
        </td>
        <td>
          <button class="btn btn-primary" @click="deleteGrade(grade.id)">
            Remove
          </button>
        </td>
      </tr>
    </table>
    <hr class="gc-card__divider" />
    <table>
      <tr>
        <td>Total:</td>
        <td>{{ module.total?.grade }}</td>
        <td>{{ module.total?.weight }}</td>
      </tr>
    </table>
    <button class="btn btn-primary" @click="addGrade">Add</button>
  </main>
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
    width: inherit;
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
