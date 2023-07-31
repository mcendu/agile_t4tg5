<script setup lang="ts">
import Page from '../../js/page';
import { onBeforeUpdate, ref, Ref } from 'vue';

const props = defineProps<{ page?: Page }>();
const emit = defineEmits<{
  (e: 'submit', page: Page, name: string): void
}>();

let prevPage = props.page;
const name: Ref<string | undefined> = ref(props.page?.name);
const dialog: Ref<HTMLDialogElement | null> = ref(null);

onBeforeUpdate(() => {
  if (prevPage?.id !== props.page?.id) {
    name.value = props.page?.name;
    prevPage = props.page;
  }
});

function rename(e: Event) {
  if (!props.page) return;

  // validate
  if (name.value)
    emit('submit', props.page, name.value);
  else
    e.preventDefault();
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
    <form method="dialog">
      <p>
        <label>Name</label>
        <input type="text" name="name" v-model="name" />
      </p>
      <p class="sa-form-actions">
        <button class="form-button submit" type="submit" @click="rename">
          Save
        </button>
        <button class="form-button" type="submit">
          Cancel
        </button>
      </p>
    </form>
  </dialog>
</template>
