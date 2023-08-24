<script setup lang="ts">
import Page from '../../js/page';
import { computed, ref, Ref, watch } from 'vue';
import Grade from '../../../models/grade';
import '../../css/form.scss';
import FormState from '../../js/composables/formstate';

const props = defineProps<{ page?: Page }>();
const emit = defineEmits<{ edit: [newGrade: Grade] }>();

function edit(newGrade?: Grade) {
  if (!newGrade) return;
  emit('edit', newGrade);
}

const grade: Ref<Grade | undefined> = ref();
const form = new FormState(
  computed({
    get: () =>
      grade.value ??
      // sane default to make Vue happy
      ({ id: 0n, type: '', grade: 0, weight: 0 } as Grade),
    set: edit,
  }),
);

const dialog: Ref<HTMLDialogElement | null> = ref(null);

function showModal(g: Grade) {
  grade.value = g;
  form.reset();
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
          v-model="form.data.type"
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
          v-model="form.data.grade"
        />
        <span class="sa-labeltext">Weight</span>
        <input
          type="number"
          name="weight"
          required
          min-length="1"
          placeholder="Weight"
          v-model="form.data.weight"
        />
      </label>
      <p class="sa-form-actions">
        <button
          class="form-button submit"
          type="submit"
          @click="() => form.save()"
        >
          Save
        </button>
        <button class="form-button" type="submit" @click="close">Cancel</button>
      </p>
    </form>
  </dialog>
</template>
