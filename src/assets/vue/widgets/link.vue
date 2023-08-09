<script setup lang="ts">
import { computed } from 'vue';
import FormState from '../../js/composables/formstate';
import WidgetBase from './base.vue';
import '../../css/form.scss';

defineOptions({
  name: 'LinkWidget',
});

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
  data: LinkWidgetData;
}>();
const emit = defineEmits<{
  update: [value: LinkWidgetData];
}>();

const data = computed({
  get() {
    return props.data;
  },
  set(value) {
    emit('update', value);
  },
});

function urlSummary(link: URL | string) {
  const url = new URL(link);
  return url.origin;
}

const formState = new FormState(data);
</script>
<template>
  <WidgetBase class="sa-link-widget" @edit="() => formState.reset()">
    <a class="sa-link-widget__content" :href="data.target">
      <h3 class="sa-link-widget__title">{{ data.title }}</h3>
      <p class="sa-link-widget__link">
        <a :href="data.target">{{ urlSummary(data.target) }}</a>
      </p>
    </a>

    <template #dialog>
      <h2 class="sa-form-heading">Link widget</h2>
      <label class="sa-form-field">
        <span class="sa-labeltext">Title</span>
        <input
          type="text"
          name="name"
          required
          min-length="1"
          placeholder="Link title"
          v-model="formState.data.title"
        />
      </label>
      <label class="sa-form-field">
        <span class="sa-labeltext">Target</span>
        <input
          type="url"
          name="name"
          required
          placeholder="https://example.com"
          v-model="formState.data.target"
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
        <button class="form-button" type="submit">Cancel</button>
      </p>
    </template>
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
  }

  &__link {
    font-size: 0.75em;
    max-width: max-content;
    white-space: nowrap;
  }
}
</style>
