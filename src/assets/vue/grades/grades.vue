<script setup lang="ts">
import { Ref, onBeforeMount, ref } from 'vue';
import Module from '../../js/module';
import ModuleRow from '../../../models/module';

import gradesCard from './gradesCard.vue';

const modules: Ref<Module[]> = ref([]);

function moduleRowtoModule(row: ModuleRow): Module {
  return new Module(row.id, row.name, row.code, row.enabled, row.grades);
}

onBeforeMount(async () => {
  const rows = await controllers.module.index();
  modules.value = rows.map(moduleRowtoModule);
});

async function addGrade(module: Module) {
  console.log(module.id);
  const resp = await controllers.module.addGrade(module.id, '{Midterm: {grade: 50, weight: 50}}')
  console.log(resp)
}

async function getGrades(module: Module) {
  console.log(module.id);
  const resp = await controllers.module.getGrades(module.id);
  console.log(resp);
}
</script>

<template>
  <main>
    <p>This is the grades page.</p>
    <gradesCard
        v-for="mod in modules"
        :module="mod"
        :selected="false"
        @addGrade="addGrade(mod)"
        @getGrades="getGrades(mod)"
      />
  </main>
</template>

<style lang="scss">

</style>
