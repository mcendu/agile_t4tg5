<script setup lang="ts">
import { ref, computed, Ref } from 'vue';
import FormState from '../../js/composables/formstate';
import WidgetBase from './base.vue';
import '../../css/form.scss';

defineOptions({
    name: 'TodoListWidget',
});

interface TodoWidgetData {
    title: string;
    target: string;
}

const props = defineProps<{
    data: TodoWidgetData;
}>();
const emit = defineEmits<{
    update: [value: TodoWidgetData];
}>();

const data = computed({
    get() {
        return props.data;
    },
    set(value) {
        emit('update', value);
    },
});
const widgetBase: Ref<typeof WidgetBase | undefined> = ref(undefined);
const showIcons = ref(false);

function urlSummary(link: URL | string) {
    try {
        const url = new URL(link);
        return url.origin;
    } catch (e) {
        return 'invalid URL';
    }
}

function formValid(data: TodoWidgetData): boolean {
    if (!data.title) return false;
    try {
        new URL(data.target);
    } catch {
        return false;
    }
    return true;
}

const formState = new FormState(data);
const newTask = ref('');
const tasks = ref<string[]>([]);

const addTask = () => {
    if (newTask.value.trim() !== '') {
        tasks.value.push(newTask.value);
        newTask.value = '';
    }
};

const removeTask = (index: number) => {
    tasks.value.splice(index, 1);
};

</script>
<template>
    <WidgetBase ref="widgetBase" class="sa-link-widget" @edit="() => formState.reset()">
        <div class="sa-link-widget__content">
            <h3>To-Do List</h3>
            <input v-model="newTask" @keyup.enter="addTask" placeholder="Add a task" />
            <ul>
                <li v-for="(task, index) in tasks" :key="index">
                    {{ task }}
                    <span @click="removeTask(index)" class="material-symbols-outlined">check</span>
                </li>
            </ul>
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
