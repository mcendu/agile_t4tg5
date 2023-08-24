<script setup lang="ts">
import Module from '../../js/module';
import { computed, ref, Ref, watch } from 'vue';
import '../../css/form.scss';

const props = defineProps<{ module?: Module }>();
const emit = defineEmits<{
  (e: 'add', id: bigint, type: string, grade: number | undefined, weight: number | undefined): void;
}>();

const id: Ref<bigint | undefined> = ref(props.module?.id);
const session: Ref<string | undefined> = ref();
const weight: Ref<Number | undefined> = ref();
const grade: Ref<Number | undefined> = ref();
const dialog: Ref<HTMLDialogElement | null> = ref(null);

function add(e: Event) {
  if (!id.value) return;

  // validate
  if (id.value) {
    emit('add', id.value, session.value!, grade.value!, weight.value!);
  } else e.preventDefault();
}

function showModal(module: Module) {
  id.value = module.id;
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
      <h2 class="sa-form-heading">Add Grade {{ id }}</h2>
      <label class="sa-form-field">
        <span class="sa-labeltext">Session</span>
        <select name="session" required placeholder="Session" v-model="session">
          <option value="quiz">Quiz</option>
          <option value="midterm">Midterm</option>
          <option value="final">Final</option>
        </select>
        <span class="sa-labeltext">Grade</span>
        <input
          type="number"
          name="grade"
          required
          placeholder="Grade"
          v-model="grade"
        />
        <span class="sa-labeltext">Weight</span>
        <input
          type="number"
          name="weight"
          required
          placeholder="Weight"
          v-model="weight"
        />
      </label>
      <p class="sa-form-actions">
        <button class="form-button submit" type="submit" @click="add">
          Save
        </button>
        <button class="form-button" type="submit" @click="close">Cancel</button>
      </p>
    </form>
  </dialog>
</template>
