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
  const rows = await controllers.module.index() as ModuleRow[];
  modules.value = rows.map(moduleRowtoModule);

});

async function addGrade(module: Module) {
  const resp = await controllers.module.addGrade(module.id, JSON.parse('{"session":"final", "grade": 50, "weight": 50}'))
}

async function getGrades(module: Module) {
  const resp = await controllers.module.getGrades(module.id);
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
