<!--
Copyright (C) 2023 Goldsmiths, University of London.
All rights reserved.
-->

<script setup lang="ts">
import { ref, computed, Ref, reactive, watch } from 'vue';
import WidgetBase from './base.vue';
import FormState from '../../js/composables/formstate';
import '../../css/form.scss';

interface TodoList {
  title: string;
  items: TodoItem[];
}

interface TodoItem {
  description: string;
  completed: boolean;
}

defineOptions({
  name: 'ToDoWidget',
});

const props = defineProps<{
  data: TodoList;
}>();

const emit = defineEmits<{
  update: [value: TodoList];
}>();

const formState = new FormState(
  computed<TodoList>({
    get() {
      return props.data;
    },
    set(value) {
      if (!value.title) return;
      emit('update', value);
    },
  }),
);

const widgetBase: Ref<InstanceType<typeof WidgetBase> | undefined> =
  ref(undefined);

function addItem() {
  // Create a new item
  const newItem = { description: 'New Task', completed: false };

  // Push the new item to the items array
  formState.data.items.push(newItem);
}

function setItem(e: Event, item: TodoItem) {
  const target = e.target as HTMLInputElement;
  item.completed = target.checked;
  formState.save();
}

function removeItem(index: number) {
  // Remove the item from the items array
  formState.data.items.splice(index, 1);
}

function closeEditForm() {
  // to-do list functionality is implemented on the formstate
  formState.reset();
  widgetBase.value?.closeEditForm();
}
</script>

<template>
  <WidgetBase
    ref="widgetBase"
    class="sa-todo-widget"
    @edit="() => formState.reset()"
  >
    <div class="sa-todo-widget__content">
      <h3>{{ data.title }}</h3>
      <ul class="sa-checklist sa-todo-widget__checklist">
        <li v-for="(item, i) in props.data.items">
          <label class="sa-checklist-item">
            <input
              type="checkbox"
              :checked="formState.data.items[i]?.completed ?? item.completed"
              @input="(e) => setItem(e, formState.data.items[i])"
            />
            <span class="sa-checklist-item__label">{{ item.description }}</span>
          </label>
        </li>
      </ul>
    </div>

    <template #dialog>
      <h2 class="sa-form-heading">To-Do List Widget</h2>
      <label class="sa-form-field">
        <span class="sa-labeltext">Title</span>
        <input type="text" required v-model="formState.data.title" />
      </label>
      <ul class="sa-checklist sa-todo-widget__checklist">
        <li
          v-for="(item, index) in formState.data.items"
          :key="index"
          class="sa-checklist-item"
        >
          <button
            class="icon-button sa-todo-widget__delete-item"
            type="button"
            @click="removeItem(index)"
          >
            <span class="material-symbols-outlined">delete</span>
          </button>
          <input
            type="text"
            class="sa-todo-widget__edit-item"
            v-model="item.description"
          />
        </li>
      </ul>
      <p class="sa-form-actions">
        <button
          class="form-button submit"
          type="submit"
          @click="formState.save()"
        >
          Save
        </button>
        <button class="form-button" @click="closeEditForm()">Close</button>
        <button class="form-button" type="button" @click="addItem">
          Add Item
        </button>
      </p>
    </template>
  </WidgetBase>
</template>

<style lang="scss">
.sa-todo-widget {
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

  &__checklist {
    display: flex;
    flex-direction: column;
    gap: 0.375lh;
  }

  &__delete-item {
    border-radius: 4px;
    user-select: none;
  }

  &__edit-item {
    width: 100%;
  }
}
</style>
