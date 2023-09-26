<!--
Copyright (C) 2023 Goldsmiths, University of London.
All rights reserved.
-->

<script setup lang="ts">
import Page from '../../js/page';
import { computed, nextTick, ref, Ref, watch } from 'vue';
import '../../css/form.scss';
import FormState from '../../js/composables/formstate';

const props = defineProps<{ page?: Page }>();
const emit = defineEmits<{
  (e: 'submit', page: Page, name: string): void;
}>();

interface PageEditFormData {
  name: string;
}

const form = new FormState<PageEditFormData>(
  computed({
    get: () =>
      Object({
        name: props.page?.name ?? '',
      }),
    set: (value) => {
      if (props.page) emit('submit', props.page, value.name);
    },
  }),
);

function rename(e: Event) {
  // validate
  if (props.page && form.data.name) form.save();
  else e.preventDefault();
}

const dialog: Ref<HTMLDialogElement | null> = ref(null);

function showModal() {
  form.reset();
  dialog.value?.showModal();
}

defineExpose({
  showModal,
});
</script>

<template>
  <dialog class="sa-dialog" ref="dialog">
    <form class="sa-form" method="dialog" data-testlabel="form">
      <h2 class="sa-form-heading" data-testlabel="heading">
        Editing {{ page?.name }}
      </h2>
      <label class="sa-form-field">
        <span class="sa-labeltext">Name</span>
        <input
          data-testlabel="name"
          type="text"
          name="name"
          required
          min-length="1"
          placeholder="Page name"
          v-model="form.data.name"
        />
      </label>
      <p class="sa-form-actions">
        <button
          class="form-button submit"
          data-testlabel="save"
          type="submit"
          @click="rename"
        >
          Save
        </button>
        <button
          class="form-button"
          data-testlabel="cancel"
          @click="() => dialog?.close()"
        >
          Cancel
        </button>
      </p>
    </form>
  </dialog>
</template>
