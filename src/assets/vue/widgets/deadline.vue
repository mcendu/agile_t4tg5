<script setup lang="ts">
import { ref, computed, Ref } from 'vue';
import WidgetBase from './base.vue';
import FormState from '../../js/composables/formstate';
import '../../css/form.scss';

interface DeadlineWidgetData {
  title: string;
  target: string;
}

defineOptions({
  name: 'DeadlineWidget',
});

const props = defineProps<{
  data: DeadlineWidgetData;
}>();

const data = computed<DeadlineWidgetData>({
  get() {
    return props.data;
  },
  set(value) {
    emit('update', value);
  },
});

const emit = defineEmits<{
  update: [value: DeadlineWidgetData];
}>();

const widgetBase = ref<InstanceType<typeof WidgetBase> | undefined>(undefined);
const showIcons = ref(false);

const deadlines = ref([
  { title: 'Project Proposal', date: '2023-09-15' },
  { title: 'Midterm Exam', date: '2023-09-30' },
  // Add more deadlines here...
]);

const newTitle = ref('');
const newDate = ref('');

const addDeadline = () => {
  if (newTitle.value.trim() !== '' && newDate.value.trim() !== '') {
    deadlines.value.push({ title: newTitle.value, date: newDate.value });
    newTitle.value = '';
    newDate.value = '';
  }
};

const editDeadline = (index: number) => {
  // Implement edit functionality here
};

const removeDeadline = (index: number) => {
  deadlines.value.splice(index, 1);
};

const getCountdown = (deadlineDate: string) => {
  const now = new Date();
  const targetDate = new Date(deadlineDate);
  const timeDiff = targetDate.getTime() - now.getTime();
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return days >= 0 ? `${days} days left` : 'Deadline passed';
};

const formState = new FormState(data);

</script>

<template>
  <WidgetBase ref="widgetBase" class="sa-link-widget" @edit="() => formState.reset()">
    <div class="sa-link-widget__content">
      <h3>Upcoming Deadlines</h3>
      <ul>
        <li v-for="(deadline, index) in deadlines" :key="index">
          <span>{{ deadline.title }} </span><br>
          <span>{{ deadline.date }} | </span>
          <span>{{ getCountdown(deadline.date) }}</span><br>
          <!-- <button @click="removeDeadline(index)">Remove</button> -->
          <span @click="removeDeadline(index)" class="material-symbols-outlined">delete</span>
        </li>
      </ul>
      <div class="sa-link-widget__content">
        <input v-model="newTitle" placeholder="Title" />
        <input type="date" v-model="newDate" />
        <button @click="addDeadline">Add Deadline</button>
      </div>
    </div>
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

    &:hover {
      text-decoration: inherit;
    }
  }

  &__link {
    font-size: 0.75em;
    max-width: max-content;
    white-space: nowrap;
  }
}
</style>
