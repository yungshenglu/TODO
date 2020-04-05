import Vue from 'vue';
import Vuex from 'vuex';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';
import TodoItem from '@/models/TodoItem';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        todoList: new Array<TodoItem>(),
        filterType: 'ALL',
    },
    mutations,
    actions,
    getters,
    strict: true,
});
