<script setup lang="ts">
import { computed } from 'vue';

interface LinkWidgetData {
  /**
   * The title of the link widget.
   */
  title: string;
  /**
   * The link target.
   */
  target: string;
}

const props = defineProps<{
  modelValue: LinkWidgetData;
}>();
const emit = defineEmits<{
  'update:modelValue': [value: LinkWidgetData];
}>();

const data = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>
<template>
  <div class="sa-widget sa-link-widget">
    <a class="sa-link-widget__content" :href="data.target">
      <h3 class="sa-link-widget__title">{{ data.title }}</h3>
      <p class="sa-link-widget__link">{{ data.target }}</p>
    </a>
  </div>
</template>
