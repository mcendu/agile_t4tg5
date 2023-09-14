<script setup lang="ts">
import { inject, ref } from 'vue';
import { enabledModulesKey } from '../../js/module';
import ModuleSelect from './edit.vue';

const enabledModules = inject(enabledModulesKey);
const moduleSelect = ref<InstanceType<typeof ModuleSelect> | undefined>(
  undefined,
);

function showModuleSelectDialog() {
  if (moduleSelect.value?.showModal) moduleSelect.value.showModal();
}
</script>

<template>
  <article class="sa-home">
    <section class="sa-courses sa-current-courses">
      <h3>Currently taking</h3>
      <ul>
        <li v-for="m in enabledModules">{{ m.code }} {{ m.name }}</li>
      </ul>
      <div class="sa-courses__actions">
        <button class="icon-button sa-courses__action">
          <span
            class="material-symbols-outlined"
            @click="showModuleSelectDialog"
          >
            edit
          </span>
        </button>
      </div>
      <ModuleSelect ref="moduleSelect" />
    </section>
  </article>
</template>

<style lang="scss">
.sa-home {
  padding: 1em;
}

.sa-courses {
  position: relative;
  background-color: var(--c-bg);
  border-radius: 4px;
  box-shadow: var(--shadow);
  margin-bottom: 8px;

  padding: 10px;

  &__actions {
    position: absolute;
    right: 2px;
    top: 2px;
    z-index: 5;

    display: flex;
  }

  &__action {
    padding: 2px;
    border-radius: 4px;
  }

  @media (hover: hover) {
    &__action {
      opacity: 0;
    }

    &:hover &__action,
    &:focus-within &__action {
      opacity: 1;
    }
  }
}
</style>
