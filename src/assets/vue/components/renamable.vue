<script setup lang="ts">
import { Ref, ref } from 'vue';

const props = defineProps<{
  name: string;
  renaming: boolean;
}>();
const emit = defineEmits<{
  (e: 'rename', name: string): void;
}>();

const newname: Ref<HTMLInputElement | null> = ref(null);

function startRename() {
  if (props.renaming && newname.value !== null) {
    newname.value.focus();
    newname.value.value = props.name;
  }
}

function submit(e: Event) {
  e.preventDefault();
  if (!props.renaming) return;
  if (newname.value?.value === undefined) return;

  emit('rename', newname.value.value);
}
</script>

<template>
  <span
    class="renamable"
    :class="{
      'renamable--renaming': renaming
    }"
  >
    <span class="renamable__content" :aria-hidden="renaming">
      {{ name }}
    </span>
    <form
      class="renamable__rename-input"
      @submit="submit"
      :aria-hidden="!renaming"
    >
      <input ref="newname" type="text" />
    </form>
  </span>
</template>

<style>
@keyframes invalid-input-wiggle {
  from {
    transform: translateX(calc(-12px * var(--direction, 1)));
  }
  5% {
    transform: translateX(calc(12px * var(--direction, 1)));
  }
  10% {
    transform: translateX(calc(-8px * var(--direction, 1)));
  }
  20% {
    transform: translateX(calc(8px * var(--direction, 1)));
  }
  40% {
    transform: translateX(calc(-8px * var(--direction, 1)));
  }
  to {
    transform: none;
  }
}

@media (prefers-reduced-motion) {

}

.renamable {
  transition: border-bottom 333ms;

}

.renamable--renaming {
  border-bottom: 2px solid var(--c-a4);
}
</style>
