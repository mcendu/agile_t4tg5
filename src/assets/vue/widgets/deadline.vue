<script setup lang="ts">
import { ref, computed, Ref } from 'vue';
import WidgetBase from './base.vue';
import FormState from '../../js/composables/formstate';
import '../../css/form.scss';

interface Deadline {
  title: string;
  start: string;
  deadline: string;
}

defineOptions({
  name: 'DeadlineWidget',
});

const props = defineProps<{
  data: Deadline;
}>();

const emit = defineEmits<{
  update: [value: Deadline];
}>();

const formState = new FormState(
  computed<Deadline>({
    get() {
      return props.data;
    },
    set(value) {
      if (!value.title) return;
      emit('update', value);
    },
  }),
);

const widgetBase = ref<InstanceType<typeof WidgetBase> | undefined>(undefined);

function getCountdownText(deadline: string | Date): string {
  const now = new Date();
  const deadlineDate = new Date(deadline); // normalize
  const timeDiff = deadlineDate.getTime() - now.getTime();

  const hour = 60 * 60 * 1000;
  const hourThreshold = 48 * hour;
  if (timeDiff < 0) {
    return 'Deadline passed';
  } else if (timeDiff < hourThreshold) {
    return `${Math.floor(timeDiff / hour)} hours left`;
  } else {
    // we don't need to take leap seconds into account
    return `${Math.floor(timeDiff / (24 * hour))} days left`;
  }
}
</script>

<template>
  <WidgetBase
    ref="widgetBase"
    class="sa-deadline-widget"
    @edit="() => formState.reset()"
  >
    <div class="sa-deadline-widget__content">
      <h3>{{ data.title }}</h3>
      <p>Due {{ new Date(data.deadline).toLocaleDateString('en-US') }}</p>
      <p>{{ getCountdownText(data.deadline) }}</p>
      <p>
        <progress
          :value="new Date().valueOf() - new Date(data.start).valueOf()"
          :max="
            new Date(data.deadline).valueOf() - new Date(data.start).valueOf()
          "
        ></progress>
      </p>
    </div>

    <template #dialog>
      <h2 class="sa-form-heading">Deadline widget</h2>
      <label class="sa-form-field">
        <span class="sa-labeltext">Title</span>
        <input type="text" required v-model="formState.data.title" />
      </label>
      <label class="sa-form-field">
        <span class="sa-labeltext">Start date</span>
        <input type="datetime-local" required v-model="formState.data.start" />
      </label>
      <label class="sa-form-field">
        <span class="sa-labeltext">Due date</span>
        <input
          type="datetime-local"
          required
          v-model="formState.data.deadline"
        />
      </label>
      <p class="sa-form-actions">
        <button
          class="form-button submit"
          type="submit"
          @click="() => formState.save()"
        >
          Save
        </button>
        <button class="form-button" @click="() => widgetBase?.closeEditForm()">
          Cancel
        </button>
      </p>
    </template>
  </WidgetBase>
</template>

<style lang="scss">
.sa-deadline-widget {
  padding: 0;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    padding: 1em;
    overflow: clip;
    text-overflow: ellipsis;
    color: inherit;
    text-decoration: inherit;

    &:hover {
      text-decoration: inherit;
    }
  }
}

progress[value] {
  --color: #31c6f7;
  --background: rgb(44, 42, 42); /* the background color */
  height: 20px;
  border-radius: 5em;
  background: var(--background);
}
progress[value]::-webkit-progress-bar {
  border-radius: 5em;
  background: var(--background);
  box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.5);
}
progress[value]::-webkit-progress-value {
  border-radius: 5em;
  background: var(--color);
}
</style>
