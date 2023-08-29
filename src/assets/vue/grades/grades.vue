<script setup lang="ts">
import { Ref, onBeforeMount, ref } from 'vue';
import Page from '../../js/page';
import Module from '../../js/module';
import ModuleRow from '../../../models/module';

import Add from './add.vue';
import Edit from './edit.vue';
import summaryCard from './summaryCard.vue';
import gradesCard from './gradesCard.vue';
import Grade from '../../../models/grade';

const modules: Ref<Module[]> = ref([]);
const completedModulesCounter: Ref<number> = ref(0);
const points: Ref<number> = ref(0);
const weightedPercentage: Ref<number> = ref(0);
const averageGrade: Ref<number> = ref(0);
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

function modulePassed(m: Module) {
  if (m.total?.weight == 100 && m.total?.grade >= 40) {
    return m.grades?.every((g) => {
      return g.grade >= 35;
    });
  }
  return false;
}

function getModulePoints(m: Module) {
  if (m.code.substring(0, 6) == 'CM3070') {
    // deal with final project double weight
    return 30;
  } else return 15;
}

function getModuleWeight(m: Module) {
  if (m.code.substring(0, 3) == 'CM1') {
    return 100 / 72;
  } else if (m.code.substring(0, 3) == 'CM2') {
    return 3 * (100 / 72);
  // deal with final project double weight
  } else if (m.code.substring(0, 6) == 'CM3070') {
    return 10 * (100 / 72);
  } else return 5 * (100 / 72);
}

async function reload() {
  const rows = (await controllers.module.index()) as ModuleRow[];
  modules.value = rows.map(moduleRowtoModule);
  completedModulesCounter.value = 0;
  // calc points for degree program
  points.value = 0;
  weightedPercentage.value = 0;
  averageGrade.value = 0;
  modules.value.forEach((m) => {
    if (modulePassed(m)) {
      completedModulesCounter.value++;
      points.value += getModulePoints(m);
      if (m.total?.grade) {
        weightedPercentage.value += (m.total?.grade * getModuleWeight(m)) / 100;
        averageGrade.value += m.total?.grade;
      }
    }
  });
  averageGrade.value /= completedModulesCounter.value;
  completedModulesCounter.value = (completedModulesCounter.value / 23) * 100;
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
  <main>
    <summaryCard
      :modules="modules"
      :points="points"
      :completedPercent="completedModulesCounter"
      :weightedPercent="weightedPercentage"
      :gradeAverage="averageGrade"
    />
  </main>
  <main class="sa-gradelist">
    <gradesCard
      v-for="mod in modules"
      :module="mod"
      :passed="modulePassed(mod)"
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
  gap: 10px;
}
</style>
