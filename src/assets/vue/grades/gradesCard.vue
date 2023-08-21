<script setup lang="ts">
import Module from '../../js/module';

const props = defineProps<{
  module: Module;
  selected: boolean;
}>();
const emit = defineEmits<{
  (e: 'addGrade'): void;
  (
    e: 'editGrade',
    id: bigint,
    type: string,
    grade: Number,
    weight: Number,
  ): void;
}>();

function addGrade(e: Event) {
  emit('addGrade');
}

async function deleteGrade(id: bigint) {
  const resp = await controllers.module.deleteGrade(id);
}
</script>

<template>
  <main class="gc-card gc-card__text">
    <p>{{ module.name }} - {{ module.code }}</p>
    <table>
      <tr v-for="row in module.grades">
        <td>{{ row.type }}</td>
        <td>{{ row.grade }}</td>
        <td>{{ row.weight }}</td>
        <td>{{ row.id }}</td>
        <td>
          <button
            class="btn btn-primary"
            @click="$emit('editGrade', row.id, row.type, row.grade, row.weight)"
          >
            Edit
          </button>
        </td>
        <td>
          <button class="btn btn-primary" @click="deleteGrade(row.id)">
            Remove
          </button>
        </td>
      </tr>
    </table>
    <hr class="gc-card__divider" />
    <table>
      <tr>
        <td>Total:</td>
        <td>{{ module.total.overall_grade }}</td>
        <td>{{ module.total.overall_weight }}</td>
      </tr>
    </table>
    <button class="btn btn-primary" @click="addGrade">Add</button>
  </main>
</template>

<style lang="scss">
.gc-card {
  text-align: left;
  width: 100%;
  margin: 10px;
  padding: 10px;
  border: 2px solid var(--c-fg-tl);
  border-radius: 5px;
  color: var(--c-fg-tl);
  background-color: var(--c-bg);

  &__text {
    margin-top: 0;
    font-size: 1em;
    font-weight: bold;
    color: white;
  }

  &__table {
    width: inherit;
  }

  &__table td {
    width: 25%;
    background-color: grey;
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
