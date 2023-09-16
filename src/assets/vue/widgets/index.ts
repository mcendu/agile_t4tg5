import { Component } from 'vue';
import LinkWidget from './link.vue';
import TodoListWidget from './todolist.vue';
import DeadlineWidget from './deadline.vue';
import TimerWidget from './timer.vue';

const widgetTable: Record<string, Component> = {
    LinkWidget,
    TodoListWidget,
    DeadlineWidget,
    TimerWidget,
};

export default widgetTable;
