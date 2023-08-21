<script setup lang="ts">
import Module from '../../js/module';
import { computed, ref, Ref, watch } from 'vue';
import '../../css/form.scss';

const props = defineProps<{ module?: Module }>();
const emit = defineEmits<{
  (e: 'add', id: bigint, type: string, grade: Number, weight: Number): void;
}>();

const id: Ref<bigint | undefined> = ref(props.module?.id);
const type: Ref<string | undefined> = ref();
const weight: Ref<Number | undefined> = ref();
const grade: Ref<Number | undefined> = ref();
const dialog: Ref<HTMLDialogElement | null> = ref(null);

function add(e: Event) {
  if (!id.value) return;

  // validate
  if (id.value) {
    emit('add', id.value, type.value!, grade.value!, weight.value!);
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
        <span class="sa-labeltext">Type</span>
        <select
          name="type"
          required
          min-length="1"
          placeholder="Type"
          v-model="type"
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
        <button class="form-button submit" type="submit" @click="add">
          Save
        </button>
        <button class="form-button" type="submit" @click="close">Cancel</button>
      </p>
    </form>
  </dialog>
</template>
