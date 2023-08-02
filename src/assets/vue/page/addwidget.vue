<template>
  <button class="sa-addwidget" aria-label="Create a new widget">
    <p class="sa-addwidget__icon">add</p>
    <p class="sa-addwidget__text">Create a new widget</p>
  </button>
</template>

<style lang="scss">
@use '/css/colors.scss';
.sa-addwidget {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 4px dashed var(--c-fg-tl);
  border-radius: 8px;
  color: var(--c-fg-tl);
}

.sa-addwidget__icon {
  font-family: 'Material Symbols Outlined';
  font-size: 48px;
  margin-top: 0;
}

.sa-addwidget__text {
  margin-top: 0.5lh;
}
</style>
