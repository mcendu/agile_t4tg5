<script setup lang="ts">
import { Ref, onBeforeMount, ref } from 'vue';
import Page from '../../js/page';
import Module from '../../js/module';
import ModuleRow from '../../../models/module';

import Add from './add.vue';
import Edit from './edit.vue';
import gradesCard from './gradesCard.vue';

const emit = defineEmits<{ (e: 'reload'): void }>();

const modules: Ref<Module[]> = ref([]);
const addDialog: Ref<InstanceType<typeof Add> | null> = ref(null);
const editDialog: Ref<InstanceType<typeof Edit> | null> = ref(null);

function moduleRowtoModule(row: ModuleRow): Module {
  return new Module(
    row.id,
    row.name,
    row.code,
    row.enabled,
    row.grades,
    row.total,
  );
}

onBeforeMount(async () => {
  const rows = (await controllers.module.index()) as ModuleRow[];
  modules.value = rows.map(moduleRowtoModule);
});

async function addGradeDialog(module: Module) {
  addDialog.value?.showModal(module);
  await controllers.module.getGrades(module.id);
}

async function addGrade(
  id: bigint,
  session: string,
  grade: Number,
  weight: Number,
) {
  await controllers.module.addGrade(id, session, grade, weight);
  emit('reload');
}

async function editGradeDialog(
  id: bigint,
  session: string,
  grade: Number,
  weight: Number,
) {
  editDialog.value?.showModal(id, session, grade, weight);
}

async function editGrade(
  id: bigint,
  session: string,
  grade: Number,
  weight: Number,
) {
  await controllers.module.editGrade(id, grade, weight);
}

async function getGrades(module: Module) {
  addDialog.value?.showModal(module);
  await controllers.module.getGrades(module.id);
}
</script>

<template>
  <main class="sa-gradelist">
    <gradesCard
      v-for="mod in modules"
      :module="mod"
      :selected="false"
      @addGrade="addGradeDialog(mod)"
      @editGrade="editGradeDialog"
    />
  </main>
  <Add ref="addDialog" @add="addGrade" />
  <Edit ref="editDialog" @edit="editGrade" />
</template>

<style lang="scss">
.sa-gradelist {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
}
</style>
