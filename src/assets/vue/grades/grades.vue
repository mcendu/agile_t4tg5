<script setup lang="ts">
import { Ref, onBeforeMount, ref } from 'vue';
import Page from '../../js/page';
import Module from '../../js/module';
import ModuleRow from '../../../models/module';

import Add from './add.vue';
import Edit from './edit.vue';
import gradesCard from './gradesCard.vue';
import Grade from '../../../models/grade';

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

async function reload() {
  const rows = (await controllers.module.index()) as ModuleRow[];
  modules.value = rows.map(moduleRowtoModule);
}

onBeforeMount(reload);

async function addGradeDialog(module: Module) {
  addDialog.value?.showModal(module);
}

async function addGrade(
  id: bigint,
  session: string,
  grade: number,
  weight: number,
) {
  await controllers.grade.addGrade(id, session, grade, weight);
  reload();
}

async function editGradeDialog(grade: Grade) {
  editDialog.value?.showModal(grade);
}

async function editGrade(grade: Grade) {
  await controllers.grade.editGrade(
    grade.id,
    grade.type,
    grade.grade,
    grade.weight,
  );
  // Note: is it possible to just reload a single module?
  reload();
}

async function deleteGrade(grade: Grade) {
  await controllers.grade.deleteGrade(grade.id);
  reload();
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
      @deleteGrade="deleteGrade"
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

  padding: 1em;
  gap: 10px;
  overflow-y: auto;
}
</style>
