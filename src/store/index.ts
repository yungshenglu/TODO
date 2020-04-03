import Vue from 'vue';
import Vuex from 'vuex';

import TodoItem from './components/TodoItem.vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todoList: Array<TodoItem>(),
    },
    mutations: {
        addTodo(state, item: TodoItem) {
            state.todoList.push(item);
        },
    },
    actions: {
        addTodo(context, item: TodoItem) {
            context.commit('addTodo', item);
        },
    },
    modules: {
    },
});
