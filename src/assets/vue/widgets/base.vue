<!--
Copyright (C) 2023 Goldsmiths, University of London.
All rights reserved.
-->

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

function closeEditForm() {
  editDialog.value?.close();
}

defineExpose({
  closeEditForm,
});
</script>

<template>
  <div class="sa-widget" v-bind="$attrs">
    <slot></slot>
    <div class="sa-widget__actions">
      <slot name="actions">
        <button
          data-testlabel="edit"
          class="icon-button sa-widget__action"
          @click="showEditForm"
        >
          <span class="material-symbols-outlined">edit</span>
        </button>
      </slot>
      <button
        data-testlabel="delete"
        class="icon-button sa-widget__action"
        @click="$emit('delete')"
      >
        <span class="material-symbols-outlined">delete</span>
      </button>
    </div>
    <dialog class="sa-dialog" data-testlabel="dialog" ref="editDialog">
      <form class="sa-form" method="dialog">
        <slot name="dialog">
          <p class="sa-form-actions">
            <button
              class="form-button"
              data-testlabel="close"
              @click="closeEditForm"
            >
              Cancel
            </button>
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
