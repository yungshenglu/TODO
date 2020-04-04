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
            if (newTodo !== '') {
                state.todoList.push(new TodoItem(newTodo));
            }
        },
        removeTodo(state, item: TodoItem) {
            state.todoList.splice(state.todoList.indexOf(item), 1);
        },
        updateStatus(state, itemToken: string) {
            const targetItem = state.todoList.filter((target: TodoItem) => {
                return (target.getToken === itemToken);
            })[0];
            targetItem.toggleIsCompleted();
            targetItem.toggleCompletedDate();
        },
        updateTodo(state, payload) {
            // Update new content
            //targetItem.toggleEditable();
            //targetItem.updateContent(payload.content);
        },
    },
    actions: {
        addTodo(context, newTodo: string) {
            context.commit('addTodo', newTodo);
        },
        removeTodo(context, item: TodoItem) {
            context.commit('removeTodo', item);
        },
        updateStatus(context, itemToken: string) {
            context.commit('updateStatus', itemToken);
        },
        updateTodo(context, payload: object) {
            context.commit('updateTodo', payload);
        },
    },
    modules: {
    },
});
