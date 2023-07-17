<template>
  <button class="sa-addwidget" aria-label="Create a new widget">
    <p class="sa-addwidget__icon">add</p>
    <p class="sa-addwidget__text">Create a new widget</p>
  </button>
</template>

<style>
.sa-addwidget {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  --color: var(--c-a3);
  border: 4px dashed var(--color);
  border-radius: 8px;
  color: var(--color);
}

.sa-addwidget:hover {
  background-color: var(--c-h1);
}

.sa-addwidget:active {
  --color: var(--c-a4);
  background-color: var(--c-a2);
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
