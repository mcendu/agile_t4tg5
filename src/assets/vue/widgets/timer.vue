<!--
Copyright (C) 2023 Goldsmiths, University of London.
All rights reserved.
-->

<script setup lang="ts">
import { ref, computed, watch, Ref } from 'vue';
import FormState from '../../js/composables/formstate';

import WidgetBase from './base.vue';
import '../../css/form.scss';

defineOptions({
  name: 'TimerWidget',
});

interface TimerWidgetData {
  /**
   * The number of minutes the timer should run for
   */
  minutes: number;
}

const props = defineProps<{
  data: TimerWidgetData;
}>();

const emit = defineEmits<{
  update: [value: TimerWidgetData];
}>();

const data = computed({
  get() {
    return props.data;
  },
  set(value) {
    timeRemaining.value = value.minutes * 60 * 1000;
    timerLength.value = value.minutes;
    emit('update', value);
  },
});

const widgetBase: Ref<typeof WidgetBase | undefined> = ref(undefined);

const isRunning = ref(false);
const isPaused = ref(false);
const timerStart = ref<number | null>(Date.now());
const formState = new FormState(data);

// save widget timer length
const timerLength = ref<number>(data.value.minutes);

//Calculation of remaining time in seconds
const timeRemaining = ref<number>(timerLength.value * 60 * 1000);

//Function converts milliseconds into the format: Minutes, Seconds
const convertTime = (time: number): string => {
  const totalSeconds = Math.floor(time / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);
  return `${minutes}:${seconds}`;
};

const startTimer = () => {
  if (!isRunning.value) {
    isRunning.value = true;
    // Set the timer for value (in minutes)
    timeRemaining.value = timerLength.value * 60 * 1000;
    timerStart.value = Date.now() + timeRemaining.value;
  }
};

// Set the timer for value (in minutes)
const resetTimer = () => {
  isRunning.value = false;
  timeRemaining.value = 0;
  timerStart.value = null;
};

//function to update the remaining time using the VUE watch function
watch(isRunning, (newValue) => {
  if (newValue) {
    const interval = setInterval(() => {
      if (isRunning.value && isPaused.value == false) {
        timeRemaining.value = timerStart.value! - Date.now();
        if (timeRemaining.value <= 0) {
          isRunning.value = false;
          clearInterval(interval);
          // Reset the timer to 0 when it reaches 0
          timeRemaining.value = 0;
        }
      } else {
        clearInterval(interval);
      }
    }, 100);
  }
});
</script>
<template>
  <WidgetBase ref="widgetBase" class="timer-widget">
    <div>
      <h3 class="timer-title"></h3>
      <div class="timer-display">
        {{ convertTime(timeRemaining) }}
      </div>
      <div class="timer-controls">
        <button @click="startTimer" :disabled="isRunning">Start Timer</button>
        <button @click="resetTimer">Reset Timer</button>
      </div>
    </div>

    <template #dialog>
      <h2 class="sa-form-heading">Timer widget</h2>

      <label class="sa-form-field">
        <span class="sa-labeltext">Minutes</span>
        <input
          type="number"
          name="numberOfMinutes"
          required
          placeholder="0"
          v-model="formState.data.minutes"
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
.timer-widget {
  &__content {
    display: flex; /* Use flexbox layout */
    flex-direction: column;
    align-items: center; /* Center content horizontally */
    justify-content: center; /* Center content vertically */
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

  .timer-title {
    font-size: 1.5rem;
  }

  .timer-display {
    font-size: 4.5rem;
    color: blue;
  }

  .timer-controls {
    display: flex;
    gap: 1rem;
    color: grey;
  }
}
</style>
