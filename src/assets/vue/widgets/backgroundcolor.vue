<!--
Copyright (C) 2023 Goldsmiths, University of London.
All rights reserved.
-->

<script setup lang="ts">
import { ref, computed } from 'vue';
import FormState from '../../js/composables/formstate';
import WidgetBase from './base.vue';
import '../../css/form.scss';

defineOptions({
  name: 'BackgroundColorWidget',
});

interface BackgroundColorWidgetData {
  title: string;
  target: string;
}

const props = defineProps<{
  data: BackgroundColorWidgetData;
}>();
const emit = defineEmits<{
  update: [value: BackgroundColorWidgetData];
}>();

const selectedColor = ref('#ffffff'); // Default color is white

const changeBackgroundColor = () => {
  document.body.style.backgroundColor = selectedColor.value;
};

const formState = new FormState(ref(props.data));
</script>

<template>
  <WidgetBase
    ref="widgetBase"
    class="sa-link-widget"
    @edit="() => formState.reset()"
  >
    <div class="sa-link-widget__content">
      <h3 style="align-items: center">Background Color Changer</h3>
      <input type="color" v-model="selectedColor" /><br />
      <!-- <button class="btn" @click="changeBackgroundColor">Change Background Color</button> -->
      <span class="material-symbols-outlined" @click="changeBackgroundColor">
        format_color_fill
      </span>
    </div>
  </WidgetBase>
</template>

<style lang="scss">
.sa-link-widget {
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

  &__link {
    font-size: 0.75em;
    max-width: max-content;
    white-space: nowrap;
  }
}
</style>
