import Vue from 'vue';
import Vuex from 'vuex';

import TodoItem from '@/models/TodoItem';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todoList: Array<TodoItem>(),
    },
    mutations: {
        addTodo(state, newTodo: string) {
            state.todoList.push(new TodoItem(newTodo));
        },
        removeTodo(state, item: TodoItem) {
            state.todoList = state.todoList.filter((removedTarget) => {
                return (removedTarget !== item);
            });
        },
        toggleChecked(context, item: TodoItem) {
            item.toggleCompleted();
            item.toggleCompletedDate();
        },
    },
    actions: {
        addTodo(context, newTodo: string) {
            context.commit('addTodo', newTodo);
        },
        removeTodo(context, item: TodoItem) {
            context.commit('removeTodo', item);
        },
        toggleChecked(context, item: TodoItem) {
            context.commit('toggleChecked', item);
        },
    },
    modules: {
    },
});
