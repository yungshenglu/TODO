import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';
import TodoItem from '@/models/TodoItem';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        todoList: Array<TodoItem>(),
        filterType: 'ALL',
    },
    mutations,
    actions,
    getters,
    strict: true,
});
