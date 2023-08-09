<script setup lang="ts">
import Page from '../../js/page';
import { computed, ref, Ref, watch } from 'vue';
import '../../css/form.scss';

const props = defineProps<{ page?: Page }>();
const emit = defineEmits<{
  (e: 'submit', page: Page, name: string): void;
}>();

const name: Ref<string | undefined> = ref(props.page?.name);
const dialog: Ref<HTMLDialogElement | null> = ref(null);

watch(
  () => props.page?.name,
  (newName) => {
    name.value = newName;
  },
);

function rename(e: Event) {
  if (!props.page) return;

  // validate
  if (name.value) emit('submit', props.page, name.value);
  else e.preventDefault();
}

function cancel() {
  name.value = props.page?.name;
}

function showModal() {
  dialog.value?.showModal();
}

defineExpose({
  showModal,
});
</script>

<template>
  <dialog class="sa-dialog" ref="dialog">
    <form class="sa-form" method="dialog">
      <h2 class="sa-form-heading">Editing {{ page?.name }}</h2>
      <label class="sa-form-field">
        <span class="sa-labeltext">Name</span>
        <input
          type="text"
          name="name"
          required
          min-length="1"
          placeholder="Page name"
          v-model="name"
        />
      </label>
      <p class="sa-form-actions">
        <button class="form-button submit" type="submit" @click="rename">
          Save
        </button>
        <button class="form-button" type="submit" @click="cancel">
          Cancel
        </button>
      </p>
    </form>
  </dialog>
</template>
