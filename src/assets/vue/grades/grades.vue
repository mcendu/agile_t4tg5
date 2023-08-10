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

function addGrade(module: Module) {
  console.log('done')
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
      />
  </main>
</template>

<style lang="scss">
.sa-addwidget {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 4px dashed var(--c-fg-tl);
  border-radius: 8px;
  color: var(--c-fg-tl);
}

.sa-addwidget__icon {
  font-family: 'Material Symbols Outlined';
  font-size: 48px;
  margin-top: 0;
}

.sa-addwidget__text {
  margin-top: 0.5lh;
}
</style>
