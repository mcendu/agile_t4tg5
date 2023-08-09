<script setup lang="ts">
import { ref, Ref } from 'vue';
import '../../css/form.scss';

defineOptions({
  name: 'WidgetBase',
});
const emit = defineEmits<{
  edit: [];
  delete: [];
}>();

const editDialog: Ref<HTMLDialogElement | null> = ref(null);

function showEditForm() {
  emit('edit');
  editDialog.value?.showModal();
}
</script>

<template>
  <div class="sa-widget" v-bind="$attrs">
    <slot></slot>
    <div class="sa-widget__actions">
      <slot name="actions">
        <button class="sa-widget__action" @click="showEditForm">
          <span class="material-symbols-outlined">edit</span>
        </button>
      </slot>
      <button class="sa-widget__action" @click="$emit('delete')">
        <span class="material-symbols-outlined">delete</span>
      </button>
    </div>
    <dialog class="sa-dialog" ref="editDialog">
      <form class="sa-form" method="dialog">
        <slot name="dialog">
          <p class="sa-form-actions">
            <button class="form-button" type="submit">Cancel</button>
          </p>
        </slot>
      </form>
    </dialog>
  </div>
</template>

<style lang="scss">
.sa-widget {
  position: relative;
  background-color: var(--c-bg);
  box-shadow: var(--shadow);
  border-radius: 5;

  &__actions {
    position: absolute;
    right: 2px;
    top: 2px;
    z-index: 5;

    display: flex;
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 2px;
    border-radius: 4px;

    font-size: 1em;
    border: none;
    color: var(--c-fg-t);
    transition:
      color 0.2s,
      background-color 0.2s;

    &:active {
      color: var(--c-fg);
      background-color: var(--c-bg-ta);
    }
  }

  @media (hover: hover) {
    &__action {
      color: transparent;
    }

    &:hover &__action,
    &:focus-within &__action {
      color: var(--c-fg-t);

      &:hover {
        color: var(--c-fg);
      }
    }
  }
}
</style>
