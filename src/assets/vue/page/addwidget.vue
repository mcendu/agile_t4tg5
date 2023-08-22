<template>
  <button class="sa-addwidget" aria-label="Create a new widget" @mouseover="showIcons = true"
    @mouseout="showIcons = false">
    <p class="sa-addwidget__icon" :class="{ 'show-icons': showIcons }">add</p>
    <div class="sa-addwidget__div" :class="{ 'show-icons': showIcons }">
      <p class="sa-addwidget__icon">captive_portal</p>
      <p class="sa-addwidget__icon">checklist</p>
      <p class="sa-addwidget__icon">event</p>
      <p class="sa-addwidget__icon">format_paint</p>
    </div>
    <p class="sa-addwidget__text">Create a new widget</p>
  </button>
</template>

<script setup>
import { ref } from 'vue';

const showIcons = ref(false);
</script>

<style lang="scss">
.sa-addwidget {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 4px dashed var(--c-fg-tl);
  border-radius: 8px;
  color: var(--c-fg-tl);
  position: relative;
}

.sa-addwidget__div {
  display: none;
  align-items: center;
  justify-content: center;
  position: relative;
}

.sa-addwidget__div.show-icons {
  display: flex;
}

.sa-addwidget__icon {
  font-family: 'Material Symbols Outlined';
  font-size: 48px;
  margin: 0;
}

.sa-addwidget__icon.show-icons {
  display: none;
}

.sa-addwidget__text {
  margin-top: 0.5lh;
}
</style>
