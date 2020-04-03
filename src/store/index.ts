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
        toggleChecked(state, itemToken: string) {
            // Get the target item with matched token
            const targetItem = state.todoList.filter((target: TodoItem) => {
                return (target.getToken === itemToken);
            })[0];
            targetItem.toggleCompleted();
            targetItem.toggleCompletedDate();
        },
    },
    actions: {
        addTodo(context, newTodo: string) {
            context.commit('addTodo', newTodo);
        },
        removeTodo(context, item: TodoItem) {
            context.commit('removeTodo', item);
        },
        toggleChecked(context, itemToken: string) {
            context.commit('toggleChecked', itemToken);
        },
    },
    modules: {
    },
});
