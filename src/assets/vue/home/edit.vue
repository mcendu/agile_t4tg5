<script setup lang="ts">
import { ref, Ref, inject, onBeforeMount, computed } from 'vue';
import '../../css/form.scss';
import { enabledModulesKey } from '../../js/module';
import Module from '../../../models/module';
import FormState from '../../js/composables/formstate';

const enabledModules = inject(enabledModulesKey);
const allModules = ref<Module[]>([]);
const dialog: Ref<HTMLDialogElement | undefined> = ref(undefined);

onBeforeMount(
  async () => (allModules.value = await controllers.module.index()),
);

const form = new FormState(
  computed({
    get() {
      return allModules.value;
    },
    async set(modules) {
      modules.forEach(async (m, i) => {
        // assume that the number of modules does not change
        if (m.enabled != allModules.value[i].enabled)
          await controllers.module.toggle(m.id, m.enabled);
      });

      allModules.value = modules;
      if (enabledModules)
        enabledModules.value = await controllers.module.indexEnabled();
    },
  }),
);

function showModal() {
  form.reset();
  dialog.value?.showModal();
}

defineExpose({ showModal });
</script>
<template>
  <dialog class="sa-dialog sa-module-select" ref="dialog">
    <form method="dialog">
      <h3 class="sa-form-heading">Module selection</h3>
      <ul class="sa-module-select__list">
        <li v-for="m in form.data">
          <label>
            <input type="checkbox" v-model="m.enabled" />
            <span>{{ m.code }} &ndash; {{ m.name }}</span>
          </label>
        </li>
      </ul>
      <p class="sa-form-actions">
        <button
          class="form-button submit"
          type="submit"
          @click="() => form.save()"
        >
          Save
        </button>
        <button class="form-button" @click="() => dialog?.close()">
          Cancel
        </button>
      </p>
    </form>
  </dialog>
</template>
