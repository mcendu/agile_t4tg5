<script setup lang="ts">
import { ref, computed, Ref, reactive, watch } from 'vue';
import WidgetBase from './base.vue';
import FormState from '../../js/composables/formstate';
import '../../css/form.scss';

interface ToDoItem {
  title: string;
  items: ToDoItemDetail[];
}

interface ToDoItemDetail {
  description: string;
  completed: boolean;
}

defineOptions({
  name: 'ToDoWidget',
});

const props = defineProps<{
  data: ToDoItem;
}>();

const emit = defineEmits<{
  update: [value: ToDoItem];
}>();

const formState = new FormState(
  computed<ToDoItem>({
    get() {
      return props.data;
    },
    set(value) {
      if (!value.title) return;
      //emit('update', value);
    },
  }),
);

const widgetBase: Ref<typeof WidgetBase | undefined> = ref(undefined);

// Use a reactive object for formState.data
const formStateData = reactive(props.data);

// Create a computed property for items
const items = ref(formStateData.items);

function addItem() {
  // Create a new item
  const newItem = { description: 'Example Task', completed: false };

  // Push the new item to the items array
  items.value.push(newItem);
}

async function saveData() {
   // Clone the items array before updating formStateData.items
  const clonedItems = items.value.map((item) => ({ ...item }));

  // Clone the form state data
  const updatedData = { ...formStateData, items: JSON.parse(JSON.stringify(clonedItems)) };

  // Assign the updated items to formState.data
//  formState.data.items = ref(formStateData.items).value;
  formState.data.items.splice(0, formState.data.items.length, ...formStateData.items);

  emit('update', updatedData);

  // Save the form state
  await formState.save();
}

function removeItem(index: number) {
  // Remove the item from the items array
  items.value.splice(index, 1);
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
      <div v-for="(item, index) in items" :key="index">
        <div class="todo-item">
          <div class="item-row">
            <input
              type="checkbox"
              v-model="item.completed"
              class="item-checkbox"
            />
            <label class="item-label">{{ item.description }}</label>
          </div>
        </div>
        <!-- <p>Status: {{ item.completed ? 'Completed' : 'Pending' }}</p> -->
      </div>
    </div>

    <template #dialog>
      <h2 class="sa-form-heading">To-Do List Widget</h2>
      <label class="sa-form-field">
        <span class="sa-labeltext">Title</span>
        <input type="text" required v-model="formState.data.title" />
      </label>
      <div v-for="(item, index) in items" :key="index">
        <h3>Item {{ index + 1 }}</h3>
        <label class="sa-form-field">
          <span class="sa-labeltext">Description</span>
          <textarea required v-model="item.description"></textarea>
        </label>
        <label class="sa-form-field">
          <span class="sa-labeltext">Status</span>
          <select v-model="item.completed">
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
        </label>
        <span class="material-symbols-outlined" @click="removeItem(index)"
          >delete</span
        >
      </div>
      <p class="sa-form-actions">
        <button class="form-button submit" type="submit" @click="saveData">
          Save
        </button>
        <button class="form-button" @click="() => widgetBase?.closeEditForm()">
          Close
        </button>
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
}

.todo-item {
  display: flex;
  flex-direction: column;
  align-items: center; /* Vertically center the content */
}
.item-row {
  display: flex;
  flex-direction: row;
  align-items: center; /* Vertically center the content */
}

/* Add styles for item-checkbox and adjust as needed */
.item-checkbox {
  margin-right: 10px; /* Adjust margin as needed */
  vertical-align: middle; /* Align the checkbox vertically in the middle */
  margin-top: 1.0lh;

}

/* Add styles for item-label and adjust as needed */
.item-label {
  vertical-align: middle; /* Align the label (description) vertically in the middle */
  
}
</style>
