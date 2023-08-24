<script setup lang="ts">
import Page from '../../js/page';
import { computed, ref, Ref, watch } from 'vue';
import '../../css/form.scss';

const props = defineProps<{ page?: Page }>();
const emit = defineEmits<{
  (e: 'edit', id: bigint, session: string, grade: Number, weight: Number): void;
}>();

const id: Ref<bigint | undefined> = ref();
const session: Ref<string | undefined> = ref();
const weight: Ref<Number | undefined> = ref();
const grade: Ref<Number | undefined> = ref();
const dialog: Ref<HTMLDialogElement | null> = ref(null);

function edit(e: Event) {
  if (!id.value) return;

  // validate
  if (id.value) {
    emit('edit', id.value, session.value!, grade.value!, weight.value!);
  } else e.preventDefault();
}

function showModal(
  _id: bigint,
  _session: string,
  _grade: Number,
  _weight: Number,
) {
  id.value = _id;
  session.value = _session;
  grade.value = _grade;
  weight.value = _weight;
  dialog.value?.showModal();
}

function close() {
  dialog.value?.close();
}

defineExpose({
  showModal,
});
</script>

<template>
  <dialog class="sa-dialog" ref="dialog">
    <form class="sa-form" method="dialog">
      <h2 class="sa-form-heading">Editing Grade</h2>
      <label class="sa-form-field">
        <span class="sa-labeltext">Session</span>
        <select
          disabled="true"
          name="session"
          required
          min-length="1"
          placeholder="Session"
          v-model="session"
        >
          <option value="quiz">Quiz</option>
          <option value="midterm">Midterm</option>
          <option value="final">Final</option>
        </select>
        <span class="sa-labeltext">Grade</span>
        <input
          type="number"
          name="grade"
          required
          min-length="1"
          placeholder="Grade"
          v-model="grade"
        />
        <span class="sa-labeltext">Weight</span>
        <input
          type="number"
          name="weight"
          required
          min-length="1"
          placeholder="Weight"
          v-model="weight"
        />
      </label>
      <p class="sa-form-actions">
        <button class="form-button submit" type="submit" @click="edit">
          Save
        </button>
        <button class="form-button" type="submit" @click="close">Cancel</button>
      </p>
    </form>
  </dialog>
</template>
