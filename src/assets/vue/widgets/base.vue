<script setup lang="ts">
defineOptions({
  name: 'WidgetBase',
});
</script>

<template>
  <div class="sa-widget" v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.sa-widget {
  background-color: var(--c-bg);
  box-shadow: var(--shadow);
  border-radius: 5;
}
</style>
