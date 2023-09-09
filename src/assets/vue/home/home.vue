<script setup lang="ts">
import { inject, ref, Ref } from 'vue';
import Module from '../../js/module';

const enabledModules: Ref<Module[]> | undefined = inject('enabledModules');
</script>

<template>
  <article class="sa-home">
    <section class="sa-courses sa-current-courses">
      <h3>Currently taking</h3>
      <ul>
        <li v-for="m in enabledModules">{{ m.code }} {{ m.name }}</li>
      </ul>
    </section>
  </article>
</template>

<style lang="scss">
.sa-home {
  padding: 1em;
}

.sa-courses {
  background-color: var(--c-bg);
  border-radius: 4px;
  box-shadow: var(--shadow);
  margin-bottom: 8px;

  padding: 10px;
}
</style>
